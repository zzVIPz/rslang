export default function getWordBoxTemplate(audioUrl, word, translation) {
  return `
    <div class="soundBox">
      <img class="word-audio" src="../src/assets/images/audio.png" data-url="${audioUrl}">
    </div>
    <div class="word-eng">${word}</div>
    <div class="word-trans">— ${translation}</div>
    `;
}
