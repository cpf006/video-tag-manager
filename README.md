# video-tag-display

## Overview
The Video Tag Manager is a lightweight tool designed to manage closed captioning for videos. By using timestamped tags, it allows for precise synchronization of captions with video playback.

Captions are represented as JSON objects, containing words, their start times, and end times.
Example input:
```
{
  "metadata": {
    "asr_word": [
      { "start": 0, "end": 0.24, "word": "and" },
      { "start": 0.28, "end": 0.3, "word": "in" },
      { "start": 0.48, "end": 0.62, "word": "terms" },
      { "start": 0.72, "end": 0.82, "word": "of" }
    ]
  }
}
```

The system reads the JSON input and associates each word with the corresponding video timestamp.
the video and captions are stored and managed within the /src/assets/ folder of the project.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Screenshot
![Alt text](/example.png?raw=true "Title")

