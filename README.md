# Dictation Tool

A clean and efficient dictation practice tool with handwriting image OCR recognition and voice playback.

## Features

- 📷 **Multiple Image Upload**: Drag and drop multiple handwriting images
- 🔍 **OCR Recognition**: Auto-detect Chinese/English handwriting with intelligent language detection
- ✏️ **Result Editing**: Manually edit, add, or delete recognition results
- 🔊 **Voice Playback**: Browser TTS with automatic Chinese/English switching
- 🔄 **Loop Playback**: Support 1-5x loop playback
- ⏱️ **Interval Setting**: Adjustable 5-25 seconds playback interval
- 🎯 **Single Playback**: Click speaker icon to play individual items

## Usage

1. Upload handwriting images (JPG/PNG supported)
2. Wait for automatic OCR recognition
3. Review and edit recognition results
4. Set playback interval and loop count
5. Click "Start Dictation" to begin practice

## Tech Stack

- **Frontend**: Native HTML/CSS/JavaScript
- **OCR**: OCR.space API (Engine 2 high precision)
- **TTS**: Browser built-in speech synthesis + Google Translate TTS
- **Design**: shadcn dark theme style

## Run Locally

Simply open `index.html` in your browser.

```bash
# Clone repository
git clone https://github.com/tangyanyan/dictation-tool.git

# Open file
open index.html
```

## Online Demo

Visit: https://tangyanyan.github.io/dictation-tool/

## Notes

- OCR.space API Key is for personal use, recommend replacing with your own key
- Some browsers may require allowing auto-play audio
- Best experience with Chrome, Edge, or Safari

## License

MIT License
