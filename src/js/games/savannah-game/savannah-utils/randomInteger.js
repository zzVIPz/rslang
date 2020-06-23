const randomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const randomIntegerForPages = () => randomInteger(0, 4);
export default randomIntegerForPages;
