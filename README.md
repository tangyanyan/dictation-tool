# 自动听写工具

一个简洁高效的听写练习工具，支持手写图片 OCR 识别和语音播报。

## 功能特性

- 📷 **多图上传**：支持拖拽上传多张手写图片
- 🔍 **OCR 识别**：自动识别中英文手写内容，智能语言检测
- ✏️ **结果编辑**：可手动编辑、添加、删除识别结果
- 🔊 **语音播报**：使用浏览器 TTS，支持中英文自动切换
- 🔄 **循环播放**：支持 1-5 次循环播放
- ⏱️ **间隔设置**：5-25 秒可调播放间隔
- 🎯 **单独播放**：点击喇叭图标单独播放某条内容

## 使用方法

1. 上传手写图片（支持 JPG/PNG）
2. 等待 OCR 自动识别
3. 检查并编辑识别结果
4. 设置播放间隔和循环次数
5. 点击"开始听写"开始练习

## 技术栈

- **前端**：原生 HTML/CSS/JavaScript
- **OCR**：OCR.space API (Engine 2 高精度)
- **TTS**：浏览器内置语音合成 + Google Translate TTS
- **设计**：shadcn 深色主题风格

## 本地运行

直接在浏览器中打开 `dictation-tool.html` 文件即可使用。

```bash
# 克隆仓库
git clone https://github.com/yourusername/dictation-tool.git

# 打开文件
open dictation-tool.html
```

## 注意事项

- OCR.space API Key 为个人使用，建议替换为自己的 Key
- 部分浏览器可能需要允许音频自动播放
- 建议使用 Chrome、Edge 或 Safari 以获得最佳体验

## 许可证

MIT License
