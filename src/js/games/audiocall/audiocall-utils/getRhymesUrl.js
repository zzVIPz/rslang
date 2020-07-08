const getRhymesUrl = (oneWord) => {
  const url = 'https://rhymebrain.com/talk?function=getRhymes&lang=ru&maxResults=10&word=';
  return (url + oneWord);
};

export default getRhymesUrl;
