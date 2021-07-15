export const getItem = key => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    console.error(`Error from getting data from localStorage ${e}`);
    return null;
  }
};

export const setItem = (key, item) => {
  try {
    localStorage.setItem(key, JSON.stringify(item));
  } catch (e) {
    console.error('Error occurred when tried setting data to localStorage', e);
  }
};
