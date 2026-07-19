# Personal Portfolio Project

这是一个从参考研究开始、由真实项目内容驱动的个人作品集网站项目。

## 当前方向

- 定位：视觉 / 创意
- 风格：简约工业科幻 / 几何化 / 高对比
- 内容规模：游戏数量和页面项目数量均可扩展；当前接入 12 个游戏、27 个项目、163 张作品图与 7 张游戏 Logo 封皮
- 当前阶段：v1.2 最新归类、完整素材、个人履历与 Logo 大类封皮已接入，后续可继续增量补充

## 项目结构

- `docs/content-intake.md`：个人资料与项目内容收集模板
- `docs/reference-library.md`：已核验的作品集参考库
- `task_plan.md`：项目阶段与决策
- `findings.md`：研究结论与资源
- `progress.md`：执行与验证记录

网站方向原型已经进入 `src/`。当前以 `/Users/shaoshenze/Desktop/作品展示` 中的真实项目为来源，使用“具体游戏 → 页面项目 → 页面模块”的内容结构，并将关键展示图压缩代理到 `public/projects/`。视觉采用原创的“理性档案 / 几何秩序”系统，并加入局部精密快门、指针光标、卡片倾斜、滚动视差、幽灵字 hover 和案例媒体分层转场。

## 本地运行

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

## 网站代码

- `index.html`：语义结构、系统化导航、几何首屏、关于和联系信息
- `src/projects.js`：项目内容数据；真实项目优先从这里替换
- `src/main.js`：主题筛选、项目矩阵、长图案例弹层和滚动动效
- `src/styles.css`：几何工业设计 tokens、响应式布局、CSS 图形与动效
- `public/favicon.svg`：临时站点图标
- `public/projects/`：由真实项目截图生成的展示代理，原始素材不在仓库内修改
- `public/theme-covers/`：由游戏 Logo 生成的大类封皮代理，背景使用对应品牌主色延展

## 下一步

1. 持续在 `src/projects.js` 中补充新的游戏、页面类型和素材代理。
2. 为每个页面项目补充正式年份、角色、项目说明和上线链接。
3. 完成桌面和移动端视觉验收后进入正式打磨与上线。
