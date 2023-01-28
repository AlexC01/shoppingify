const rand = () => {
  return Math.random().toString(36).substring(2);
};

const getToken = () => {
  return rand() + rand();
};

export default getToken;
