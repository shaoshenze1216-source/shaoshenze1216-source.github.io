import "./styles.css";
import { gameThemes, projects } from "./projects.js";

const themeRail = document.querySelector("#themeRail");
const themeHeader = document.querySelector("#themeHeader");
const grid = document.querySelector("#projectGrid");
const dialog = document.querySelector("#caseDialog");
const caseShell = dialog.querySelector(".case-shell");
const caseContent = document.querySelector("#caseContent");
const closeButton = dialog.querySelector(".case-close");
const caseProjectSelect = dialog.querySelector("#caseProjectSelect");
const caseProjectIndex = dialog.querySelector("#caseProjectIndex");
const caseProjectTitle = dialog.querySelector("#caseProjectTitle");
const casePrevButton = dialog.querySelector("[data-case-prev]");
const caseNextButton = dialog.querySelector("[data-case-next]");
const themeWorkspace = document.querySelector(".theme-workspace");
const themeTransition = document.querySelector("#themeTransition");
const transitionCode = document.querySelector("#transitionCode");
const cursorOrbit = document.querySelector(".cursor-orbit");
const heroFeature = document.querySelector("#heroFeature");
const mediaViewer = document.querySelector("#mediaViewer");
const mediaViewerImage = document.querySelector("#mediaViewerImage");
const mediaViewerTitle = document.querySelector("#mediaViewerTitle");
const mediaViewerMeta = document.querySelector("#mediaViewerMeta");
const mediaViewerCanvas = document.querySelector(".media-viewer-canvas");
const mediaViewerZoom = document.querySelector("#mediaViewerZoom");
const mediaZoomOutButton = document.querySelector("[data-media-zoom-out]");
const mediaZoomInButton = document.querySelector("[data-media-zoom-in]");
const mediaZoomFitButton = document.querySelector("[data-media-zoom-fit]");
const caseToolbar = document.querySelector(".case-toolbar");
const themeCount = document.querySelector("#themeCount");
const projectCount = document.querySelector("#projectCount");
const moduleCount = document.querySelector("#moduleCount");
const themeRange = document.querySelector("#themeRange");
const root = document.documentElement;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;
let activeThemeId = gameThemes[0].id;
let activeCaseProjectId = null;
let mediaZoomLevel = 1;
let mediaViewerTrigger = null;
let mediaPan = null;

const getFeaturedThemeName = (theme) => theme.subtitle.split("/")[0].trim();

const renderCoverPicture = ({ optimized, fallback, alt = "", width, height, loading = "lazy", fetchPriority = "auto" }) => `
  <picture>
    ${optimized ? `<source srcset="${optimized}" type="image/avif" />` : ""}
    <img src="${fallback}" alt="${alt}" width="${width}" height="${height}" loading="${loading}" fetchpriority="${fetchPriority}" decoding="async" />
  </picture>
`;

const setHeroFeaturePreview = (themeId) => {
  if (!heroFeature) return;
  const featuredThemes = gameThemes.filter((theme) => theme.cover?.image);
  const theme = featuredThemes.find((item) => item.id === themeId);
  if (!theme) return;
  const position = featuredThemes.findIndex((item) => item.id === theme.id);
  heroFeature.style.setProperty("--feature-active", theme.accent);
  heroFeature.querySelectorAll("[data-feature-slide]").forEach((slide) => {
    slide.classList.toggle("is-active", slide.dataset.featureSlide === theme.id);
  });
  heroFeature.querySelectorAll("[data-feature-preview]").forEach((item) => {
    const isActive = item.dataset.theme === theme.id;
    item.classList.toggle("is-active", isActive);
    if (isActive) item.setAttribute("aria-current", "true");
    else item.removeAttribute("aria-current");
  });
  heroFeature.querySelector("[data-feature-position]").textContent = `${String(position + 1).padStart(2, "0")} / ${String(featuredThemes.length).padStart(2, "0")}`;
  heroFeature.querySelector("[data-feature-title]").textContent = theme.title;
  heroFeature.querySelector("[data-feature-subtitle]").textContent = getFeaturedThemeName(theme);
  heroFeature.querySelector("[data-feature-count]").textContent = `${String(theme.projects.length).padStart(2, "0")} 个项目`;
};

