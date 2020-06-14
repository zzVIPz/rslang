export default function checkPassword(value) {
  // eslint-disable-next-line no-useless-escape
  const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*\-+_\.\,\:\;\{\}\[\]]).{8,}$/;
  return pattern.test(value);
}
