const randomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const randomIntegerForPages = (max) => randomInteger(0, max - 1);
export default randomIntegerForPages;
