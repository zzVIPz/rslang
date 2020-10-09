export default function checkPassword(value) {
  // eslint-disable-next-line no-useless-escape
  const pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[+\-_@$!%*?&#.,;:\[\]{}])[0-9a-zA-Z+\-_@$!%*?&#.,;:\[\]{}]{8,}$/g;
  return pattern.test(value);
}
