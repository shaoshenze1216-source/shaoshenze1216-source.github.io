import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { build } from "vite";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "dist");
const publicOutput = resolve(output, "server/public");

rmSync(output, { force: true, recursive: true });
await build({
  root,
  build: {
    emptyOutDir: false,
    outDir: publicOutput,
  },
});

const deployedProjectCovers = resolve(publicOutput, "project-covers");
for (const filename of readdirSync(deployedProjectCovers)) {
  const isOptimized = filename.endsWith(".avif");
  const isFallback = filename.endsWith("-fallback.jpg");
  if (!isOptimized && !isFallback) rmSync(resolve(deployedProjectCovers, filename));
}

const deployedThemeCovers = resolve(publicOutput, "theme-covers");
for (const filename of readdirSync(deployedThemeCovers)) {
  if (filename.endsWith(".avif")) rmSync(resolve(deployedThemeCovers, filename));
}

mkdirSync(resolve(output, ".openai"), { recursive: true });
cpSync(resolve(root, ".openai/hosting.json"), resolve(output, ".openai/hosting.json"));
writeFileSync(resolve(output, "server/index.js"), readFileSync(resolve(root, "hosting/worker.js")));
