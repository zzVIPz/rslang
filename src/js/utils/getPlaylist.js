export default function getPlaylist(settings, audio) {
  const playlist = [];
  if (settings.wordPronunciation) playlist.push(audio[0]);
  if (settings.meaningPronunciation) playlist.push(audio[1]);
  if (settings.examplePronunciation) playlist.push(audio[2]);
  return playlist;
}
