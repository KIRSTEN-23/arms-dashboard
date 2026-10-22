function toNullableNumber(value) {
  if (value == null || String(value).trim() === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

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
    estimate: toNullableNumber(item.estimate),
    median: toNullableNumber(item.median),
    rse: toNullableNumber(item.rse),
    unreliable: [true, 1, "1", "true"].includes(item.unreliable_Est),
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
