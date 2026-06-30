import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
});

export async function getStates() {
  const response = await api.get("/arms/states");
  return response.data.data;
}

export async function getYears() {
  const response = await api.get("/arms/years");
  return response.data.data;
}

export async function getFarmTypes() {
  const response = await api.get("/arms/farm-types");
  return response.data.data;
}

export async function getReports() {
  const response = await api.get("/arms/reports");
  return response.data.data;
}

export async function getVariables(params = {}) {
  const response = await api.get("/arms/variables", { params });
  return response.data.data;
}

export async function getCategories(params = {}) {
  const response = await api.get("/arms/categories", { params });
  return response.data.data;
}