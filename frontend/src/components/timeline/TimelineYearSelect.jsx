import { useContext, useId, useState } from "react";
import { FilterLayoutContext } from "../common/FilterLayoutContext";

function YearRange({ years, startYear, endYear, onChange }) {
  const id = useId();
  const [range, setRange] = useState([
    Math.max(0, years.indexOf(Number(startYear))),
    Math.max(0, years.indexOf(Number(endYear))),
  ]);
  const maximum = Math.max(0, years.length - 1);
  const commit = () => {
    const start = years[range[0]];
    const end = years[range[1]];
    if (start !== undefined && end !== undefined && (start !== Number(startYear) || end !== Number(endYear))) {
      onChange({ startYear: start, endYear: end });
    }
  };
  return <div className="timeline-year-slider">
    <output htmlFor={`${id}-start ${id}-end`}>{years[range[0]] ?? startYear} – {years[range[1]] ?? endYear}</output>
    <div className="timeline-year-range" style={{ "--range-start": `${maximum ? range[0] / maximum * 100 : 0}%`, "--range-end": `${maximum ? range[1] / maximum * 100 : 100}%` }}>
      <span className="timeline-year-range__track" aria-hidden="true" />
      {['Start year', 'End year'].map((label, handle) => <input
        key={label} id={`${id}-${handle === 0 ? 'start' : 'end'}`} type="range"
        min={0} max={maximum} step={1} value={range[handle]} disabled={years.length < 2}
        aria-label={label} aria-valuetext={String(years[range[handle]] ?? (handle === 0 ? startYear : endYear))}
        onChange={(event) => {
          const next = Number(event.target.value);
          setRange((current) => handle === 0
            ? [Math.min(next, current[1]), current[1]]
            : [current[0], Math.max(next, current[0])]);
        }}
        onPointerUp={commit} onBlur={commit}
        onKeyUp={(event) => {
          if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End", "PageUp", "PageDown"].includes(event.key)) commit();
        }} />)}
    </div>
    <div className="timeline-year-slider__bounds" aria-hidden="true"><span>{years[0]}</span><span>{years.at(-1)}</span></div>
  </div>;
}

export default function TimelineYearSelect({ years, filters, onChange }) {
  const expanded = useContext(FilterLayoutContext);
  const availableYears = [...new Set(years.map(Number).filter(Number.isFinite))].sort((a, b) => a - b);
  if (expanded) return <div className="filter-field"><span>Year range</span>
    <YearRange key={`${filters.startYear}-${filters.endYear}-${availableYears.join(',')}`} years={availableYears} startYear={filters.startYear} endYear={filters.endYear} onChange={onChange} />
  </div>;
  return <>{[['startYear', 'Start year'], ['endYear', 'End year']].map(([field, label]) => <div className="filter-field filter-field--year" key={field}>
    <span>{label}</span>
    <select aria-label={label} className="year-control" value={filters[field]} onChange={(event) => onChange({ [field]: Number(event.target.value) })}>
      {years.map((year) => <option key={year} value={year}>{year}</option>)}
    </select>
  </div>)}</>;
}
