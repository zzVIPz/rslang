export default function getFormattedString(string, mode) {
  const matchResult = string.match(/<[b,i]>(.*)<\/[b,i]>/);
  let { length } = string;
  if (matchResult) {
    length = matchResult[1].length;
  }
  let formattedString = `<input class="card__input-text" type="text"
                            size="${length - 1}" maxlength="${length}">`;
  formattedString = matchResult ? string.replace(matchResult[0], formattedString) : formattedString;
  return `<div class="card__input-container ${mode ? '' : 'hidden'}">${formattedString}</div>`;
}
