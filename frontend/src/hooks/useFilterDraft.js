import { useState } from "react";
import { FARM_BUSINESS_METRICS } from "../data/farmBusinessMetrics";

export default function useFilterDraft(applied, pageKey, defaults, onApply) {
  const [filters, setFilters] = useState(applied);
  const metrics = FARM_BUSINESS_METRICS.filter((metric) => metric.pages.includes(pageKey) && metric.reportKey === filters.reportKey);
  function onChange(patch) {
    setFilters((current) => {
      const next = { ...current, ...patch };
      if (patch.reportKey && patch.reportKey !== current.reportKey) {
        const metric = FARM_BUSINESS_METRICS.find((item) => item.pages.includes(pageKey) && item.reportKey === patch.reportKey);
        if (metric) Object.assign(next, { variable: metric.id, metricLabel: metric.label, unitType: metric.unitType });
      }
      if (patch.startYear !== undefined && next.startYear > next.endYear) next.endYear = next.startYear;
      if (patch.endYear !== undefined && next.endYear < next.startYear) next.startYear = next.endYear;
      return next;
    });
  }
  function apply() {
    const patch = Object.fromEntries(Object.entries(filters).filter(([key, value]) => JSON.stringify(value) !== JSON.stringify(applied[key])));
    if (patch.comparisonGroupId) delete patch.selectedObjects;
    if (Object.keys(patch).length) onApply(patch);
  }
  return { filters, metrics, onChange, apply, reset: () => setFilters({ ...defaults }) };
}
