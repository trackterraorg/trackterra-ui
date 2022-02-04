const SITE_URL = process.env.REACT_APP_API_URL;
const API_BASE_URL = `${SITE_URL}/api/v1`;
console.log(`the url is ${SITE_URL}`);
export const apiOptions = (options) => {
  const apiOptions = {
    baseURL: API_BASE_URL
  };
  Object.assign(apiOptions, options);
  return apiOptions;
};

export const getCsvFileUrl = (address, csvFile) => `${API_BASE_URL}/csv/txs/${address}/${csvFile}`;
