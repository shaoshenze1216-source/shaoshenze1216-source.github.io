const shot = (label, image, { detail = "PAGE", tone = "paper", display = "screen" } = {}) => ({
  label,
  detail,
  tone,
  display,
  image,
});

const series = (count, prefix, label, { tone = "paper", display = "screen", start = 1 } = {}) => (
  Array.from({ length: count }, (_, index) => {
    const number = index + start;
    return shot(`${label} ${String(number).padStart(2, "0")}`, `${prefix}${number}.jpg`, {
      detail: String(number).padStart(2, "0"),
      tone,
      display,
    });
  })
);

const desktopGroup = (items) => ({
  id: "desktop",
  short: "PC",
  title: "PC 端设计",
  eyebrow: "DESKTOP EXPERIENCE",
  description: "桌面端页面、关键模块与交互状态。",
  layout: "desktop",
  items,
});

const mobileGroup = (items) => ({
  id: "mobile",
  short: "MOBILE",
  title: "Mobile 端设计",
  eyebrow: "MOBILE EXPERIENCE",
  description: "移动端页面与跨端适配状态。",
  layout: "mobile",
  items,
});

const detailGroup = (id, short, title, eyebrow, description, items, layout = "states") => ({
  id,
  short,
  title,
  eyebrow,
  description,
  layout,
  items,
});

