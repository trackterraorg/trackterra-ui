export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const API_BASE_URL = process.env.REACT_APP_API_URL;
export const API_URL = `${API_BASE_URL}/api/v1`;
console.log(`Fetching data from  ${API_BASE_URL}`);

if (!API_BASE_URL) {
  alert('Please set the api url by creating a .env file and setting REACT_APP_API_URL variable');
}

export const apiOptions = (options) => {
  const apiOptions = {
    baseURL: API_URL
  };
  Object.assign(apiOptions, options);
  return apiOptions;
};

export const getCsvFileUrl = (address, csvFile) =>
  `${API_URL}/txs/csv?address=${address}&filename=${csvFile}`;
