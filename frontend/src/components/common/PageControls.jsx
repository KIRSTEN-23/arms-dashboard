import { SlidersHorizontal } from "lucide-react";
import DomainTabs from "./DomainTabs";
import YearControl from "./YearControl";

function PageControls({
  activeDomain,
  onDomainChange,
  years = [],
  yearVariant = "single",
  year,
  startYear,
  endYear,
  onYearChange,
  onFilterClick,
}) {
  return (
    <div className="page-toolbar">
      <DomainTabs activeDomain={activeDomain} onChange={onDomainChange} />

      <YearControl
        variant={yearVariant}
        years={years}
        year={year}
        startYear={startYear}
        endYear={endYear}
        onChange={onYearChange}
      />

      <button type="button" className="filter-button" onClick={onFilterClick}>
        <SlidersHorizontal size={16} />
        Filter
      </button>
    </div>
  );
}

export default PageControls;