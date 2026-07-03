import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
});

const fetchData = async (endpoint, params = {}) => {
  const response = await api.get(endpoint, { params });
  return response.data.data;
};

export const getStates = () => fetchData("/arms/states");
export const getYears = () => fetchData("/arms/years");
export const getFarmTypes = () => fetchData("/arms/farm-types");
export const getReports = () => fetchData("/arms/reports");
export const getVariables = (params = {}) => fetchData("/arms/variables", params);
export const getCategories = (params = {}) => fetchData("/arms/categories", params);
export const getSurveyData = (params = {}) => fetchData("/arms/surveydata", params);