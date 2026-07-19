import { stat } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";
import { projects } from "../src/projects.js";

const root = resolve(import.meta.dirname, "..");
const mediaPaths = [...new Set(
  projects.flatMap((project) => project.media.map((item) => item.image).filter(Boolean)),
)];

const getOptimizedPath = (sourcePath) => sourcePath.replace(/\.jpe?g$/i, ".webp");

const isCurrent = async (sourcePath, outputPath) => {
  try {
    const [sourceInfo, outputInfo] = await Promise.all([stat(sourcePath), stat(outputPath)]);
    return outputInfo.size > 0 && outputInfo.mtimeMs >= sourceInfo.mtimeMs;
  } catch {
    return false;
  }
};

let cursor = 0;
let converted = 0;
let skipped = 0;
let sourceBytes = 0;
let optimizedBytes = 0;

const convertNext = async () => {
  while (cursor < mediaPaths.length) {
    const mediaPath = mediaPaths[cursor];
    cursor += 1;
    const sourcePath = resolve(root, `public${mediaPath}`);
    const optimizedPath = resolve(root, `public${getOptimizedPath(mediaPath)}`);
    const sourceInfo = await stat(sourcePath);
    sourceBytes += sourceInfo.size;

    if (await isCurrent(sourcePath, optimizedPath)) {
      const outputInfo = await stat(optimizedPath);
      optimizedBytes += outputInfo.size;
      skipped += 1;
      continue;
    }

    const outputInfo = await sharp(sourcePath, { limitInputPixels: false, sequentialRead: true })
      .webp({ quality: 84, effort: 6, smartSubsample: true })
      .toFile(optimizedPath);
    optimizedBytes += outputInfo.size;
    converted += 1;

    const finished = converted + skipped;
    if (finished % 10 === 0 || finished === mediaPaths.length) {
      process.stdout.write(`Optimized ${finished}/${mediaPaths.length}\n`);
    }
  }
};

await Promise.all(Array.from({ length: 4 }, () => convertNext()));

const sourceMb = (sourceBytes / 1024 / 1024).toFixed(1);
const optimizedMb = (optimizedBytes / 1024 / 1024).toFixed(1);
const reduction = sourceBytes > 0 ? Math.round((1 - optimizedBytes / sourceBytes) * 100) : 0;
process.stdout.write(
  `Media ready: ${mediaPaths.length} files, ${sourceMb} MB -> ${optimizedMb} MB (${reduction}% smaller; ${converted} converted, ${skipped} current)\n`,
);
