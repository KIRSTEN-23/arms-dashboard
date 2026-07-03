import { useEffect, useState } from "react";
import { getSurveyData } from "../api/armsApi";
import {
  normaliseSurveyData,
  getTotalRecord,
} from "../utils/normaliseSurveyData";
import {
  FARM_BUSINESS_METRICS,
  OVERVIEW_METRICS,
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
    async function fetchDashboardData() {
      try {
        setLoading(true);
        setError("");

        const overviewMetricObjects = OVERVIEW_METRICS
          .map((metricId) =>
            FARM_BUSINESS_METRICS.find((metric) => metric.id === metricId)
          )
          .filter(Boolean);

        const responses = await Promise.all(
          overviewMetricObjects.map((metric) =>
            getSurveyData({
              year: filters.year,
              state: filters.state,
              variable: metric.id,
            })
          )
        );

        const metricResults = overviewMetricObjects.map((metric, index) => {
          const normalised = normaliseSurveyData(responses[index]);
          const total = getTotalRecord(normalised);

          return {
            ...metric,
            estimate: total?.estimate,
            formattedValue: formatMetricValue(total?.estimate, metric.unitType),
          };
        });

        const getMetricById = (id) =>
          metricResults.find((metric) => metric.id === id);

        setSummaryMetrics([
          {
            id: "igcfi",
            label: "Gross cash farm income",
            value: getMetricById("igcfi")?.formattedValue || "N/A",
            helper: "Income statement",
          },
          {
            id: "etot",
            label: "Total cash expenses",
            value: getMetricById("etot")?.formattedValue || "N/A",
            helper: "Income statement",
          },
          {
            id: "infi",
            label: "Net farm income",
            value: getMetricById("infi")?.formattedValue || "N/A",
            helper: "Income statement",
          },
          {
            id: "atot",
            label: "Farm assets",
            value: getMetricById("atot")?.formattedValue || "N/A",
            helper: "Balance sheet",
          },
        ]);

        setIncomeItems([
          {
            id: "revenue",
            label: "Revenue",
            value: getMetricById("igcfi")?.formattedValue || "N/A",
            note: "Gross cash farm income",
          },
          {
            id: "expenses",
            label: "Expenses",
            value: getMetricById("etot")?.formattedValue || "N/A",
            note: "Total cash expenses",
          },
          {
            id: "net-income",
            label: "Net income",
            value: getMetricById("infi")?.formattedValue || "N/A",
            note: "Net farm income",
          },
        ]);

        setBalanceItems([
          {
            id: "assets",
            label: "Assets",
            value: getMetricById("atot")?.formattedValue || "N/A",
            note: "Total farm assets",
          },
          {
            id: "liabilities",
            label: "Liabilities",
            value: getMetricById("dtot")?.formattedValue || "N/A",
            note: "Farm liabilities",
          },
          {
            id: "equity",
            label: "Equity",
            value: getMetricById("netw")?.formattedValue || "N/A",
            note: "Farm equity",
          },
        ]);

        setHealthItems([
          {
            id: "frdanum",
            label: "Debt-to-Asset Ratio",
            value: getMetricById("frdanum")?.formattedValue || "N/A",
            helper: "Financial risk",
          },
          {
            id: "frwcnum",
            label: "Working Capital-to-Expense Ratio",
            value: getMetricById("frwcnum")?.formattedValue || "N/A",
            helper: "Financial resilience",
          },
          {
            id: "frcrnum",
            label: "Current Ratio",
            value: getMetricById("frcrnum")?.formattedValue || "N/A",
            helper: "Liquidity",
          },
        ]);
      } catch (err) {
        console.error(err);
        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [filters]);

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