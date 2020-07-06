import CONSTANTS from '../constants/constants';

export default function getPage(level) {
  const page = Math.round(level / 2);
  return page - CONSTANTS.INDEX_OFFSET;
}
