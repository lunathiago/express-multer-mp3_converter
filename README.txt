MP4 to MP3 Converter API

A simple Node.js API that allows users to:

Upload an MP4 file and convert it to MP3.

Provide a YouTube link, download the video, convert it to MP3, and send it back.

Endpoints:

Upload MP4 and convert to MP3: POST /upload/file (Form data: file)

Convert YouTube video to MP3: POST /upload/youtube (JSON: { "youtube_link": "URL" })

Installation:

Clone: git clone https://github.com/U82146510/mp4-to-mp3-api.git

Install: npm install

Start: node index.ts

Requirements:

Node.js (v16+)

FFmpeg

@distube/ytdl-core

License: MIT

Author: U82146510
