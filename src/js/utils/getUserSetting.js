export default function getUserSetting(userData) {
  return {
    wordsPerDay: userData.cardsTotal,
    optional: {
      user: JSON.stringify(userData),
    },
  };
}
