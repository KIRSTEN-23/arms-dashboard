const express = require("express");
const {
  getStates,
  getYears,
  getFarmTypes,
  getReports,
  getVariables,
  getCategories,
  getSurveyData,
} = require("../controllers/armsController");

const router = express.Router();

router.get("/states", getStates);
router.get("/years", getYears);
router.get("/farm-types", getFarmTypes);
router.get("/reports", getReports);
router.get("/variables", getVariables);
router.get("/categories", getCategories);
router.get("/surveydata", getSurveyData);

module.exports = router;