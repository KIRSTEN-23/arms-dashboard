import { DEFAULT_TIMELINE_FILTERS, PAGE_KEYS } from "../../data/farmBusinessMetrics";
import useFilterDraft from "../../hooks/useFilterDraft";
import TimelineYearSelect from "./TimelineYearSelect";
import { FilterSelect } from "../common/FilterChoices";
import ResponsiveFilters from "../common/ResponsiveFilters";
import { RotateCcw } from "lucide-react";

function TimelineFilterToolbarEditor({ reports, years, filters: appliedFilters, onChange: onApply }) {
  const { filters, metrics, onChange, apply, reset: onClear } = useFilterDraft(appliedFilters, PAGE_KEYS.TIMELINE, {
    ...DEFAULT_TIMELINE_FILTERS,
    startYear: years.length ? Math.min(...years) : DEFAULT_TIMELINE_FILTERS.startYear,
    endYear: years.length ? Math.max(...years) : DEFAULT_TIMELINE_FILTERS.endYear,
  }, onApply);
  return (
    <ResponsiveFilters title="Timeline filters" onClear={onClear} resetLabel="Reset filter">
    <section className="comparison-filter-toolbar timeline-filter-toolbar" aria-label="Timeline filters">
      <TimelineYearSelect years={years} filters={filters} onChange={onChange} />
      <div className="filter-field filter-field--report">
        <span>Report</span>
        <FilterSelect aria-label="Report" className="year-control" value={filters.reportKey} onChange={(event) => onChange({ reportKey: event.target.value })}>
          {reports.map((report) => <option key={report.key} value={report.key}>{report.label}</option>)}
        </FilterSelect>
      </div>
      <div className="filter-field filter-field--metric">
        <span>Metric</span>
        <FilterSelect aria-label="Metric" className="year-control" value={filters.variable} onChange={(event) => {
          const metric = metrics.find((item) => item.id === event.target.value);
          onChange({ variable: metric.id, metricLabel: metric.label, unitType: metric.unitType });
        }}>
          {metrics.map((metric) => <option key={metric.id} value={metric.id}>{metric.label}</option>)}
        </FilterSelect>
      </div>
      <div className="comparison-filter-toolbar__actions">
        <button type="button" className="filter-apply-button" onClick={apply}>Apply</button>
        <button type="button" className="filter-reset-button" onClick={onClear}><RotateCcw size={16} aria-hidden="true" />Reset filter</button>
      </div>
    </section>
    </ResponsiveFilters>
  );
}

export default function TimelineFilterToolbar(props) {
  return <TimelineFilterToolbarEditor key={JSON.stringify(props.filters)} {...props} />;
}
