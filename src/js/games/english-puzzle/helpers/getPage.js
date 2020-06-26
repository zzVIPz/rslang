export default function getPage(level) {
  const page = Math.round(level / 2);
  return page - 1;
}