const renderHeroFeature = () => {
  if (!heroFeature) return;
  const featuredThemes = gameThemes.filter((theme) => theme.cover?.image);
  const primaryTheme = featuredThemes[0];
  heroFeature.innerHTML = `
    <div class="hero-feature-stage" aria-hidden="true">
      ${featuredThemes.map((theme, index) => `
        <div class="hero-feature-slide ${index === 0 ? "is-active" : ""}" data-feature-slide="${theme.id}" style="--feature-bg: ${theme.cover.background}">
          <img src="${theme.cover.image}" alt="" width="1800" height="753" loading="${index === 0 ? "eager" : "lazy"}" fetchpriority="${index === 0 ? "high" : "low"}" decoding="async" />
        </div>
      `).join("")}
    </div>
    <div class="hero-feature-meta">
      <span data-feature-position>01 / ${String(featuredThemes.length).padStart(2, "0")}</span>
      <div><strong data-feature-title>${primaryTheme.title}</strong><small data-feature-subtitle>${getFeaturedThemeName(primaryTheme)}</small></div>
      <b data-feature-count>${String(primaryTheme.projects.length).padStart(2, "0")} 个项目</b>
    </div>
    <div class="hero-feature-index">
      ${featuredThemes.map((theme, index) => `
        <button class="hero-feature-index-item ${index === 0 ? "is-active" : ""}" type="button" data-theme="${theme.id}" data-feature-preview data-cursor="select" aria-label="查看 ${theme.title} 的 ${theme.projects.length} 个项目" ${index === 0 ? 'aria-current="true"' : ""} style="--feature-accent: ${theme.accent}">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <span><strong>${theme.title}</strong><small>${getFeaturedThemeName(theme)}</small></span>
          <b>${String(theme.projects.length).padStart(2, "0")} 个项目</b>
          <i aria-hidden="true">↗</i>
        </button>
      `).join("")}
    </div>
  `;
  setHeroFeaturePreview(primaryTheme.id);
};

const initHeroFeaturePreview = () => {
  if (!heroFeature) return;
  heroFeature.querySelectorAll("[data-feature-preview]").forEach((item) => {
    const preview = () => setHeroFeaturePreview(item.dataset.theme);
    item.addEventListener("pointerenter", preview);
    item.addEventListener("focus", preview);
  });
};

const renderThemeCover = (theme) => {
  const title = theme.title;
  const englishTitle = theme.subtitle?.split("/")[0].trim() || "SELECTED ARCHIVE";
  const coverImage = theme.cover?.image;
  const coverBackground = theme.cover?.background || theme.accent;
  return `
    <figure class="theme-cover ${coverImage ? "has-image" : "is-generated"}" style="--theme-cover-bg: ${coverBackground}; --theme-cover-accent: ${theme.accent}">
      <div class="theme-cover-visual">
        ${coverImage
          ? `<img src="${coverImage}" alt="${title} 游戏 Logo 封皮" width="1800" height="753" loading="lazy" decoding="async" />`
          : `<div class="theme-cover-fallback"><span>${theme.index}</span><strong>${title}</strong><small>${englishTitle}</small></div>`}
        <span class="theme-cover-code">ARCHIVE COVER / ${theme.index}</span>
      </div>
      <figcaption><span>GAME ID / ${theme.code}</span><strong>${String(theme.projects.length).padStart(2, "0")} PROJECT FILES</strong></figcaption>
    </figure>
  `;
};

const renderHeroStats = () => {
  const moduleTotal = projects.reduce((total, project) => total + project.media.length, 0);
  if (themeCount) themeCount.textContent = String(gameThemes.length).padStart(2, "0");
  if (projectCount) projectCount.textContent = String(projects.length).padStart(2, "0");
  if (moduleCount) moduleCount.textContent = String(moduleTotal).padStart(2, "0");
  if (themeRange) themeRange.textContent = `001—${String(gameThemes.length).padStart(3, "0")}`;
};

