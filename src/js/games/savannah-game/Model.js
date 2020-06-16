class Model {
  constructor() {
    this.difficultyLevel = {
      level: 0,
    };
  }

  addLevel(amountOfStars) {
    this.difficultyLevel.level = 0 + amountOfStars;
    return this.difficultyLevel.level;
  }
}

export default Model;