const sourceGameThemes = [
  {
    id: "ro",
    index: "01",
    code: "GP / 01",
    title: "仙境传说 / RAGNAROK",
    subtitle: "CBT LANDING · COLLABORATION PAGE",
    description: "仙境传说的品牌视觉、测试服页面与地下城联动设计。",
    accent: "#ff936e",
    cover: { image: "/theme-covers/ro.png", background: "#62a3e5" },
    projects: [
      {
        id: "ro-brand-system",
        index: "01.01",
        title: "品牌风格定调",
        type: "BRAND VISUAL SYSTEM",
        year: "RO2",
        role: "品牌视觉 / 风格系统",
        summary: "从角色气质、色彩结构到 UI 边框与装饰语汇，建立可延展的品牌视觉方向。",
        tags: ["Brand", "Moodboard", "UI Language"],
        groups: [
          detailGroup(
            "brand-system",
            "BRAND",
            "品牌视觉系统",
            "BRAND MOOD & UI LANGUAGE",
            "将风格版、角色调性与界面装饰系统集中呈现，建立后续页面设计的统一依据。",
            [
              shot("品牌风格版", "/projects/ro-brand-mood.jpg", { detail: "01", tone: "blue", display: "wide" }),
              shot("视觉系统 01", "/projects/ro-brand-system-1.jpg", { detail: "02", tone: "paper", display: "wide" }),
              shot("视觉系统 02", "/projects/ro-brand-system-2.jpg", { detail: "03", tone: "paper", display: "wide" }),
            ],
            "wide",
          ),
        ],
      },
      {
        id: "ro-chuxin-cbt",
        index: "01.01",
        title: "初心服 CBT 页面",
        type: "CBT LANDING PAGE",
        year: "CBT",
        role: "网页设计 / 视觉系统",
        summary: "围绕测试服开启、版本信息和参与入口组织的游戏官网落地页。",
        tags: ["Landing", "CBT", "Responsive"],
        groups: [
          desktopGroup([
            shot("PC / FULL PAGE", "/projects/ro-chuxin-main.jpg", { tone: "orange", display: "long" }),
            shot("PC / CAROUSEL", "/projects/ro-chuxin-carousel.jpg", { detail: "02", tone: "paper" }),
          ]),
          mobileGroup([
            shot("MOBILE / FULL PAGE", "/projects/ro-chuxin-mobile.jpg", { tone: "blue", display: "long" }),
            shot("MOBILE / CAROUSEL", "/projects/ro-chuxin-mobile-carousel.jpg", { detail: "02", tone: "paper" }),
          ]),
        ],
      },
      {
        id: "ro-dungeon-collab",
        index: "01.02",
        title: "地下城联动页面",
        type: "COLLABORATION PAGE",
        year: "COLLAB",
        role: "活动页面 / 视觉设计",
        summary: "以联动主视觉、活动规则和奖励入口为核心的专题页面。",
        tags: ["Collab", "Event", "Longform"],
        groups: [
          desktopGroup([shot("PC / FULL PAGE", "/projects/ro-dungeon-main.jpg", { tone: "orange", display: "long" })]),
          mobileGroup([shot("MOBILE / FULL PAGE", "/projects/ro-dungeon-mobile.jpg", { tone: "paper", display: "long" })]),
        ],
      },
    ],
  },
  {
    id: "yise",
    index: "02",
    code: "GP / 02",
    title: "伊瑟 / ETHERIA",
    subtitle: "EVENT SITE · SEASON PREVIEW",
    description: "伊瑟电竞赛事、全球总决赛、赛季前瞻与全球庆典页面。",
    accent: "#8cc8ff",
    cover: { image: "/theme-covers/yise.png", background: "#d72453" },
    projects: [
      {
        id: "yise-global-finals",
        index: "02.01",
        title: "2025 全球总决赛",
        type: "GLOBAL FINALS SITE",
        year: "2025",
        role: "赛事页面 / 视觉设计",
        summary: "为全球总决赛组织赛事信息、赛程内容和观赛入口。",
        tags: ["Esports", "Finals", "Campaign"],
        groups: [
          desktopGroup(series(5, "/projects/yise-global-finals-", "PC SCREEN", { tone: "blue" })),
          mobileGroup([
            ...series(5, "/projects/yise-global-finals-mobile-", "MOBILE SCREEN", { tone: "paper" }),
            shot("MOBILE / NAVIGATION", "/projects/yise-global-finals-mobile-nav.jpg", { detail: "NAV", tone: "black" }),
          ]),
        ],
      },
      {
        id: "yise-esports",
        index: "02.02",
        title: "2025 电竞赛事",
        type: "ESPORTS EVENT SITE",
        year: "2025",
        role: "赛事官网 / 信息设计",
        summary: "将赛事规则、赛程、选手与阶段性状态整理成完整页面。",
        tags: ["Esports", "Event", "Information"],
        groups: [
          desktopGroup([
            shot("PC / HERO", "/projects/yise-esports-hero.jpg", { tone: "blue" }),
            shot("PC / ROUND STATE 01", "/projects/yise-esports-state-1.jpg", { detail: "02", tone: "steel" }),
            shot("PC / ROUND STATE 02", "/projects/yise-esports-state-2.jpg", { detail: "03", tone: "steel" }),
            shot("PC / SCREEN 03", "/projects/yise-esports-screen-3.jpg", { detail: "04", tone: "paper" }),
            shot("PC / SCREEN 04", "/projects/yise-esports-screen-4.jpg", { detail: "05", tone: "paper" }),
          ]),
          mobileGroup([
            shot("MOBILE / SCREEN 01", "/projects/yise-esports-mobile-1.jpg", { tone: "blue" }),
            shot("MOBILE / ROUND STATE 01", "/projects/yise-esports-mobile-state-1.jpg", { detail: "02", tone: "steel" }),
            shot("MOBILE / ROUND STATE 02", "/projects/yise-esports-mobile-state-2.jpg", { detail: "03", tone: "steel" }),
            shot("MOBILE / SCREEN 03", "/projects/yise-esports-mobile-3.jpg", { detail: "04", tone: "paper" }),
            shot("MOBILE / SCREEN 04", "/projects/yise-esports-mobile-4.jpg", { detail: "05", tone: "paper" }),
            shot("MOBILE / NAVIGATION", "/projects/yise-esports-mobile-nav.jpg", { detail: "NAV", tone: "black" }),
          ]),
        ],
      },
      {
        id: "yise-ss2",
        index: "02.03",
        title: "SS2 赛季前瞻页",
        type: "SEASON PREVIEW PAGE",
        year: "SS2",
        role: "赛季页面 / 交互设计",
        summary: "以赛季内容、日历和弹窗信息组织的前瞻页面。",
        tags: ["Season", "Calendar", "Interaction"],
        groups: [
          desktopGroup([
            shot("PC / FULL PAGE", "/projects/yise-ss2-main.jpg", { tone: "blue", display: "long" }),
            shot("PC / MODAL", "/projects/yise-ss2-modal.jpg", { detail: "02", tone: "black" }),
            shot("PC / CALENDAR", "/projects/yise-ss2-calendar.jpg", { detail: "03", tone: "paper" }),
          ]),
          mobileGroup([
            shot("MOBILE / FULL PAGE", "/projects/yise-ss2-mobile-main.jpg", { tone: "blue", display: "long" }),
            shot("MOBILE / MODAL", "/projects/yise-ss2-mobile-modal.jpg", { detail: "02", tone: "black" }),
            shot("MOBILE / CALENDAR", "/projects/yise-ss2-mobile-calendar.jpg", { detail: "03", tone: "paper" }),
          ]),
        ],
      },
      {
        id: "yise-ss3",
        index: "02.04",
        title: "SS3 赛季前瞻页",
        type: "SEASON PREVIEW PAGE",
        year: "SS3",
        role: "赛季页面 / 长图设计",
        summary: "围绕新赛季内容与版本信息建立连续的网页阅读路径。",
        tags: ["Season", "Preview", "Longform"],
        groups: [
          desktopGroup([shot("PC / FULL PAGE", "/projects/yise-ss3-main.jpg", { tone: "blue", display: "long" })]),
          mobileGroup([shot("MOBILE / FULL PAGE", "/projects/yise-ss3-mobile.jpg", { tone: "paper", display: "long" })]),
        ],
      },
      {
        id: "yise-ss4",
        index: "02.05",
        title: "SS4 赛季前瞻页",
        type: "SEASON PREVIEW PAGE",
        year: "SS4",
        role: "赛季页面 / 长图设计",
        summary: "将赛季主视觉、玩法更新与行动入口整理成纵向页面。",
        tags: ["Season", "Update", "Longform"],
        groups: [
          desktopGroup([shot("PC / FULL PAGE", "/projects/yise-ss4-main.jpg", { tone: "steel", display: "long" })]),
          mobileGroup([shot("MOBILE / FULL PAGE", "/projects/yise-ss4-mobile.jpg", { tone: "paper", display: "long" })]),
          detailGroup("mood", "MOOD", "视觉风格", "SEASON VISUAL DIRECTION", "补充呈现本赛季的色彩、角色、标题字与 UI 装饰语言。", [shot("SS4 / MOODBOARD", "/projects/yise-ss4-mood.jpg", { tone: "orange", display: "wide" })], "wide"),
        ],
      },
      {
        id: "yise-ss5",
        index: "02.06",
        title: "SS5 赛季前瞻页",
        type: "SEASON PREVIEW PAGE",
        year: "SS5",
        role: "赛季页面 / 长图设计",
        summary: "用页面索引、内容模块与活动入口承载新赛季信息。",
        tags: ["Season", "Preview", "Page System"],
        groups: [
          desktopGroup([shot("PC / FULL PAGE", "/projects/yise-ss5-main.jpg", { tone: "blue", display: "long" })]),
          mobileGroup([shot("MOBILE / FULL PAGE", "/projects/yise-ss5-mobile.jpg", { tone: "paper", display: "long" })]),
          detailGroup("mood", "MOOD", "视觉风格", "SEASON VISUAL DIRECTION", "补充呈现夏日音乐主题的色彩、角色与 UI 组件方向。", [shot("SS5 / MOODBOARD", "/projects/yise-ss5-mood.jpg", { tone: "blue", display: "wide" })], "wide"),
        ],
      },
      {
        id: "yise-global-celebration",
        index: "02.07",
        title: "全球庆典",
        type: "CELEBRATION SITE",
        year: "2025",
        role: "庆典页面 / 视觉系统",
        summary: "围绕庆典内容、互动入口和阶段信息组织的活动页面。",
        tags: ["Celebration", "Event", "Visual System"],
        groups: [
          desktopGroup(series(9, "/projects/yise-global-celebration-", "PC SCREEN", { tone: "blue" })),
          mobileGroup([
            ...series(7, "/projects/yise-global-celebration-mobile-", "MOBILE SCREEN", { tone: "paper" }),
            shot("MOBILE / NAVIGATION", "/projects/yise-global-celebration-mobile-nav.jpg", { detail: "NAV", tone: "black" }),
          ]),
        ],
      },
    ],
  },
  {
    id: "mafen",
    index: "03",
    code: "GP / 03",
    title: "出发吧麦芬 / GO GO MUFFIN",
    subtitle: "COLLABORATION PAGE · EVENT LANDING",
    description: "出发吧麦芬 EVA 与咖波联动活动页面。",
    accent: "#ffce5b",
    cover: { image: "/theme-covers/mafen.png", background: "#b26d2c" },
    projects: [
      {
        id: "mafen-eva",
        index: "03.01",
        title: "EVA 联动页面",
        type: "COLLABORATION PAGE",
        year: "EVA",
        role: "联动活动 / 网页设计",
        summary: "围绕联动主视觉与活动内容建立 PC、Mobile 一致的跨端页面体验。",
        tags: ["EVA", "Collab", "Responsive"],
        groups: [
          desktopGroup([shot("PC / FULL PAGE", "/projects/maifen-eva-main.jpg", { tone: "yellow", display: "long" })]),
          mobileGroup([shot("MOBILE / FULL PAGE", "/projects/maifen-eva-mobile.jpg", { tone: "paper", display: "long" })]),
        ],
      },
      {
        id: "mafen-kapo",
        index: "03.02",
        title: "咖波联动页面",
        type: "COLLABORATION PAGE",
        year: "KAPO",
        role: "联动活动 / 视觉设计",
        summary: "以联动角色与轻量活动内容构建 PC、Mobile 一致的跨端页面。",
        tags: ["Kapo", "Collab", "Responsive"],
        groups: [
          desktopGroup([shot("PC / FULL PAGE", "/projects/maifen-kapo-main.jpg", { tone: "yellow", display: "long" })]),
          mobileGroup([shot("MOBILE / FULL PAGE", "/projects/maifen-kapo-mobile.jpg", { tone: "paper", display: "long" })]),
        ],
      },
    ],
  },
  {
    id: "xindong",
    index: "04",
    code: "GP / 04",
    title: "心动小镇 / HEARTOPIA",
    subtitle: "INTERACTIVE TOOLS · ANNIVERSARY · PUBLIC WELFARE",
    description: "心动小镇名片生成器、周年庆时光邮局与海洋公益互动体验。",
    accent: "#9ee7d4",
    cover: { image: "/theme-covers/xindong.png", background: "#def3ff" },
    projects: [
      {
        id: "xindong-card-maker",
        index: "04.01",
        title: "名片生成器",
        type: "INTERACTIVE TOOL",
        year: "—",
        role: "互动工具 / 视觉设计",
        summary: "以角色信息、编辑流程和生成结果组成的跨端名片工具。",
        tags: ["Generator", "Interactive", "Responsive"],
        groups: [
          desktopGroup(series(6, "/projects/xindong-card-maker-pc-", "PC SCREEN", { tone: "mint" })),
          mobileGroup(series(7, "/projects/xindong-card-maker-mobile-", "MOBILE SCREEN", { tone: "paper" })),
        ],
      },
      {
        id: "xindong-anniversary",
        index: "04.02",
        title: "周年庆时光邮局",
        type: "ANNIVERSARY EXPERIENCE",
        year: "ANNIVERSARY",
        role: "周年活动 / 互动页面",
        summary: "以邮局、卡片和加载状态组成的周年庆互动体验。",
        tags: ["Anniversary", "Interactive", "Cards"],
        groups: [
          detailGroup("experience", "FLOW", "体验流程", "EXPERIENCE FLOW", "从进入、选择到生成结果，按真实操作路径连续陈列。", series(8, "/projects/xindong-anniversary-flow-", "FLOW", { tone: "mint", display: "square" })),
          detailGroup("cards", "CARDS", "卡片细节", "CARD DETAILS", "卡片内容与版式变化集中展示，保持统一画幅便于快速比较。", series(4, "/projects/xindong-anniversary-card-", "CARD", { tone: "paper" })),
          detailGroup("loading", "LOADING", "加载状态", "LOADING STATES", "补充呈现进入体验时的加载与过渡画面。", series(3, "/projects/xindong-anniversary-loading-", "LOADING", { tone: "yellow", display: "square" })),
        ],
      },
      {
        id: "xindong-ocean",
        index: "04.03",
        title: "海洋公益",
        type: "PUBLIC WELFARE EXPERIENCE",
        year: "—",
        role: "公益活动 / 互动设计",
        summary: "围绕海洋主题内容与公益行动建立的沉浸式互动页面。",
        tags: ["Public Welfare", "Ocean", "Interactive"],
        groups: [
          detailGroup("experience", "FLOW", "互动流程", "INTERACTIVE EXPERIENCE", "将主要互动节点按操作顺序集中展示。", series(4, "/projects/xindong-ocean-flow-", "FLOW", { tone: "blue", display: "square" })),
          detailGroup("loading", "LOADING", "加载状态", "LOADING STATE", "项目加载画面，补充入口状态与体验节奏。", [shot("LOADING / ENTRY", "/projects/xindong-ocean-loading.jpg", { tone: "paper", display: "square" })]),
        ],
      },
    ],
  },
  {
    id: "torchlight",
    index: "05",
    code: "GP / 05",
    title: "火炬之光 / TORCHLIGHT",
    subtitle: "SEASON PREVIEW · VERSION PAGE",
    description: "火炬之光 SS7 赛季前瞻页面设计。",
    accent: "#f2a074",
    cover: { image: "/theme-covers/torchlight.png", background: "#31205a" },
    projects: [
      {
        id: "torch-ss7",
        index: "05.02",
        title: "SS7 赛季前瞻页",
        type: "SEASON PREVIEW PAGE",
        year: "SS7",
        role: "赛季页面 / 网页设计",
        summary: "围绕新赛季主视觉、更新内容与活动入口建立页面节奏。",
        tags: ["Season", "Update", "Page System"],
        groups: [
          desktopGroup([shot("PC / FULL PAGE", "/projects/torch-ss7-main.jpg", { tone: "orange", display: "long" })]),
          mobileGroup([shot("MOBILE / FULL PAGE", "/projects/torch-ss7-mobile.jpg", { tone: "paper", display: "long" })]),
        ],
      },
    ],
  },
  {
    id: "suzuran",
    index: "06",
    code: "GP / 06",
    title: "铃兰之剑 / CONVALLARIA",
    subtitle: "OFFICIAL SITE · FAN SHOWCASE",
    description: "铃兰游戏官网标题设计与同人作品展示页面。",
    accent: "#c7a2ff",
    cover: { image: "/theme-covers/suzuran.png", background: "#6c9986" },
    projects: [
      {
        id: "suzuran-official",
        index: "06.01",
        title: "官网标题设计",
        type: "OFFICIAL SITE",
        year: "—",
        role: "官网视觉 / 标题设计",
        summary: "为游戏官网建立可延展的标题、章节和页面识别系统。",
        tags: ["Official", "Typography", "System"],
        groups: [desktopGroup(series(3, "/projects/suzuran-official-", "PC TITLE", { tone: "violet" }))],
      },
      {
        id: "suzuran-fan-showcase",
        index: "06.02",
        title: "同人作品展示页面",
        type: "FAN SHOWCASE PAGE",
        year: "—",
        role: "展示页面 / 交互设计",
        summary: "以作品卡片和移动端适配承载同人内容的跨端展示体验。",
        tags: ["Showcase", "Gallery", "Responsive"],
        groups: [
          desktopGroup([shot("PC / FULL PAGE", "/projects/suzuran-fan-main.jpg", { tone: "violet", display: "long" })]),
          mobileGroup([shot("MOBILE / FULL PAGE", "/projects/suzuran-fan-mobile.jpg", { tone: "paper", display: "long" })]),
        ],
      },
    ],
  },
  {
    id: "hengsao",
    index: "07",
    code: "GP / 07",
    title: "横扫千军 / LONG-RUNNING",
    subtitle: "BRAND SHOWCASE · LIVE PROJECT",
    description: "横扫千军的品牌识别、页面截图与长期运营内容。",
    accent: "#dfff00",
    projects: [
      {
        id: "hengsao-brand",
        index: "07.01",
        title: "长线项目品牌展示",
        type: "BRAND SHOWCASE",
        year: "ONGOING",
        role: "品牌页面 / 视觉系统",
        summary: "将品牌标识、页面截图和长期运营内容整理成展示页面。",
        tags: ["Brand", "Live Ops", "Showcase"],
        groups: [
          detailGroup("brand", "BRAND", "品牌识别", "BRAND IDENTITY", "先建立项目的品牌识别，再进入 PC 与 Mobile 页面画面。", [shot("BRAND / LOGO SYSTEM", "/projects/hengsao-brand.jpg", { tone: "lime", display: "long" })], "brand"),
          desktopGroup(series(4, "/projects/hengsao-pc-", "PC SCREEN", { tone: "steel" })),
          mobileGroup(series(4, "/projects/hengsao-mobile-", "MOBILE SCREEN", { tone: "black" })),
        ],
      },
    ],
  },
  {
    id: "sausage",
    index: "08",
    code: "GP / 08",
    title: "香肠派对 / SAUSAGE MAN",
    subtitle: "TOURNAMENT HUB · UI & VI SYSTEM",
    description: "香肠派对赛事中心的业务界面、UI 层级、视觉规范与验证过程。",
    accent: "#63e83b",
    cover: { image: "/theme-covers/sausage.png", background: "#2a469c" },
    projects: [
      {
        id: "sausage-tournament-hub",
        index: "08.01",
        title: "赛事中心",
        type: "TOURNAMENT HUB",
        year: "2025",
        role: "赛事平台 / UI 与 VI 系统",
        summary: "围绕报名、商店、竞猜、战队与直播建立一体化赛事中心，并沉淀完整的界面层级与视觉规范。",
        tags: ["Tournament", "UI System", "Visual Identity"],
        groups: [
          detailGroup(
            "features",
            "MODULES",
            "功能模块",
            "TOURNAMENT MODULES",
            "将报名、活动商店、竞猜、战队与直播的完整状态板按业务顺序展示。",
            [
              shot("报名中心", "/projects/sausage-tournament-feature-1.jpg", { detail: "01", tone: "lime", display: "wide" }),
              shot("活动商店", "/projects/sausage-tournament-feature-2.jpg", { detail: "02", tone: "blue", display: "wide" }),
              shot("竞猜", "/projects/sausage-tournament-feature-3.jpg", { detail: "03", tone: "paper", display: "wide" }),
              shot("战队", "/projects/sausage-tournament-feature-4.jpg", { detail: "04", tone: "blue", display: "wide" }),
              shot("直播", "/projects/sausage-tournament-feature-5.jpg", { detail: "05", tone: "black", display: "wide" }),
            ],
            "wide",
          ),
          detailGroup(
            "system",
            "SYSTEM",
            "视觉系统与验证",
            "VISUAL SYSTEM & VALIDATION",
            "从全局 Guideline、VI 手册、UI 层级到验证稿，呈现界面背后的设计规范与判断过程。",
            [
              shot("赛事中心 Guideline", "/projects/sausage-tournament-guideline.jpg", { detail: "01", tone: "paper", display: "wide" }),
              shot("VI 手册", "/projects/sausage-tournament-vi.jpg", { detail: "02", tone: "blue", display: "long" }),
              shot("UI 层级", "/projects/sausage-tournament-ui-levels.jpg", { detail: "03", tone: "paper", display: "wide" }),
              shot("设计验证", "/projects/sausage-tournament-validation.jpg", { detail: "04", tone: "lime", display: "wide" }),
            ],
            "system",
          ),
        ],
      },
    ],
  },
  {
    id: "feise",
    index: "09",
    code: "GP / 09",
    title: "绯色回响 / ECHOCALYPSE",
    subtitle: "OFFICIAL SITE · RESPONSIVE EXPERIENCE",
    description: "绯色回响游戏官网的 PC 与 Mobile 跨端设计。",
    accent: "#ff554d",
    projects: [
      {
        id: "feise-official-site",
        index: "09.01",
        title: "游戏官网",
        type: "OFFICIAL GAME SITE",
        year: "—",
        role: "官网设计 / 响应式适配",
        summary: "围绕游戏世界、角色档案、新闻和特色内容建立跨端一致的官网阅读体验。",
        tags: ["Official", "Responsive", "Longform"],
        groups: [
          desktopGroup([shot("PC / FULL PAGE", "/projects/feise-official-pc.jpg", { tone: "black", display: "long" })]),
          mobileGroup([shot("MOBILE / FULL PAGE", "/projects/feise-official-mobile.jpg", { tone: "paper", display: "long" })]),
        ],
      },
    ],
  },
  {
    id: "shaoxi",
    index: "10",
    code: "GP / 10",
    title: "少年西游记2 / WESTWARD JOURNEY 2",
    subtitle: "CAMPAIGN PAGE · CHARACTER VISUAL",
    description: "少年西游记2活动长页、节气宣发与东方朋克角色视觉系统。",
    accent: "#ff405d",
    projects: [
      {
        id: "shaoxi-review-campaign",
        index: "10.01",
        title: "公测点评活动页",
        type: "CAMPAIGN LANDING PAGE",
        year: "2024",
        role: "活动页面 / 视觉设计",
        summary: "以公测开启、活动规则、奖励与参与方式组成的连续活动长页。",
        tags: ["Campaign", "Landing", "Longform"],
        groups: [
          detailGroup("campaign", "PAGE", "活动长页", "CAMPAIGN LONGFORM", "活动页面从主视觉、规则到奖励说明的纵向内容。", [shot("公测点评活动页", "/projects/shaoxi-review-main.jpg", { tone: "black", display: "long" })], "brand"),
        ],
      },
      {
        id: "shaoxi-seasonal-visuals",
        index: "10.02",
        title: "节气宣发视觉",
        type: "SEASONAL KEY VISUAL",
        year: "2024",
        role: "市场宣发 / 主视觉设计",
        summary: "以节气氛围、角色与东方构图组织的横版市场宣发视觉。",
        tags: ["Campaign", "Key Visual", "Seasonal"],
        groups: [
          detailGroup("seasonal", "KV", "节气主视觉", "SEASONAL CAMPAIGN VISUALS", "将不同节气主题的横版画面并列展示，便于比较角色、氛围与标题编排。", series(3, "/projects/shaoxi-festival-", "SEASONAL KV", { tone: "paper" }), "states"),
        ],
      },
      {
        id: "shaoxi-character-system",
        index: "10.03",
        title: "东方朋克角色系统",
        type: "CHARACTER VISUAL SYSTEM",
        year: "2024",
        role: "角色宣发 / 视觉系统",
        summary: "围绕二郎神、哮天犬、奎木狼与百花羞建立主海报、横版适配和角色设定长图体系。",
        tags: ["Character", "Visual System", "Adaptation"],
        groups: [
          detailGroup(
            "posters",
            "POSTER",
            "角色主海报",
            "CHARACTER KEY ART",
            "四名角色使用统一东方朋克语汇，保持构图识别与个体气质的平衡。",
            [
              shot("二郎神 / POSTER", "/projects/shaoxi-erlang-poster.jpg", { detail: "01", tone: "violet", display: "long" }),
              shot("哮天犬 / POSTER", "/projects/shaoxi-xiaotian-poster.jpg", { detail: "02", tone: "violet", display: "long" }),
              shot("奎木狼 / POSTER", "/projects/shaoxi-kuimulang-poster.jpg", { detail: "03", tone: "violet", display: "long" }),
              shot("百花羞 / POSTER", "/projects/shaoxi-baihuaxiu-poster.jpg", { detail: "04", tone: "violet", display: "long" }),
            ],
            "states",
          ),
          detailGroup(
            "adaptations",
            "WIDE",
            "横版适配",
            "LANDSCAPE ADAPTATIONS",
            "在统一信息骨架下完成角色画面的横版渠道适配。",
            [
              shot("二郎神 / WIDE", "/projects/shaoxi-erlang-wide.jpg", { detail: "01", tone: "black", display: "wide" }),
              shot("哮天犬 / WIDE", "/projects/shaoxi-xiaotian-wide.jpg", { detail: "02", tone: "black", display: "wide" }),
              shot("奎木狼 / WIDE", "/projects/shaoxi-kuimulang-wide.jpg", { detail: "03", tone: "black", display: "wide" }),
              shot("百花羞 / WIDE", "/projects/shaoxi-baihuaxiu-wide.jpg", { detail: "04", tone: "black", display: "wide" }),
            ],
            "states",
          ),
          detailGroup(
            "details",
            "DETAIL",
            "角色设定长图",
            "CHARACTER DETAIL ARCHIVE",
            "从人物介绍、潮流服饰到武器与技能，完整呈现四名角色的设定信息。",
            [
              shot("二郎神 / DETAIL", "/projects/shaoxi-erlang-detail.jpg", { detail: "01", tone: "violet", display: "long" }),
              shot("哮天犬 / DETAIL", "/projects/shaoxi-xiaotian-detail.jpg", { detail: "02", tone: "violet", display: "long" }),
              shot("奎木狼 / DETAIL", "/projects/shaoxi-kuimulang-detail.jpg", { detail: "03", tone: "violet", display: "long" }),
              shot("百花羞 / DETAIL", "/projects/shaoxi-baihuaxiu-detail.jpg", { detail: "04", tone: "violet", display: "long" }),
            ],
            "states",
          ),
        ],
      },
    ],
  },
  {
    id: "shanhai",
    index: "11",
    code: "GP / 11",
    title: "山海镜花 / MIRAGE",
    subtitle: "CAMPAIGN VISUAL · CHARACTER GRAPH",
    description: "山海镜花节日主题画面与角色 GRAPH 系列。",
    accent: "#d8bd65",
    projects: [
      {
        id: "shanhai-campaign-visuals",
        index: "11.01",
        title: "市场宣发视觉",
        type: "CAMPAIGN VISUAL ARCHIVE",
        year: "—",
        role: "市场视觉 / 角色宣发",
        summary: "以节日氛围、东方纹理和角色表现构成的多画幅市场视觉档案。",
        tags: ["Campaign", "Character", "Graphic"],
        groups: [
          detailGroup("festival-posters", "POSTER", "节日主题海报", "FESTIVAL POSTERS", "纵向节日画面独立成组，保持完整构图与文字层级。", series(2, "/projects/shanhai-festival-", "FESTIVAL POSTER", { tone: "yellow", display: "long" }), "states"),
          detailGroup("festival-wide", "WIDE", "节日横版视觉", "FESTIVAL LANDSCAPE VISUALS", "横向渠道画面集中展示，便于快速比较版式与氛围变化。", series(2, "/projects/shanhai-festival-", "FESTIVAL WIDE", { tone: "paper", display: "wide", start: 3 }), "states"),
          detailGroup("character-graph", "GRAPH", "角色 GRAPH", "CHARACTER GRAPH SERIES", "五张角色视觉以统一横向画幅形成连续系列。", series(5, "/projects/shanhai-graph-", "CHARACTER GRAPH", { tone: "black", display: "wide" }), "states"),
        ],
      },
    ],
  },
  {
    id: "misc-games",
    index: "12",
    code: "GP / 12",
    title: "其他游戏视觉 / OTHER TITLES",
    subtitle: "KEY VISUAL · GLOBAL CAMPAIGN",
    description: "海外节日活动与角色召唤等游戏市场主视觉。",
    accent: "#8fa9ff",
    projects: [
      {
        id: "misc-infinity-kingdom",
        index: "12.01",
        title: "Infinity Kingdom · Snow Festival",
        type: "FESTIVAL KEY VISUAL",
        year: "—",
        role: "海外市场 / 活动主视觉",
        summary: "以圣诞角色群像、礼物与节日灯光构建的 Snow Festival 横版主视觉。",
        tags: ["Global", "Festival", "Key Visual"],
        groups: [detailGroup("visual", "KV", "活动主视觉", "FESTIVAL KEY VISUAL", "完整展示海外节日活动的横版视觉成稿。", [shot("SNOW FESTIVAL", "/projects/misc-infinity-kingdom.jpg", { tone: "blue", display: "wide" })], "wide")],
      },
      {
        id: "misc-saint-seiya",
        index: "12.02",
        title: "Saint Seiya · 限时召唤",
        type: "SUMMON CAMPAIGN VISUAL",
        year: "—",
        role: "海外市场 / 角色主视觉",
        summary: "围绕角色、召唤信息和火焰场景组织的限时活动横版视觉。",
        tags: ["Global", "Character", "Key Visual"],
        groups: [detailGroup("visual", "KV", "召唤主视觉", "SUMMON KEY VISUAL", "完整展示限时召唤活动的横版视觉成稿。", [shot("LIMITED-TIME SUMMON", "/projects/misc-saint-seiya.jpg", { tone: "orange", display: "wide" })], "wide")],
      },
    ],
  },
];

