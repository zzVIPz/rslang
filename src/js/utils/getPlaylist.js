export default function getPlaylist(settings, currentSlide) {
  const nodes = currentSlide.querySelectorAll('.card__input-container');
  const audioNodes = currentSlide.querySelectorAll('.audio');
  const playlist = settings.wordPronunciation ? [audioNodes[0]] : [];

  nodes.forEach((node, i) => {
    if (!node.classList.contains('hidden') && i && settings.textPronunciation) {
      playlist.push(audioNodes[i]);
    }
  });

  if (!playlist.length && settings.textPronunciation) {
    playlist.push(audioNodes[0]);
  }

  return playlist;
}
