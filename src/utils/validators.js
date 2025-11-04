export const isGoodPassword = (value) => {
  //basicamente entre 6 y 12 caracteres, 1 min, 1 mayu , 1 number
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@.,!%&*?]{6,12}$/;
  return regex.test(value);
};
