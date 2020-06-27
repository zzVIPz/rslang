export default function getFormattedString(string, mode, textTranslate) {
  const matchResult = string.match(/<[b,i]>(.*)<\/[b,i]>/);
  const dataAttribute = matchResult ? matchResult[1] : string;
  const { length } = dataAttribute;

  let formattedString = `<input class="card__input-text" type="text" size="${length - 1}"
                          maxlength="${length}" data-word="${dataAttribute}">`;
  formattedString = matchResult ? string.replace(matchResult[0], formattedString) : formattedString;
  return `
    <div class="card__input-container ${mode ? '' : 'hidden'}">
      ${formattedString}
      ${textTranslate}
    </div>`;
}
