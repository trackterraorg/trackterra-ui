const SITE_URL = 'http://localhost:4000';
const API_BASE_URL = `${SITE_URL}/api/v1`;

export const apiOptions = (options) => {
  const apiOptions = {
    baseURL: API_BASE_URL
  };
  Object.assign(apiOptions, options);
  return apiOptions;
};

export const getCsvFileUrl = (address, csvFile) => `${API_BASE_URL}/csv/txs/${address}/${csvFile}`;
