export default function getFormattedString(string = '', mode, textTranslate, wordTranslate) {
  const matchResult = string.match(/<[b,i]>(.*)<\/[b,i]>/);
  const dataAttribute = matchResult ? matchResult[1] : string;
  const { length } = dataAttribute;

  let formattedString = `
  <div class="card__input-wrapper">
    <input class="card__input-text" type="text" size="${length - 1}"
      maxlength="${length}" data-word="${dataAttribute}">
  </div>`;
  formattedString = matchResult ? string.replace(matchResult[0], formattedString) : formattedString;
  return `
    <div class="card__input-container ${mode ? '' : 'hidden'}">
      ${wordTranslate || ''}
      ${formattedString}
      ${textTranslate}
    </div>`;
}
