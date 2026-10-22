import useFilterDraft from "../../hooks/useFilterDraft";
import { FilterSelect, FilterObjectPicker, ExpandedFilterContent } from "../common/FilterChoices";
import ResponsiveFilters from "../common/ResponsiveFilters";
import { RotateCcw } from "lucide-react";
import { DEFAULT_COMPARISON_FILTERS, PAGE_KEYS, MIN_COMPARISON_OBJECTS } from "../../data/farmBusinessMetrics";

function ComparisonFilterToolbarEditor({ groups, objects, filters: appliedFilters, reports, onChange: onApply, summary }) {
  const { filters, metrics, onChange, apply, reset: onClear } = useFilterDraft(appliedFilters, PAGE_KEYS.COMPARISON, {
    ...DEFAULT_COMPARISON_FILTERS,
    selectedObjects: objects.slice(0, MIN_COMPARISON_OBJECTS),
    defaultObjectCount: MIN_COMPARISON_OBJECTS,
  }, onApply);
  const defaultMetric = metrics[0];
  const badges = [
    { id: "report", label: `Report: ${reports.find((r) => r.key === filters.reportKey)?.label || filters.reportKey}`, onRemove: () => onChange({ reportKey: DEFAULT_COMPARISON_FILTERS.reportKey }) },
    { id: "metric", label: `Metric: ${filters.metricLabel}`, onRemove: () => defaultMetric && onChange({ variable: defaultMetric.id, metricLabel: defaultMetric.label, unitType: defaultMetric.unitType }) },
    { id: "group", label: `Compare by: ${groups.find((g) => g.id === filters.comparisonGroupId)?.label || filters.comparisonGroupId}`, onRemove: () => onChange({ comparisonGroupId: DEFAULT_COMPARISON_FILTERS.comparisonGroupId }) },
    { id: "year", label: `Year: ${filters.year}`, onRemove: () => onChange({ year: DEFAULT_COMPARISON_FILTERS.year }) },
    ...filters.selectedObjects.map((object) => ({ id: `object-${object}`, label: object, disabled: filters.selectedObjects.length <= MIN_COMPARISON_OBJECTS, onRemove: () => onChange({ selectedObjects: filters.selectedObjects.filter((item) => item !== object) }) })),
  ];
  return (
    <ResponsiveFilters title="Comparison filters" badges={badges} onClear={onClear} summary={summary}>
    <section id="comparison-filter-toolbar" className="comparison-filter-toolbar" aria-label="Comparison filters">
      <div className="filter-field">
        <span>Report</span>
        <FilterSelect aria-label="Report" className="year-control" value={filters.reportKey} onChange={(event) => onChange({ reportKey: event.target.value })}>
          {reports.map((report) => <option key={report.key} value={report.key}>{report.label}</option>)}
        </FilterSelect>
      </div>
      <div className="filter-field">
        <span>Metric</span>
        <FilterSelect aria-label="Metric" className="year-control" value={filters.variable} onChange={(event) => {
          const metric = metrics.find((item) => item.id === event.target.value);
          onChange({ variable: metric.id, metricLabel: metric.label, unitType: metric.unitType });
        }}>
          {metrics.map((metric) => <option key={metric.id} value={metric.id}>{metric.label}</option>)}
        </FilterSelect>
      </div>
      <div className="filter-field filter-field--compare-by">
        <span>Compare by</span>
        <FilterSelect aria-label="Compare by" className="year-control" value={filters.comparisonGroupId} onChange={(event) => onChange({ comparisonGroupId: event.target.value })}>
          {groups.map((group) => <option key={group.id} value={group.id}>{group.label}</option>)}
        </FilterSelect>
      </div>
      <div className="comparison-filter-toolbar__objects">
        <span>Objects</span>
        <FilterObjectPicker summary={`${filters.selectedObjects.length} selected`}>
          <div className="comparison-filter-toolbar__object-list">
            <p className="filter-help">Select at least {MIN_COMPARISON_OBJECTS}. No maximum.</p>
            {objects.map((object) => {
              const checked = filters.selectedObjects.includes(object);
              return <label className="filter-option" key={object}>
                <input type="checkbox" checked={checked}
                  disabled={objects.length < MIN_COMPARISON_OBJECTS || (checked && filters.selectedObjects.length <= MIN_COMPARISON_OBJECTS)}
                  onChange={() => onChange({ selectedObjects: checked
                    ? filters.selectedObjects.filter((item) => item !== object)
                    : [...filters.selectedObjects, object] })} />
                {object}
              </label>;
            })}
            {!objects.length && <p>No available objects.</p>}
          </div>
        </FilterObjectPicker>
        <ExpandedFilterContent>
          {summary && <p className="filter-selection-summary">{summary}</p>}
        </ExpandedFilterContent>
      </div>
      <div className="comparison-filter-toolbar__actions">
        <button type="button" className="filter-apply-button" onClick={apply}>Apply</button>
        <button type="button" className="filter-reset-button" onClick={onClear}>
          <RotateCcw size={16} aria-hidden="true" />
          Clear all
        </button>
      </div>
    </section>
    </ResponsiveFilters>
  );
}

export default function ComparisonFilterToolbar(props) {
  return <ComparisonFilterToolbarEditor key={JSON.stringify(props.filters)} {...props} />;
}
