import { useEffect, useState } from "react";
import { getSurveyData } from "../api/armsApi";
import {
  normaliseSurveyData,
  getTotalRecord,
} from "../utils/normaliseSurveyData";
import {
  FARM_BUSINESS_METRICS,
  FARM_BUSINESS_REPORTS,
  PAGE_KEYS,
  REPORT_KEYS,
} from "../data/farmBusinessMetrics";
import { formatMetricValue } from "../utils/formatMetricValue";

const DEFAULT_YEAR = 2024;

function useDashboardData() {
  const [filters, setFilters] = useState({
    year: DEFAULT_YEAR,
    state: "all",
  });

  const [summaryMetrics, setSummaryMetrics] = useState([]);
  const [incomeItems, setIncomeItems] = useState([]);
  const [balanceItems, setBalanceItems] = useState([]);
  const [healthItems, setHealthItems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function fetchDashboardData() {
      try {
        setLoading(true);
        setError("");

        const overviewMetricObjects = FARM_BUSINESS_METRICS.filter(
          (metric) => metric.pages.includes(PAGE_KEYS.OVERVIEW)
        );

        const responses = await Promise.all(
          overviewMetricObjects.map((metric) =>
            getSurveyData({
              year: filters.year,
              state: filters.state,
              variable: metric.id,
            })
          )
        );

        if (!active) return;

        const metricResults = overviewMetricObjects.map((metric, index) => {
          const normalised = normaliseSurveyData(responses[index]);
          const total = getTotalRecord(normalised);

          return {
            ...metric,
            estimate: total?.estimate,
            formattedValue: formatMetricValue(total?.estimate, metric.unitType),
          };
        });

        setSummaryMetrics(metricResults
          .filter((metric) => ["summary", "both"].includes(metric.overviewRole))
          .map((metric) => ({
            id: metric.id,
            label: metric.label,
            value: metric.formattedValue,
            helper: FARM_BUSINESS_REPORTS.find((report) => report.key === metric.reportKey)?.label,
          })));

        const breakdownFor = (reportKey) => metricResults
          .filter((metric) => metric.reportKey === reportKey &&
            ["breakdown", "both"].includes(metric.overviewRole))
          .map((metric) => ({
            id: metric.id,
            label: metric.overviewLabel || metric.label,
            value: metric.formattedValue,
            unitLabel: metric.unitLabel,
          }));

        setIncomeItems(breakdownFor(REPORT_KEYS.INCOME_STATEMENT));
        setBalanceItems(breakdownFor(REPORT_KEYS.BALANCE_SHEET));
        setHealthItems(breakdownFor(REPORT_KEYS.FINANCIAL_RATIOS));
      } catch (err) {
        if (!active) return;
        console.error(err);
        setError(err.message || "Unable to load dashboard data.");
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchDashboardData();
    return () => { active = false; };
  }, [filters.year, filters.state]);

  return {
    filters,
    setFilters,
    summaryMetrics,
    incomeItems,
    balanceItems,
    healthItems,
    loading,
    error,
  };
}

export default useDashboardData;
