import { useEffect, useState } from "react";
import { getSurveyData } from "../api/armsApi";
import { normaliseSurveyData, getTotalRecord } from "../utils/normaliseSurveyData";
import { toTimelineLineChartData } from "../utils/chartTransformers";

import { DEFAULT_TIMELINE_FILTERS } from "../data/farmBusinessMetrics";
import { formatMetricValue } from "../utils/formatMetricValue";

function useTimelineData(availableYears, metadataLoading) {
  const [filters, setFilters] = useState(() => ({ ...DEFAULT_TIMELINE_FILTERS }));

  const [chartData, setChartData] = useState(null);
  const [summary, setSummary] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  if (!metadataLoading && availableYears.length) {
    const oldest = Math.min(...availableYears);
    const newest = Math.max(...availableYears);
    if (!availableYears.includes(filters.startYear) || !availableYears.includes(filters.endYear)) {
      setFilters((current) => ({ ...current, startYear: oldest, endYear: newest }));
    }
  }

  useEffect(() => {
    let active = true;
    if (metadataLoading || !availableYears.length) return;
    async function fetchTimelineData() {
      try {
        setLoading(true);
        setError("");

        const years = availableYears
          .filter((year) => year >= filters.startYear && year <= filters.endYear)
          .sort((a, b) => a - b).join(",");

        const response = await getSurveyData({
          year: years,
          state: filters.state,
          variable: filters.variable,
        });

        if (!active) return;

        const records = normaliseSurveyData(response);
        const normalised = [...new Set(records.map((record) => record.year))]
          .map((year) => getTotalRecord(records.filter((record) => record.year === year)))
          .filter(Boolean)
          .sort((a, b) => a.year - b.year);

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
            value: formatMetricValue(highest, filters.unitType),
            helper: "Peak year in selected range",
          },
          {
            id: "lowest",
            label: "Lowest Value",
            value: formatMetricValue(lowest, filters.unitType),
            helper: "Lowest year in selected range",
          },
          {
            id: "average",
            label: "Average",
            value: formatMetricValue(average, filters.unitType),
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
        if (!active) return;
        console.error(err);
        setError(err.message || "Unable to load timeline data.");
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchTimelineData();
    return () => { active = false; };
  }, [availableYears, metadataLoading, filters.startYear, filters.endYear, filters.state, filters.variable, filters.metricLabel, filters.unitType]);

  return {
    filters,
    setFilters,
    chartData,
    summary,
    loading: metadataLoading || (availableYears.length > 0 && loading),
    error,
  };
}

export default useTimelineData;