const themeOrder = ["yise", "sausage", "xindong", "ro", "torchlight", "mafen", "suzuran", "feise", "shaoxi", "shanhai", "hengsao", "misc-games"];
const projectOrder = {
  yise: ["yise-esports", "yise-global-finals", "yise-ss5", "yise-ss4", "yise-ss3", "yise-ss2", "yise-global-celebration"],
  sausage: ["sausage-tournament-hub"],
  xindong: ["xindong-anniversary", "xindong-card-maker", "xindong-ocean"],
  ro: ["ro-brand-system", "ro-dungeon-collab", "ro-chuxin-cbt"],
  torchlight: ["torch-ss7"],
  mafen: ["mafen-eva", "mafen-kapo"],
  suzuran: ["suzuran-fan-showcase", "suzuran-official"],
  shaoxi: ["shaoxi-review-campaign", "shaoxi-seasonal-visuals", "shaoxi-character-system"],
};

const orderRank = (order, id) => {
  const rank = order.indexOf(id);
  return rank === -1 ? order.length : rank;
};

sourceGameThemes.sort((a, b) => orderRank(themeOrder, a.id) - orderRank(themeOrder, b.id));

sourceGameThemes.forEach((theme, themePosition) => {
  const themeIndex = String(themePosition + 1).padStart(2, "0");
  const orderedProjects = projectOrder[theme.id];
  if (orderedProjects) {
    theme.projects.sort((a, b) => orderRank(orderedProjects, a.id) - orderRank(orderedProjects, b.id));
  }
  theme.index = themeIndex;
  theme.code = `GP / ${themeIndex}`;
  theme.projects = theme.projects.map((project) => ({
    ...project,
    index: `${themeIndex}.${String(theme.projects.indexOf(project) + 1).padStart(2, "0")}`,
    themeId: theme.id,
    themeTitle: theme.title,
    accent: theme.accent,
    media: project.groups.flatMap((group) => group.items),
  }));
});

