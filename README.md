Click [here](https://xiaogou1234.github.io/) to visit my homepage.

## Profile media

Place your files in `picture/` and update the `.profile-media` figure in `index.html`.

| `data-kind` | Image in `<img>` | `data-motion-src` |
| --- | --- | --- |
| `photo` | Photo | Empty |
| `live` | Still frame from the Live Photo | Path to the short MP4 |
| `video` | Video poster | Path to the MP4 |

Set the image's `src`, `alt`, `width`, and `height` using the actual image file and its pixel dimensions. Use a web-ready image such as JPEG or WebP and H.264 video in an MP4 container. For moving media, use a poster with the same aspect ratio as the clip to keep the framing consistent during playback.

Live Photos and videos show the still image until a mouse enters the frame. The clip plays once, silently, then returns to the still image. Move the mouse out and back in after playback to replay it. Touch devices display the still image.

The homepage uses the custom cover `picture/profile-poster.jpg` and the audio-free web copy `picture/profile-motion.mp4`. To remove the audio track from another MP4, run `ffmpeg -i input.mp4 -map 0:v:0 -c:v copy -an -movflags +faststart output.mp4`.
