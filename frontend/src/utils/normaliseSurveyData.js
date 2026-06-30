export function normaliseSurveyData(records = []) {
  return records.map((item) => ({
    year: item.stat_Year,
    stateName: item.stateName,
    reportName: item.reportName,
    farmType: item.farmType,
    category: item.category,
    categoryValue: item.categoryValue,
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
  return records.find(
    (item) =>
      item.category === "All Farms" &&
      item.categoryValue === "TOTAL"
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