const coverByProject = {
  "yise-esports": "/project-covers/yise-esports.jpg",
  "yise-global-finals": "/project-covers/yise-global-finals.png",
  "yise-ss5": "/project-covers/yise-ss5.jpg",
  "yise-ss4": "/project-covers/yise-ss4.jpg",
  "yise-ss3": "/project-covers/yise-ss3.jpg",
  "yise-ss2": "/project-covers/yise-ss2.png",
  "yise-global-celebration": "/project-covers/yise-global-celebration.png",
  "sausage-tournament-hub": "/project-covers/sausage-tournament-hub.png",
  "xindong-anniversary": "/project-covers/xindong-anniversary.png",
  "xindong-card-maker": "/project-covers/xindong-card-maker.png",
  "xindong-ocean": "/project-covers/xindong-ocean.png",
  "ro-brand-system": "/project-covers/ro-brand-system.png",
  "ro-dungeon-collab": "/project-covers/ro-dungeon-collab.png",
  "ro-chuxin-cbt": "/project-covers/ro-chuxin-cbt.jpg",
};

const getOptimizedCover = (cover) => cover.replace(/\.(png|jpe?g)$/i, ".avif");
const getFallbackCover = (cover) => cover.replace(/\.(png|jpe?g)$/i, "-fallback.jpg");

