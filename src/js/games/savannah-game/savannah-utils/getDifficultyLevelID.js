const getDifficultyLevelRoundId = (el) => {
  const getIdRegExp = /\d/;
  return Number((el.id).match(getIdRegExp)[0]);
};

export default getDifficultyLevelRoundId;
