import { useEffect, useMemo, useState } from "react";
import { getSurveyData } from "../api/armsApi";
import { normaliseSurveyData } from "../utils/normaliseSurveyData";
import { toComparisonChartData } from "../utils/chartTransformers";
import {
  FARM_BUSINESS_METRICS,
  MIN_COMPARISON_OBJECTS,
  DEFAULT_COMPARISON_OBJECT_COUNT,
  DEFAULT_COMPARISON_FILTERS,
  PAGE_KEYS,
} from "../data/farmBusinessMetrics";

function dedupeByCategoryValue(records = []) {
  const seen = new Map();

  records.forEach((record) => {
    if (!seen.has(record.categoryValue)) {
      seen.set(record.categoryValue, record);
    }
  });

  return Array.from(seen.values());
}

function useComparisonData() {
  const [filters, setFilters] = useState(() => ({
    ...DEFAULT_COMPARISON_FILTERS,
    selectedObjects: [],
  }));

  const [series, setSeries] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function fetchComparisonData() {
      try {
        setLoading(true);
        setError("");

        const metrics = FARM_BUSINESS_METRICS.filter((metric) =>
          metric.id === filters.variable && metric.reportKey === filters.reportKey && metric.pages.includes(PAGE_KEYS.COMPARISON)
        );
        const responses = await Promise.all(metrics.map((metric) => getSurveyData({
          year: filters.year,
          state: filters.state,
          variable: metric.id,
          category: filters.category,
        })));
        if (!active) return;

        const nextSeries = metrics.map((metric, index) => ({
          metric,
          records: dedupeByCategoryValue(normaliseSurveyData(responses[index]).filter(
            (item) => item.category === filters.category && item.categoryValue !== "TOTAL"
          )),
        }));
        setSeries(nextSeries);
      } catch (err) {
        if (!active) return;
        console.error(err);
        setError(err.message || "Unable to load comparison data.");
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchComparisonData();
    return () => { active = false; };
  }, [filters.year, filters.state, filters.reportKey, filters.variable, filters.category]);

  const availableObjects = useMemo(() => [...new Set(series.flatMap((item) =>
    item.records.map((record) => record.categoryValue)
  ))], [series]);
  const visibleObjects = useMemo(() => {
    const selected = [...new Set(filters.selectedObjects)].filter((object) => availableObjects.includes(object));
    if (availableObjects.length < MIN_COMPARISON_OBJECTS) return [];
    return selected.length >= MIN_COMPARISON_OBJECTS
      ? selected
      : availableObjects.slice(0, filters.defaultObjectCount ?? DEFAULT_COMPARISON_OBJECT_COUNT);
  }, [filters.selectedObjects, filters.defaultObjectCount, availableObjects]);
  const visibleSeries = useMemo(() => series.map((item) => ({
    ...item,
    records: item.records.filter((record) => visibleObjects.includes(record.categoryValue)),
  })), [series, visibleObjects]);
  const chartData = useMemo(() => toComparisonChartData(visibleSeries, visibleObjects), [visibleSeries, visibleObjects]);
  const tableData = useMemo(() => visibleObjects.map((object) => ({
    object,
    measures: Object.fromEntries(visibleSeries.map(({ metric, records }) => [
      metric.id, records.find((record) => record.categoryValue === object),
    ])),
  })), [visibleObjects, visibleSeries]);

  return {
    filters,
    setFilters,
    chartData,
    tableData,
    availableObjects,
    visibleObjects,
    loading,
    error,
  };
}

export default useComparisonData;