const sourceThemeById = Object.fromEntries(sourceGameThemes.map((theme) => [theme.id, theme]));

const annotateGroups = (project) => project.groups.map((group, groupIndex) => ({
  ...group,
  id: `${project.id}-${group.id}-${groupIndex}`,
  items: group.items.map((item) => ({
    ...item,
    origin: `${project.title} / ${group.short}`,
    sourceLayout: group.layout,
  })),
}));

const createDirectTheme = ({ id, title, subtitle, description }) => {
  const source = sourceThemeById[id];
  return {
    ...source,
    title,
    subtitle,
    description,
    projects: source.projects.map((project) => ({
      ...project,
      cover: getFallbackCover(coverByProject[project.id]),
      coverOptimized: getOptimizedCover(coverByProject[project.id]),
      groups: annotateGroups(project),
    })),
  };
};

const flattenOtherProject = ({ id, title, cover, sourceThemeIds, type, year = "—", role, summary, tags: tagOverride }) => {
  const sourceProjects = sourceThemeIds.flatMap((themeId) => sourceThemeById[themeId].projects);
  const items = sourceProjects.flatMap((project) => annotateGroups(project).flatMap((group) => group.items));
  const tags = tagOverride || [...new Set(sourceProjects.flatMap((project) => project.tags))];
  return {
    id,
    title,
    cover: getFallbackCover(cover),
    coverOptimized: getOptimizedCover(cover),
    type,
    year,
    role,
    summary,
    tags,
    groups: [detailGroup(
      `${id}-all`,
      "WORKS",
      "设计作品",
      "SELECTED WORKS",
      "网页、活动视觉与跨端设计成果。",
      items,
      "mosaic",
    )],
  };
};

