import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // Allow the backend to complete its bounded upstream retry.
  timeout: 50000,
});

const inFlight = new Map();

const requestData = async (endpoint, params) => {
  try {
    const response = await api.get(endpoint, { params });
    return response.data.data;
  } catch (error) {
    console.error(`[ARMS] ${endpoint} failed`, {
      code: error.code, status: error.response?.status,
    });
    if (error.response?.status === 504) {
      throw new Error("USDA is taking too long to respond. Please try again shortly.", { cause: error });
    }
    if (error.code === "ECONNABORTED") {
      throw new Error("The ARMS data request timed out. Please reload to try again.", { cause: error });
    }
    if (!error.response) {
      throw new Error("Cannot reach the ARMS backend. Check that it is running and the browser address is allowed.", { cause: error });
    }
    throw new Error(`The ARMS API returned HTTP ${error.response.status}. Please reload to try again.`, { cause: error });
  }
};

// StrictMode and simultaneous consumers can request the same data together.
// Share the pending promise; settled requests are removed, including failures.
const fetchData = (endpoint, params = {}) => {
  const key = JSON.stringify([endpoint, Object.entries(params).sort(([a], [b]) => a.localeCompare(b))]);
  if (inFlight.has(key)) return inFlight.get(key);
  const request = requestData(endpoint, params).finally(() => inFlight.delete(key));
  inFlight.set(key, request);
  return request;
};

export const getStates = () => fetchData("/arms/states");
export const getYears = () => fetchData("/arms/years");
export const getFarmTypes = () => fetchData("/arms/farm-types");
export const getReports = () => fetchData("/arms/reports");
export const getVariables = (params = {}) => fetchData("/arms/variables", params);
export const getCategories = (params = {}) => fetchData("/arms/categories", params);
export const getSurveyData = (params = {}) => fetchData("/arms/surveydata", params);