const renderThemeRail = () => {
  themeRail.innerHTML = gameThemes.map((theme, index) => `
    <button class="theme-tab ${theme.id === activeThemeId ? "is-active" : ""}" type="button" data-theme="${theme.id}" data-ghost="${theme.code}" data-cursor="select" aria-pressed="${theme.id === activeThemeId}" style="--theme-accent: ${theme.accent}; --tab-index: ${index}">
      <span class="theme-tab-index">${theme.index}</span>
      <span class="theme-tab-copy"><strong>${theme.title}</strong><small>${theme.subtitle}</small></span>
      <span class="theme-tab-count">${String(theme.projects.length).padStart(2, "0")}</span>
    </button>
  `).join("");
};

const renderThemeHeader = (theme) => {
  themeHeader.innerHTML = `
    <div class="theme-header-code"><span>${theme.code}</span><i aria-hidden="true"></i><span>${theme.projects.length} PROJECTS</span></div>
    ${renderThemeCover(theme)}
    <div class="theme-header-main">
      <div><p class="eyebrow">${theme.subtitle}</p><h3>${theme.title}</h3></div>
      <p>${theme.description}</p>
    </div>
    <div class="theme-header-ruler"><span>GAME / ${theme.index}</span><i></i><span>SELECTED PROJECTS</span></div>
  `;
};

const renderMediaPreview = (project) => {
  const image = renderCoverPicture({
    optimized: project.coverOptimized,
    fallback: project.cover,
    alt: `${project.title} 项目封面`,
    width: 1600,
    height: 900,
  });
  return `
    <div class="longframe" data-size="cover">
      ${image}
      <span class="longframe-code">${project.index} / COVER</span>
      <span class="longframe-label">16:9 PROJECT COVER</span>
      <span class="longframe-hover"><b>OPEN CASE FILE</b><i aria-hidden="true"></i><small>MOVE / INSPECT</small></span>
    </div>
  `;
};

const renderFormatSummary = (project) => project.groups
  .map((group) => `${group.short} ${String(group.items.length).padStart(2, "0")}`)
  .join(" / ");

const renderProjectCard = (project) => `
  <article class="archive-card" style="--card-accent: ${project.accent}">
    <button class="archive-card-open" type="button" data-project="${project.id}" data-cursor="open" aria-label="查看 ${project.title} 项目详情">
      ${renderMediaPreview(project)}
      <div class="archive-card-meta" data-echo="${project.type}">
        <div class="archive-card-topline"><span>${project.type}</span><span>${project.year}</span></div>
        <h4>${project.title}</h4>
        <p>${project.summary}</p>
        <div class="archive-card-footer"><span>${renderFormatSummary(project)}</span><strong>OPEN / ↗</strong></div>
      </div>
    </button>
  </article>
`;

const observer = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  }),
  { threshold: 0.08 },
);

const observeReveals = (scope = document) => scope.querySelectorAll(".reveal:not(.is-visible)").forEach((element) => observer.observe(element));

// IntersectionObserver can miss the first hash/scroll position in embedded browsers.
// Keep the reveal effect, but never let content remain invisible after it enters the viewport.
const revealInViewport = () => {
  document.querySelectorAll(".reveal:not(.is-visible)").forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * .92 && rect.bottom > window.innerHeight * .08) {
      element.classList.add("is-visible");
      observer.unobserve(element);
    }
  });
};

const bindCardInteractions = () => {
  if (!finePointer || reducedMotion) return;
  grid.querySelectorAll(".archive-card").forEach((card) => {
    const reset = () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
      card.classList.remove("is-hovering");
      grid.classList.remove("has-card-focus");
    };
    card.addEventListener("pointerenter", () => {
      card.classList.add("is-hovering");
      grid.classList.add("has-card-focus");
    });
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      card.style.setProperty("--tilt-x", `${(0.5 - y) * 3.5}deg`);
      card.style.setProperty("--tilt-y", `${(x - 0.5) * 3.5}deg`);
    });
    card.addEventListener("pointerleave", reset);
  });
};

