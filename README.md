# Intelligent Transcription

Upload handwriting images → OCR recognition → Voice dictation

## 项目结构

```
├── index.html              # 原始 HTML 版本（当前默认访问）
├── html-version/           # HTML 版本备份
│   └── index.html
├── react-app/              # React 版本
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileUpload.tsx
│   │   │   ├── ThumbnailGrid.tsx
│   │   │   ├── ResultList.tsx
│   │   │   ├── Player.tsx
│   │   │   └── StatusMessage.tsx
│   │   ├── lib/
│   │   │   ├── ocr.ts
│   │   │   ├── tts.ts
│   │   │   └── utils.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 版本说明

### HTML 版本（推荐快速部署）

**优点**：
- 单文件，部署简单
- 加载快，无构建过程
- 适合静态托管（GitHub Pages、Netlify）

**运行**：
```bash
# 直接用浏览器打开
open index.html

# 或使用本地服务器
npx serve .
```

### React 版本（推荐扩展开发）

**优点**：
- 组件化，代码结构清晰
- 状态管理规范（useState）
- 热更新，开发体验好
- 易于扩展新功能
- TypeScript 支持

**运行**：
```bash
cd react-app
npm install
npm run dev
```

**构建生产版本**：
```bash
cd react-app
npm run build
```

## 功能特性

- 📁 **多图片上传**：支持拖拽和点击上传
- 🔍 **OCR 识别**：自动检测中英文，使用 OCR.space API
- 🎯 **结果编辑**：识别结果可编辑、删除、添加
- 🔊 **语音播报**：使用 Google TTS API，支持中英文
- ⏱️ **间隔控制**：5s-25s 可调
- 🔁 **循环播报**：1x-5x 可调
- 🎨 **精美动画**：文件夹 3D 打开动画

## 技术栈

### HTML 版本
- 纯 HTML/CSS/JavaScript
- 无依赖，单文件

### React 版本
- React 18 + TypeScript
- Vite（构建工具）
- Tailwind CSS
- shadcn/ui 样式规范

## GitHub Pages 部署

当前仓库已配置 GitHub Actions 自动部署。

**HTML 版本**：访问 `https://your-username.github.io/dictation-tool/`

**React 版本**：
1. 构建生产版本：`cd react-app && npm run build`
2. 将 `dist/` 目录内容部署到任意静态托管服务

## 开发计划

- [ ] 历史记录功能
- [ ] 导出文本/音频
- [ ] 更多 TTS 语音选择
- [ ] 离线 OCR 支持
- [ ] 批量图片处理优化

## License

MIT
