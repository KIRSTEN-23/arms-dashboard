const axios = require("axios");

const armsClient = axios.create({
  baseURL: process.env.ARMS_BASE_URL,
  timeout: 20000,
});

const cache = new Map();
const inFlight = new Map();
const MAX_CACHE_ENTRIES = 100;

async function requestArms(endpoint, params = {}) {
  const key = JSON.stringify([endpoint, Object.entries(params).sort(([a], [b]) => a.localeCompare(b))]);
  const cached = cache.get(key);
  if (cached && cached.expires > Date.now()) return cached.data;
  if (inFlight.has(key)) return inFlight.get(key);

  const request = (async () => {
    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        const response = await armsClient.get(endpoint, {
          params: { ...params, api_key: process.env.ARMS_API_KEY },
        });
        // Cache successful USDA responses only; preserve their original shape.
        if (response.data?.status !== "error") {
          cache.delete(key);
          if (cache.size >= MAX_CACHE_ENTRIES) cache.delete(cache.keys().next().value);
          cache.set(key, {
            data: response.data,
            expires: Date.now() + (endpoint === "/surveydata" ? 5 * 60 * 1000 : 60 * 60 * 1000),
          });
        }
        return response.data;
      } catch (error) {
        const status = error.response?.status;
        const temporary = !error.response || [502, 503, 504].includes(status);
        if (attempt === 1 || !temporary) throw error;
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
  })();
  inFlight.set(key, request);
  try {
    return await request;
  } finally {
    inFlight.delete(key);
  }
}

function handleError(error, res, req) {
  // Log the route, never the upstream URL containing the API key.
  console.error(`ARMS API error on ${req.path}:`, {
    code: error.code, status: error.response?.status, message: error.message,
  });

  const timedOut = ["ECONNABORTED", "ETIMEDOUT"].includes(error.code);
  res.status(timedOut ? 504 : error.response?.status || 502).json({
    status: "error",
    message: timedOut ? "USDA is taking too long to respond. Please try again shortly." : "Failed to fetch ARMS API data",
    detail: error.response?.data || error.message,
  });
}

async function getStates(req, res) {
  try {
    const data = await requestArms("/state");
    res.json(data);
  } catch (error) {
    handleError(error, res, req);
  }
}

async function getYears(req, res) {
  try {
    const data = await requestArms("/year");
    res.json(data);
  } catch (error) {
    handleError(error, res, req);
  }
}

async function getFarmTypes(req, res) {
  try {
    const data = await requestArms("/farmtype");
    res.json(data);
  } catch (error) {
    handleError(error, res, req);
  }
}

async function getReports(req, res) {
  try {
    const data = await requestArms("/report");
    res.json(data);
  } catch (error) {
    handleError(error, res, req);
  }
}

async function getVariables(req, res) {
  try {
    const data = await requestArms("/variable", req.query);
    res.json(data);
  } catch (error) {
    handleError(error, res, req);
  }
}

async function getCategories(req, res) {
  try {
    const data = await requestArms("/category", req.query);
    res.json(data);
  } catch (error) {
    handleError(error, res, req);
  }
}

async function getSurveyData(req, res) {
  try {
    const data = await requestArms("/surveydata", req.query);
    res.json(data);
  } catch (error) {
    handleError(error, res, req);
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