import { X } from "lucide-react";

function FilterPanel({
  isOpen,
  onClose,
  title = "Filter",
  reports = [],
  metrics = [],
  categories = [],
  filters,
  onFilterChange,
  onClear,
  onApply,
}) {
  if (!isOpen) return null;

  return (
    <aside className="filter-panel">
      <div className="filter-panel__header">
        <button type="button" onClick={onClose}>
          <X size={20} />
        </button>

        <h2>{title}</h2>

        <button type="button" onClick={onClear} className="filter-panel__clear">
          Clear all
        </button>
      </div>

      <section className="filter-section">
        <h3>Select Report</h3>

        {reports.map((report) => (
          <label key={report.id} className="filter-option">
            <input
              type="radio"
              name="report"
              value={report.id}
              checked={filters.reportId === report.id}
              onChange={() => onFilterChange({ reportId: report.id })}
            />
            {report.label}
          </label>
        ))}
      </section>

      <section className="filter-section">
        <h3>Select Metric</h3>

        <select
          value={filters.variable}
          onChange={(event) => {
            const selected = metrics.find((item) => item.id === event.target.value);

            onFilterChange({
              variable: selected.id,
              metricLabel: selected.label,
              reportId: selected.reportId,
            });
          }}
        >
          {metrics.map((metric) => (
            <option key={metric.id} value={metric.id}>
              {metric.label}
            </option>
          ))}
        </select>
      </section>

      <section className="filter-section">
        <h3>Compare By</h3>

        {categories.map((category) => (
          <label key={category.id} className="filter-option">
            <input
              type="radio"
              name="category"
              value={category.name}
              checked={filters.category === category.name}
              onChange={() => onFilterChange({ category: category.name })}
            />
            {category.name}
          </label>
        ))}
      </section>

      <div className="filter-panel__footer">
        <button type="button" onClick={onClose}>
          Cancel
        </button>

        <button type="button" onClick={onApply} className="filter-panel__apply">
          Apply Filter
        </button>
      </div>
    </aside>
  );
}

export default FilterPanel;