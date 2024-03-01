export const url = 'https://api.donnacalzados.com:3001';

export const getRequest = async endpoint => {
  try {
    const res = await fetch(url + endpoint);
    const data = res.json();
    return data;
  } catch (error) {
    return 'An unexpected error occurred';
  }
};
