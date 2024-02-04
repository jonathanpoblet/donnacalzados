const URL = 'http://localhost:3000';

export const getRequest = async endpoint => {
  try {
    const res = await fetch(URL + endpoint);
    const data = res.json();
    return data;
  } catch (error) {
    console.log('unexpected error: ', error);
    return 'An unexpected error occurred';
  }
};
