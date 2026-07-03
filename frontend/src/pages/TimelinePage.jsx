import { useState } from "react";

import EmptyState from "../components/common/EmptyState";
import PageHeader from "../components/common/PageHeader";
import PageControls from "../components/common/PageControls";

import FilterPanel from "../components/FilterPanel";

import TimelineChart from "../components/timeline/TimelineChart";
import TimelineInsights from "../components/timeline/TimelineInsights";

import useTimelineData from "../hooks/useTimelineData";
import useArmsMetadata from "../hooks/useArmsMetadata";

import { FARM_BUSINESS_METRICS, FARM_BUSINESS_REPORTS } from "../data/farmBusinessMetrics";

const FILTER_CATEGORIES = [
  { id: "ftyppll", name: "Collapsed Farm Typology" },
  { id: "sal", name: "Economic Class" },
  { id: "age", name: "Operator Age" },
  { id: "reg", name: "Farm Resource Region" },
  { id: "n5reg", name: "NASS Region" },
  { id: "spec", name: "Production Specialty" },
];

function TimelinePage() {
   const [activeDomain, setActiveDomain] = useState("business");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { years } = useArmsMetadata();

  const { filters, setFilters, chartData, summary, loading, error,} = useTimelineData();

  function updateFilters(nextValues) {
    setFilters((current) => ({
      ...current,
      ...nextValues,
    }));
  }

  function clearFilters() {
    setFilters({
      startYear: 1996,
      endYear: 2024,
      state: "all",
      variable: "igcfi",
      metricLabel: "Gross Cash Farm Income",
      reportId: 2,
      category: "Production Specialty",
    });
  }
  return (
    <>
      <PageHeader
        title="Historical Trends"
        description="Track how financial metrics change across time."
      />

      <PageControls
        activeDomain={activeDomain}
        onDomainChange={setActiveDomain}
        years={years}
        yearVariant="range"
        startYear={filters.startYear}
        endYear={filters.endYear}
        onYearChange={updateFilters}
        onFilterClick={() => setIsFilterOpen(true)}
      />

      {activeDomain === "household" ? (
        <EmptyState
        title="Operator Household Trends"
        message="Historical household financial reporting is planned for a future release."
      />
      ) : (
        <main className="timeline-page">
          {loading && <p>Loading timeline data...</p>}
          {error && <p>{error}</p>}
          
          {!loading && !error && (
          <>
          <TimelineChart chartData={chartData} />
          <TimelineInsights summary={summary} />
          </>
          )}
        </main>
      )}

        <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        reports={FARM_BUSINESS_REPORTS}
        metrics={FARM_BUSINESS_METRICS}
        categories={FILTER_CATEGORIES}
        filters={filters}
        onFilterChange={updateFilters}
        onClear={clearFilters}
        onApply={() => setIsFilterOpen(false)}
      />
    </>
  );
}

export default TimelinePage;