const focusProjectGrid = () => {
  window.requestAnimationFrame(() => {
    grid.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  });
};

const renderActiveTheme = ({ transition = false, focusProjects = false } = {}) => {
  const theme = gameThemes.find((item) => item.id === activeThemeId) || gameThemes[0];
  const paint = () => {
    root.style.setProperty("--active-accent", theme.accent);
    renderThemeRail();
    renderThemeHeader(theme);
    grid.innerHTML = theme.projects.map(renderProjectCard).join("");
    observeReveals(grid);
    bindCardInteractions();
    if (focusProjects) focusProjectGrid();
  };
  if (!transition || reducedMotion) {
    paint();
    return;
  }
  themeTransition.style.setProperty("--transition-accent", theme.accent);
  transitionCode.textContent = theme.index;
  themeWorkspace.classList.add("is-changing");
  themeTransition.classList.add("is-active");
  window.setTimeout(() => {
    paint();
    window.requestAnimationFrame(() => {
      themeTransition.classList.remove("is-active");
      themeWorkspace.classList.remove("is-changing");
    });
  }, 540);
};

themeRail.addEventListener("click", (event) => {
  const tab = event.target.closest("[data-theme]");
  if (!tab) return;
  if (themeWorkspace.classList.contains("is-changing")) return;
  if (tab.dataset.theme === activeThemeId) {
    focusProjectGrid();
    return;
  }
  activeThemeId = tab.dataset.theme;
  renderActiveTheme({ transition: true, focusProjects: true });
});

