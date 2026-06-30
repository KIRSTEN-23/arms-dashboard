export function toComparisonBarChartData(records = [], metricLabel = "Selected metric") {
  const safeRecords = records.filter((item) => item.categoryValue !== "TOTAL");

  return {
    labels: safeRecords.map((item) => item.categoryValue),
    datasets: [
      {
        label: metricLabel,
        data: safeRecords.map((item) => item.estimate),
      },
    ],
  };
}

export function toComparisonRadarChartData(records = [], metricLabel = "Selected metric") {
  const safeRecords = records.filter((item) => item.categoryValue !== "TOTAL");

  return {
    labels: safeRecords.map((item) => item.categoryValue),
    datasets: [
      {
        label: metricLabel,
        data: safeRecords.map((item) => item.estimate),
      },
    ],
  };
}

export function toComparisonPolarChartData(records = [], metricLabel = "Selected metric") {
  const safeRecords = records.filter((item) => item.categoryValue !== "TOTAL");

  return {
    labels: safeRecords.map((item) => item.categoryValue),
    datasets: [
      {
        label: metricLabel,
        data: safeRecords.map((item) => item.estimate),
      },
    ],
  };
}

export function toTimelineLineChartData(records = [], metricLabel = "Selected metric") {
  const sortedRecords = [...records].sort((a, b) => a.year - b.year);

  return {
    labels: sortedRecords.map((item) => item.year),
    datasets: [
      {
        label: metricLabel,
        data: sortedRecords.map((item) => item.estimate),
        tension: 0.35,
        fill: false,
      },
    ],
  };
}

export function toOverviewMetricBars(records = []) {
  const totalRecord = records.find(
    (item) => item.category === "All Farms" && item.categoryValue === "TOTAL"
  );

  if (!totalRecord) return [];

  const maxValue = totalRecord.estimate || 1;

  return records
    .filter((item) => item.categoryValue !== "TOTAL")
    .map((item) => ({
      label: item.categoryValue,
      value: item.estimate,
      percentage: Math.round((item.estimate / maxValue) * 100),
      unit: item.unit,
    }));
}