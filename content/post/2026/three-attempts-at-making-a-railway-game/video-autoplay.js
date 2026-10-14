(() => {
  const videos = document.querySelectorAll('video[data-animated-video]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const updatePlayback = () => {
    videos.forEach((video) => {
      video.autoplay = !reducedMotion.matches;
      video.loop = !reducedMotion.matches;

      if (reducedMotion.matches) {
        video.pause();
      } else {
        video.muted = true;
        // Leave the controls usable if the browser blocks autoplay.
        video.play().catch(() => {});
      }
    });
  };

  updatePlayback();
  reducedMotion.addEventListener('change', updatePlayback);
})();
