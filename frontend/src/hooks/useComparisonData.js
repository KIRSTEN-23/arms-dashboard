import { useEffect, useState } from "react";
import { getSurveyData } from "../api/armsApi";
import { normaliseSurveyData } from "../utils/normaliseSurveyData";

import {
  toComparisonBarChartData,
  toComparisonRadarChartData,
  toComparisonDoughnutChartData,
} from "../utils/chartTransformers";

const DEFAULT_FILTERS = {
  year: 2024,
  state: "all",
  variable: "igcfi",
  metricLabel: "Gross Cash Farm Income",
  category: "Production Specialty",
};

function useComparisonData() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const [chartData, setChartData] = useState(null);
  const [tableData, setTableData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function dedupeByCategoryValue(records = []) {
    const seen = new Map();

    records.forEach((record) => {
      if (!seen.has(record.categoryValue)) {
        seen.set(record.categoryValue, record);
      }
    });

    return Array.from(seen.values());
  }

  useEffect(() => {
    async function fetchComparisonData() {
      try {
        setLoading(true);
        setError("");

        const response = await getSurveyData({
          year: filters.year,
          state: filters.state,
          variable: filters.variable,
          category: filters.category,
        });

        const normalised = normaliseSurveyData(response);

        const filtered = normalised.filter(
          (item) =>
            item.category === filters.category &&
            item.categoryValue !== "TOTAL",
        );

        const uniqueRecords = dedupeByCategoryValue(filtered);

        setChartData({
          bar: toComparisonBarChartData(uniqueRecords, filters.metricLabel),
          doughnut: toComparisonDoughnutChartData(
            uniqueRecords,
            filters.metricLabel,
          ),
          radar: toComparisonRadarChartData(uniqueRecords, filters.metricLabel),
        });

        setTableData(uniqueRecords);
      } catch (err) {
        console.error(err);
        setError("Unable to load comparison data.");
      } finally {
        setLoading(false);
      }
    }

    fetchComparisonData();
  }, [filters]);

  return {
    filters,
    setFilters,
    chartData,
    tableData,
    loading,
    error,
  };
}

export default useComparisonData;
