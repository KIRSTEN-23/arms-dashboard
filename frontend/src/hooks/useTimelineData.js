import { useEffect, useState } from "react";
import { getSurveyData } from "../api/armsApi";
import { normaliseSurveyData, getTotalRecord } from "../utils/normaliseSurveyData";
import { toTimelineLineChartData } from "../utils/chartTransformers";

const DEFAULT_FILTERS = {
  startYear: 1996,
  endYear: 2024,
  state: "all",
  variable: "igcfi",
  metricLabel: "Gross Cash Farm Income",
};

function formatCurrency(value) {
  if (!Number.isFinite(value)) return "N/A";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function useTimelineData() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const [chartData, setChartData] = useState(null);
  const [summary, setSummary] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTimelineData() {
      try {
        setLoading(true);
        setError("");

        const years = Array.from(
          { length: filters.endYear - filters.startYear + 1 },
          (_, index) => filters.startYear + index
        ).join(",");

        const response = await getSurveyData({
          year: years,
          state: filters.state,
          variable: filters.variable,
        });

        const normalised = normaliseSurveyData(response)
          .map((record) => getTotalRecord([record]) || record)
          .filter((record) => record.categoryValue === "TOTAL");

        setChartData(
          toTimelineLineChartData(normalised, filters.metricLabel)
        );

        const values = normalised
          .map((item) => item.estimate)
          .filter((value) => Number.isFinite(value));

        if (!values.length) {
          setSummary([]);
          return;
        }

        const highest = Math.max(...values);
        const lowest = Math.min(...values);
        const average =
          values.reduce((sum, value) => sum + value, 0) / values.length;

        const first = normalised[0]?.estimate;
        const last = normalised[normalised.length - 1]?.estimate;

        const change =
          Number.isFinite(first) && first !== 0 && Number.isFinite(last)
            ? ((last - first) / first) * 100
            : null;

        setSummary([
          {
            id: "highest",
            label: "Highest Value",
            value: formatCurrency(highest),
            helper: "Peak year in selected range",
          },
          {
            id: "lowest",
            label: "Lowest Value",
            value: formatCurrency(lowest),
            helper: "Lowest year in selected range",
          },
          {
            id: "average",
            label: "Average",
            value: formatCurrency(average),
            helper: "Mean across selected years",
          },
          {
            id: "change",
            label: "Overall Change",
            value: change === null ? "N/A" : `${Math.round(change)}%`,
            helper: "Start year to end year",
          },
        ]);
      } catch (err) {
        console.error(err);
        setError("Unable to load timeline data.");
      } finally {
        setLoading(false);
      }
    }

    fetchTimelineData();
  }, [filters]);

  return {
    filters,
    setFilters,
    chartData,
    summary,
    loading,
    error,
  };
}

export default useTimelineData;