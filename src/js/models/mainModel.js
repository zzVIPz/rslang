export default class MainModel {
  // eslint-disable-next-line class-methods-use-this
  getMedia(key) {
    return `https://raw.githubusercontent.com/zzvipz/rslang-data/master/${key}`;
  }
}
