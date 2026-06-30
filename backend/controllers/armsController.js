const axios = require("axios");

const armsClient = axios.create({
  baseURL: process.env.ARMS_BASE_URL,
  timeout: 15000,
});

async function requestArms(endpoint, params = {}) {
  const response = await armsClient.get(endpoint, {
    params: {
      api_key: process.env.ARMS_API_KEY,
      ...params,
    },
  });

  return response.data;
}

function handleError(error, res) {
  console.error("ARMS API error:", error.response?.data || error.message);

  res.status(error.response?.status || 500).json({
    status: "error",
    message: "Failed to fetch ARMS API data",
    detail: error.response?.data || error.message,
  });
}

async function getStates(req, res) {
  try {
    const data = await requestArms("/state");
    res.json(data);
  } catch (error) {
    handleError(error, res);
  }
}

async function getYears(req, res) {
  try {
    const data = await requestArms("/year");
    res.json(data);
  } catch (error) {
    handleError(error, res);
  }
}

async function getFarmTypes(req, res) {
  try {
    const data = await requestArms("/farmtype");
    res.json(data);
  } catch (error) {
    handleError(error, res);
  }
}

async function getReports(req, res) {
  try {
    const data = await requestArms("/report");
    res.json(data);
  } catch (error) {
    handleError(error, res);
  }
}

async function getVariables(req, res) {
  try {
    const data = await requestArms("/variable", req.query);
    res.json(data);
  } catch (error) {
    handleError(error, res);
  }
}

async function getCategories(req, res) {
  try {
    const data = await requestArms("/category", req.query);
    res.json(data);
  } catch (error) {
    handleError(error, res);
  }
}

async function getSurveyData(req, res) {
  try {
    const data = await requestArms("/surveydata", req.query);
    res.json(data);
  } catch (error) {
    handleError(error, res);
  }
}

module.exports = {
  getStates,
  getYears,
  getFarmTypes,
  getReports,
  getVariables,
  getCategories,
  getSurveyData,
};