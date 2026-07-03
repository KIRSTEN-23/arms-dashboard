export function normaliseSurveyData(records = []) {
  if (!Array.isArray(records)) return [];

  return records.map((item) => ({
    year: item.stat_Year,
    stateName: item.stateName,
    reportName: item.reportName,
    farmType: item.farmType,
    category: item.category,
    categoryValue: item.categoryValue,
    category2: item.category2,
    category2Value: item.category2Value,
    categoryId: item.series,
    categoryValueId: item.series_Element,
    variableId: item.variableId,
    variableName: item.variableName,
    unit: item.variableUnit,
    estimate: Number(item.estimate ?? 0),
    median: Number(item.median ?? 0),
    rse: Number(item.rse ?? 0),
    unreliable: Boolean(item.unreliable_Est),
  }));
}

export function getTotalRecord(records = []) {
  if (!Array.isArray(records)) return undefined;

  return (
    records.find(
      (item) => item.category === "All Farms" && item.categoryValue === "TOTAL",
    ) ||
    records.find(
      (item) =>
        item.category2 === "All Farms" && item.category2Value === "TOTAL",
    ) ||
    records[0]
  );
}

export function toComparisonChartData(records = []) {
  return records.map((item) => ({
    label: item.categoryValue,
    value: item.estimate,
    unit: item.unit,
  }));
}

export function toTimelineChartData(records = []) {
  return records
    .map((item) => ({
      year: item.year,
      value: item.estimate,
      unit: item.unit,
    }))
    .sort((a, b) => a.year - b.year);
}