const otherProjects = [
  flattenOtherProject({
    id: "other-torchlight",
    title: "火炬之光",
    cover: "/project-covers/other-torchlight.png",
    sourceThemeIds: ["torchlight"],
    type: "SEASON PREVIEW PAGE",
    year: "SS7",
    role: "赛季页面 / 网页设计",
    summary: "围绕 SS7 赛季主题、版本内容与活动入口展开的跨端前瞻页面。",
    tags: ["Season", "Responsive", "Longform"],
  }),
  flattenOtherProject({
    id: "other-mafen",
    title: "出发吧麦芬",
    cover: "/project-covers/other-mafen.jpg",
    sourceThemeIds: ["mafen"],
    type: "COLLABORATION PAGES",
    year: "COLLAB",
    role: "联动活动 / 网页设计",
    summary: "EVA 与咖波两组联动活动页，以 PC、Mobile 对照呈现跨端视觉适配。",
    tags: ["Collaboration", "Responsive", "Campaign"],
  }),
  flattenOtherProject({
    id: "other-suzuran",
    title: "铃兰",
    cover: "/project-covers/other-suzuran.png",
    sourceThemeIds: ["suzuran"],
    type: "OFFICIAL & FAN SHOWCASE",
    role: "展示页面 / 官网视觉",
    summary: "包含同人作品展示页的跨端设计，以及游戏官网标题视觉方案。",
    tags: ["Showcase", "Typography", "Responsive"],
  }),
  flattenOtherProject({
    id: "other-feise",
    title: "绯色回响",
    cover: "/project-covers/other-feise.png",
    sourceThemeIds: ["feise"],
    type: "OFFICIAL GAME SITE",
    role: "官网设计 / 响应式适配",
    summary: "以世界观、角色、新闻与游戏特色为内容骨架的跨端游戏官网设计。",
    tags: ["Official", "Responsive", "Longform"],
  }),
  flattenOtherProject({
    id: "other-shaoxi",
    title: "少年西游记2",
    cover: "/project-covers/other-shaoxi.png",
    sourceThemeIds: ["shaoxi"],
    type: "CAMPAIGN & CHARACTER VISUAL",
    year: "2024",
    role: "活动页面 / 市场视觉",
    summary: "涵盖公测点评活动页、节气主视觉与东方朋克角色视觉体系。",
    tags: ["Campaign", "Key Visual", "Character"],
  }),
  flattenOtherProject({
    id: "other-shanhai",
    title: "山海镜花",
    cover: "/project-covers/other-shanhai.png",
    sourceThemeIds: ["shanhai"],
    type: "CAMPAIGN VISUAL SERIES",
    role: "市场视觉 / 角色宣发",
    summary: "以节日氛围、东方纹理与角色表现构成的海报、横版与 GRAPH 系列。",
    tags: ["Campaign", "Character", "Graphic"],
  }),
  flattenOtherProject({
    id: "other-misc",
    title: "琐碎",
    cover: "/project-covers/other-misc.png",
    sourceThemeIds: ["hengsao", "misc-games"],
    type: "BRAND & KEY VISUAL",
    role: "品牌页面 / 市场主视觉",
    summary: "包含长线游戏品牌展示，以及海外节日活动与角色召唤主视觉。",
    tags: ["Brand", "Global", "Key Visual"],
  }),
];