themeRail.addEventListener("keydown", (event) => {
  if (!(["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key))) return;
  const tabs = [...themeRail.querySelectorAll(".theme-tab")];
  const current = tabs.indexOf(document.activeElement);
  if (current < 0) return;
  event.preventDefault();
  const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (current + (event.key === "ArrowDown" ? 1 : -1) + tabs.length) % tabs.length;
  tabs[next].focus();
  tabs[next].click();
});

const mediaFamilyLabels = {
  screen: "网页画面",
  landscape: "横向视觉",
  state: "界面状态",
  portrait: "移动端页面",
  document: "长页设计",
};

const getMediaFamily = (item) => {
  if (item.sourceLayout === "mobile") return "portrait";
  if (item.display === "long") return "document";
  if (item.display === "square" || item.sourceLayout === "states") return "state";
  if (item.display === "wide" || ["wide", "system", "brand"].includes(item.sourceLayout)) return "landscape";
  return "screen";
};

const buildCaseRuns = (project) => project.media.reduce((runs, item, globalIndex) => {
  const family = getMediaFamily(item);
  const origin = item.origin || `${project.title} / ARCHIVE`;
  const sourceLayout = item.sourceLayout || "archive";
  const key = `${origin}|${sourceLayout}|${family}`;
  if (runs.at(-1)?.key !== key) {
    runs.push({ key, origin, sourceLayout, family, items: [] });
  }
  runs.at(-1).items.push({ item, globalIndex });
  return runs;
}, []);

const getCaseOriginSubject = (origin) => {
  const separator = origin.lastIndexOf(" / ");
  return separator === -1 ? origin : origin.slice(0, separator);
};

const getCaseRowKind = (run) => {
  if (["desktop", "mobile"].includes(run.sourceLayout)) return run.sourceLayout;
  return run.family;
};

const buildCaseRows = (caseRuns) => {
  const groupedRuns = caseRuns.reduce((groups, run) => {
    const isDeviceRun = ["desktop", "mobile"].includes(run.sourceLayout);
    const previous = groups.at(-1);
    const canJoinPrevious = isDeviceRun
      && previous?.sourceLayout === run.sourceLayout
      && getCaseOriginSubject(previous.origin) === getCaseOriginSubject(run.origin);
    if (canJoinPrevious) {
      previous.key = `${previous.key}|${run.key}`;
      previous.items.push(...run.items);
      return groups;
    }
    groups.push({ ...run, items: [...run.items] });
    return groups;
  }, []);
  const rows = [];
  for (let runIndex = 0; runIndex < groupedRuns.length; runIndex += 1) {
    const run = groupedRuns[runIndex];
    const nextRun = groupedRuns[runIndex + 1];
    const isSingleDesktopMobilePair = nextRun
      && run.sourceLayout === "desktop"
      && nextRun.sourceLayout === "mobile"
      && run.items.length === 1
      && nextRun.items.length === 1
      && getCaseOriginSubject(run.origin) === getCaseOriginSubject(nextRun.origin);

    if (isSingleDesktopMobilePair) {
      rows.push({
        key: `${run.key}|${nextRun.key}`,
        origin: getCaseOriginSubject(run.origin),
        kind: "pair",
        label: "PC + MOBILE",
        items: [...run.items, ...nextRun.items],
      });
      runIndex += 1;
      continue;
    }

    rows.push({
      key: run.key,
      origin: run.origin,
      kind: getCaseRowKind(run),
      label: mediaFamilyLabels[run.family],
      items: run.items,
    });
  }
  return rows;
};

const renderCaseMedia = ({ item, globalIndex }, totalSize, family = getMediaFamily(item)) => {
  const sequence = String(globalIndex + 1).padStart(2, "0");
  const image = item.image ? `<img src="${item.image}" alt="${item.label}" loading="${globalIndex === 0 ? "eager" : "lazy"}" decoding="async" />` : "";
  const contextLabel = item.sourceLayout === "desktop" ? "PC" : item.sourceLayout === "mobile" ? "MOBILE" : mediaFamilyLabels[family];
  return `
    <figure class="case-media" data-family="${item.display === "long" ? "document" : family}">
      <figcaption>
        <span>${sequence} / ${String(totalSize).padStart(2, "0")}</span>
        <strong>${item.label}</strong>
        <small>${contextLabel}</small>
      </figcaption>
      <button class="case-media-frame" type="button" data-media-view="${globalIndex}" aria-label="放大查看 ${item.label}">
        ${item.display === "long" ? '<span class="case-media-scroll">SCROLL / FULL PAGE</span>' : ""}
        ${image}
        <span class="case-media-inspect">FULL VIEW / ↗</span>
      </button>
    </figure>
  `;
};

const renderCase = (project) => {
  const projectPosition = projects.findIndex((item) => item.id === project.id);
  const nextProject = projects[(projectPosition + 1) % projects.length];
  const caseRuns = buildCaseRuns(project);
  const caseRows = buildCaseRows(caseRuns);
  return `
    <article class="case-study">
      <header class="case-header">
        <div class="case-header-code">
          <span>CASE FILE ${project.index}</span>
          <span>${project.themeTitle}</span>
          <span>${project.year}</span>
        </div>
        <div class="case-title-lockup">
          <div>
            <p>${project.type}</p>
            <h2 id="caseTitle">${project.title}</h2>
          </div>
          <p class="case-summary">${project.summary}</p>
        </div>
        <dl class="case-meta-grid">
          <div><dt>ROLE / 职责</dt><dd>${project.role}</dd></div>
          <div><dt>FORMATS / 内容</dt><dd>${renderFormatSummary(project)}</dd></div>
          <div><dt>SCOPE / 方向</dt><dd>${project.tags.join(" / ")}</dd></div>
          <div><dt>WORKS / 作品</dt><dd>${String(project.media.length).padStart(2, "0")} VISUALS</dd></div>
        </dl>
      </header>
      <section class="case-gallery" aria-labelledby="caseGalleryTitle">
        <div class="case-section-heading">
          <p>01 / SELECTED WORKS</p>
          <h3 id="caseGalleryTitle">作品展示</h3>
          <span>${String(project.media.length).padStart(2, "0")} VISUALS / ${String(caseRows.length).padStart(2, "0")} GROUPS</span>
        </div>
        <div class="case-wall-index" aria-label="作品内容索引">
          ${caseRows.map((row, index) => `<span><b>${String(index + 1).padStart(2, "0")}</b><strong>${row.origin}</strong><small>${row.label} · ${String(row.items.length).padStart(2, "0")}</small></span>`).join("")}
        </div>
        <div class="case-rows">
          ${caseRows.map((row, rowIndex) => `
            <section class="case-row" data-kind="${row.kind}" data-count="${row.items.length}" data-scrollable="${row.items.some(({ item }) => item.display === "long")}" aria-labelledby="caseRow${rowIndex}">
              <header class="case-row-heading">
                <span>${String(rowIndex + 1).padStart(2, "0")} / ${String(caseRows.length).padStart(2, "0")}</span>
                <h4 id="caseRow${rowIndex}">${row.origin}</h4>
                <small>${row.label} / ${String(row.items.length).padStart(2, "0")} WORKS</small>
              </header>
              <div class="case-row-grid">
                ${row.items.map((media) => renderCaseMedia(media, project.media.length)).join("")}
              </div>
            </section>
          `).join("")}
        </div>
      </section>
      <div class="case-end">
        <div><span>END OF CASE ${project.index}</span><strong>继续浏览下一个项目</strong></div>
        <button type="button" data-case-jump="${nextProject.id}"><span>${nextProject.index} / ${nextProject.title}</span><i aria-hidden="true">→</i></button>
      </div>
    </article>
  `;
};

const renderCaseOptions = () => {
  caseProjectSelect.innerHTML = gameThemes.map((theme) => `
    <optgroup label="${theme.index} · ${theme.title}">
      ${theme.projects.map((project) => `<option value="${project.id}">${project.index} · ${project.title}</option>`).join("")}
    </optgroup>
  `).join("");
};

const updateCaseToolbar = (project) => {
  const position = projects.findIndex((item) => item.id === project.id);
  const previousProject = projects[(position - 1 + projects.length) % projects.length];
  const nextProject = projects[(position + 1) % projects.length];
  caseProjectIndex.textContent = `${String(position + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;
  caseProjectTitle.textContent = project.title;
  caseProjectSelect.value = project.id;
  casePrevButton.setAttribute("aria-label", `查看上一个项目：${previousProject.title}`);
  caseNextButton.setAttribute("aria-label", `查看下一个项目：${nextProject.title}`);
  caseShell.style.setProperty("--case-accent", project.accent);
};

const renderOpenCase = (project, { resetScroll = true } = {}) => {
  activeCaseProjectId = project.id;
  caseContent.innerHTML = renderCase(project);
  updateCaseToolbar(project);
  if (resetScroll) caseShell.scrollTop = 0;
};

const openCase = (project) => {
  renderOpenCase(project);
  if (!dialog.open) dialog.showModal();
  document.body.classList.add("dialog-open", "case-is-open");
};

const stepCase = (direction) => {
  const position = projects.findIndex((item) => item.id === activeCaseProjectId);
  const nextPosition = (position + direction + projects.length) % projects.length;
  renderOpenCase(projects[nextPosition]);
};

const MEDIA_ZOOM_MIN = 0.25;
const MEDIA_ZOOM_MAX = 3;
const MEDIA_ZOOM_STEP = 0.25;

const getMediaFitWidth = () => {
  const horizontalPadding = window.innerWidth <= 680 ? 32 : 96;
  return Math.min(1600, Math.max(240, mediaViewer.clientWidth - horizontalPadding));
};

const setMediaZoom = (nextLevel, { resetPosition = false } = {}) => {
  if (!mediaViewer || mediaViewer.hidden) return;
  const previousWidth = Number.parseFloat(mediaViewerImage.style.width) || getMediaFitWidth();
  const previousCenter = mediaViewer.scrollLeft + mediaViewer.clientWidth / 2;
  mediaZoomLevel = Math.min(MEDIA_ZOOM_MAX, Math.max(MEDIA_ZOOM_MIN, nextLevel));
  const nextWidth = Math.round(getMediaFitWidth() * mediaZoomLevel);
  mediaViewerImage.style.width = `${nextWidth}px`;
  mediaViewerZoom.textContent = `${Math.round(mediaZoomLevel * 100)}%`;
  mediaZoomOutButton.disabled = mediaZoomLevel <= MEDIA_ZOOM_MIN;
  mediaZoomInButton.disabled = mediaZoomLevel >= MEDIA_ZOOM_MAX;
  window.requestAnimationFrame(() => {
    if (resetPosition) {
      mediaViewer.scrollTop = 0;
      mediaViewer.scrollLeft = Math.max(0, (mediaViewer.scrollWidth - mediaViewer.clientWidth) / 2);
      return;
    }
    const widthRatio = nextWidth / previousWidth;
    mediaViewer.scrollLeft = Math.max(0, previousCenter * widthRatio - mediaViewer.clientWidth / 2);
  });
};

const closeMediaViewer = ({ restoreFocus = true } = {}) => {
  if (!mediaViewer || mediaViewer.hidden) return;
  mediaViewer.hidden = true;
  mediaPan = null;
  mediaViewerCanvas.classList.remove("is-panning");
  caseContent.inert = false;
  caseToolbar.inert = false;
  mediaViewerImage.removeAttribute("src");
  mediaViewerImage.style.removeProperty("width");
  if (restoreFocus) mediaViewerTrigger?.focus({ preventScroll: true });
  mediaViewerTrigger = null;
};

const openMediaViewer = (item, trigger) => {
  mediaViewerTrigger = trigger;
  mediaViewerImage.src = item.image;
  mediaViewerImage.alt = item.label;
  mediaViewerTitle.textContent = item.label;
  mediaViewerMeta.textContent = item.origin || `${item.detail} / ORIGINAL IMAGE`;
  mediaViewer.hidden = false;
  caseContent.inert = true;
  caseToolbar.inert = true;
  mediaViewer.querySelector("[data-media-close]")?.focus({ preventScroll: true });
};

const finishMediaPan = () => {
  if (!mediaPan) return;
  mediaPan = null;
  mediaViewerCanvas.classList.remove("is-panning");
};

mediaViewerImage?.addEventListener("mousedown", (event) => {
  if (event.button !== 0) return;
  event.preventDefault();
  mediaPan = {
    startX: event.clientX,
    startY: event.clientY,
    scrollLeft: mediaViewer.scrollLeft,
    scrollTop: mediaViewer.scrollTop,
  };
  mediaViewerCanvas.classList.add("is-panning");
});
const moveMediaPan = (event) => {
  if (!mediaPan) return;
  event.preventDefault();
  mediaViewer.scrollLeft = mediaPan.scrollLeft - (event.clientX - mediaPan.startX);
  mediaViewer.scrollTop = mediaPan.scrollTop - (event.clientY - mediaPan.startY);
};
document.addEventListener("mousemove", moveMediaPan);
document.addEventListener("mouseup", finishMediaPan);

heroFeature?.addEventListener("click", (event) => {
  const feature = event.target.closest("[data-theme]");
  if (!feature) return;
  activeThemeId = feature.dataset.theme;
  renderActiveTheme({ transition: activeThemeId !== gameThemes[0].id, focusProjects: true });
});

grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-project]");
  if (!button) return;
  const project = projects.find((item) => item.id === button.dataset.project);
  if (project) openCase(project);
});

casePrevButton.addEventListener("click", () => stepCase(-1));
caseNextButton.addEventListener("click", () => stepCase(1));
caseProjectSelect.addEventListener("change", () => {
  const project = projects.find((item) => item.id === caseProjectSelect.value);
  if (project) renderOpenCase(project);
});
caseContent.addEventListener("click", (event) => {
  const mediaButton = event.target.closest("[data-media-view]");
  if (mediaButton) {
    const project = projects.find((item) => item.id === activeCaseProjectId);
    const item = project?.media[Number(mediaButton.dataset.mediaView)];
    if (!item || !mediaViewer) return;
    openMediaViewer(item, mediaButton);
    return;
  }
  const target = event.target.closest("[data-case-jump]");
  if (!target) return;
  const project = projects.find((item) => item.id === target.dataset.caseJump);
  if (project) renderOpenCase(project);
});

const closeCase = () => {
  closeMediaViewer({ restoreFocus: false });
  dialog.close();
  document.body.classList.remove("dialog-open", "case-is-open");
};

closeButton.addEventListener("click", closeCase);
dialog.addEventListener("click", (event) => { if (event.target === dialog) closeCase(); });
dialog.addEventListener("close", () => document.body.classList.remove("dialog-open", "case-is-open"));
mediaViewer?.addEventListener("click", (event) => {
  if (event.target === mediaViewer || event.target === mediaViewerCanvas || event.target.closest("[data-media-close]")) closeMediaViewer();
});
mediaZoomOutButton?.addEventListener("click", () => setMediaZoom(mediaZoomLevel - MEDIA_ZOOM_STEP));
mediaZoomInButton?.addEventListener("click", () => setMediaZoom(mediaZoomLevel + MEDIA_ZOOM_STEP));
mediaZoomFitButton?.addEventListener("click", () => setMediaZoom(1, { resetPosition: true }));
mediaViewerImage?.addEventListener("load", () => setMediaZoom(1, { resetPosition: true }));
mediaViewerCanvas?.addEventListener("wheel", (event) => {
  event.preventDefault();
  setMediaZoom(mediaZoomLevel + (event.deltaY < 0 ? MEDIA_ZOOM_STEP : -MEDIA_ZOOM_STEP));
}, { passive: false });
document.addEventListener("keydown", (event) => {
  if (!mediaViewer || mediaViewer.hidden) return;
  if (event.key === "Escape") {
    event.preventDefault();
    event.stopImmediatePropagation();
    closeMediaViewer();
    return;
  }
  if (["+", "="].includes(event.key)) setMediaZoom(mediaZoomLevel + MEDIA_ZOOM_STEP);
  else if (event.key === "-") setMediaZoom(mediaZoomLevel - MEDIA_ZOOM_STEP);
  else if (event.key === "0") setMediaZoom(1, { resetPosition: true });
  else return;
  event.preventDefault();
}, true);
renderCaseOptions();

const setCursorMode = (mode = "") => {
  if (!cursorOrbit) return;
  cursorOrbit.dataset.mode = mode;
  cursorOrbit.querySelector(".cursor-label").textContent = mode === "select" ? "SELECT" : mode === "inspect" ? "VIEW" : mode === "enter" ? "ENTER" : mode === "close" ? "CLOSE" : "OPEN";
};

const initCursor = () => {
  if (!cursorOrbit || !finePointer || reducedMotion) return;
  document.body.classList.add("has-custom-cursor");
  document.addEventListener("pointermove", (event) => {
    root.style.setProperty("--cursor-x", `${event.clientX}px`);
    root.style.setProperty("--cursor-y", `${event.clientY}px`);
  }, { passive: true });
  document.addEventListener("pointerover", (event) => {
    const target = event.target.closest?.("[data-cursor]");
    setCursorMode(target?.dataset.cursor || "");
  });
  document.addEventListener("pointerout", (event) => {
    if (event.relatedTarget?.closest?.("[data-cursor]")) return;
    setCursorMode("");
  });
};

const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  root.style.setProperty("--scroll-progress", scrollable > 0 ? window.scrollY / scrollable : 0);
};

window.addEventListener("scroll", () => { updateProgress(); revealInViewport(); }, { passive: true });
window.addEventListener("resize", revealInViewport, { passive: true });
updateProgress();
renderActiveTheme();
observeReveals();
window.requestAnimationFrame(revealInViewport);
initCursor();
renderHeroFeature();
renderHeroStats();
initHeroFeaturePreview();
document.querySelector("#currentYear").textContent = new Date().getFullYear();
