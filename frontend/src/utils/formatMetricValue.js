export function formatMetricValue(value, unitType) {
  if (!Number.isFinite(value)) return "N/A";

  if (unitType === "currency") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  }

  if (unitType === "percent") {
    return `${Number(value).toFixed(1).replace(".0", "")}%`;
  }

  if (unitType === "ratio") {
    return Number(value).toFixed(2).replace(/\.00$/, "");
  }

  return value.toLocaleString();
}
