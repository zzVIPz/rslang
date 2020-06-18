const getDifficultyLevelId = (el) => {
  const getIdRegExp = /\d/;
  return (el.id).match(getIdRegExp)[0];
};

export default getDifficultyLevelId;
