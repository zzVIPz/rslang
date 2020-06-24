export default function getRequestBody(userData) {
  return {
    wordsPerDay: userData.cardsTotal,
    optional: {
      user: JSON.stringify(userData),
    },
  };
}