export const gameThemes = [
  createDirectTheme({
    id: "yise",
    title: "伊瑟",
    subtitle: "ETHERIA / EVENT & SEASON ARCHIVE",
    description: "电竞赛事、全球总决赛、赛季前瞻与庆典活动页面。",
  }),
  createDirectTheme({
    id: "sausage",
    title: "香肠派对",
    subtitle: "SAUSAGE MAN / TOURNAMENT ARCHIVE",
    description: "赛事中心的功能界面、UI 层级、视觉规范与验证过程。",
  }),
  createDirectTheme({
    id: "xindong",
    title: "心动小镇",
    subtitle: "HEARTOPIA / EVENT EXPERIENCE",
    description: "周年庆互动、名片生成器与海洋公益体验设计。",
  }),
  createDirectTheme({
    id: "ro",
    title: "仙境传说",
    subtitle: "RAGNAROK / BRAND & CAMPAIGN",
    description: "品牌视觉、地下城联动专题与初心服 CBT 跨端页面。",
  }),
  {
    id: "other",
    title: "其他",
    subtitle: "OTHER / SELECTED GAME PROJECTS",
    description: "赛季页面、联动活动、官网设计与市场视觉等精选游戏项目。",
    accent: "#dfff00",
    cover: null,
    projects: otherProjects,
  },
];

gameThemes.forEach((theme, themePosition) => {
  const themeIndex = String(themePosition + 1).padStart(2, "0");
  theme.index = themeIndex;
  theme.code = `GP / ${themeIndex}`;
  theme.projects = theme.projects.map((project, projectPosition) => ({
    ...project,
    index: `${themeIndex}.${String(projectPosition + 1).padStart(2, "0")}`,
    themeId: theme.id,
    themeTitle: theme.title,
    accent: theme.accent,
    media: project.groups.flatMap((group) => group.items),
  }));
});

export const projects = gameThemes.flatMap((theme) => theme.projects);
