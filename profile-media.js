(() => {
  const media = document.querySelector(".profile-media");
  const frame = media.querySelector(".profile-frame");
  const poster = media.querySelector(".profile-poster");
  const kind = media.dataset.kind;
  const source = media.dataset.motionSrc?.trim();

  const width = Number(poster.getAttribute("width"));
  const height = Number(poster.getAttribute("height"));
  if (width > 0 && height > 0) {
    const ratio = Math.min(16 / 9, Math.max(3 / 4, width / height));
    media.style.setProperty("--profile-ratio", ratio);
  }

  if ((kind !== "live" && kind !== "video") || !source) return;

  let activeVideo = null;

  function restorePoster(video) {
    if (activeVideo !== video) return;

    activeVideo = null;
    delete media.dataset.playing;
    video.pause();
    video.removeAttribute("src");
    video.load();
    video.remove();
  }

  frame.addEventListener("pointerenter", async (event) => {
    if (event.pointerType !== "mouse" || activeVideo) return;

    const video = document.createElement("video");
    video.className = "profile-video";
    video.playsInline = true;
    video.disablePictureInPicture = true;
    video.disableRemotePlayback = true;
    video.defaultMuted = true;

    function keepSilent() {
      if (!video.muted) video.muted = true;
      if (video.volume !== 0) video.volume = 0;
    }

    keepSilent();
    video.addEventListener("volumechange", keepSilent);
    video.tabIndex = -1;
    video.setAttribute("aria-hidden", "true");
    activeVideo = video;

    video.addEventListener("ended", () => restorePoster(video));
    video.addEventListener("error", () => restorePoster(video));
    frame.append(video);
    video.src = source;

    try {
      await video.play();
    } catch {
      restorePoster(video);
      return;
    }
    if (activeVideo === video) media.dataset.playing = "";
  });
})();
