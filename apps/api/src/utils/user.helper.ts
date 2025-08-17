export const getAge = (user: { birthday: Date }): number => {
  const age = new Date().getFullYear() - user.birthday.getFullYear();
  if (new Date().getMonth() < user.birthday.getMonth()) {
    return age - 1;
  }
  if (new Date().getMonth() === user.birthday.getMonth() && new Date().getDate() < user.birthday.getDate()) {
    return age - 1;
  }
  return age;
};

export const getAgeDecade = (user: { birthday: Date }): number => {
  return Math.floor(getAge(user) / 10) * 10;
};
