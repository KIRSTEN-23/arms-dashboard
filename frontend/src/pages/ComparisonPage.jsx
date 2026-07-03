
import { useState } from "react";

import EmptyState from "../components/common/EmptyState";
import PageHeader from "../components/common/PageHeader";
import PageControls from "../components/common/PageControls";

import FilterPanel from "../components/FilterPanel";

import ComparisonCharts from "../components/comparison/ComparisonCharts";
import ComparisonTable from "../components/comparison/ComparisonTable";

import useComparisonData from "../hooks/useComparisonData";

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

function ComparisonPage() {
  const [activeDomain, setActiveDomain] = useState("business");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { years } = useArmsMetadata();

  const { filters, setFilters, chartData, tableData, loading, error } = useComparisonData();

  function updateFilters(nextValues) {
    setFilters((current) => ({
      ...current,
      ...nextValues,
    }));
  }
  function clearFilters() {
      setFilters({
        year: 2024,
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
        title="Farm Data Comparison"
        description="Compare farm business financial metrics across selected farm categories."
      />

      <PageControls
        activeDomain={activeDomain}
        onDomainChange={setActiveDomain}
        years={years}
        yearVariant="single"
        year={filters.year}
        onYearChange={updateFilters}
        onFilterClick={() => setIsFilterOpen(true)}
      />

      {activeDomain === "household" ? (
        <EmptyState 
        title="Household comparison coming soon" 
        message="This version compares farm business data. Household comparison is planned for a future release."
      />
      ) : (
        <main className="comparison-page">
          {loading && <p>Loading comparison data...</p>}
          {error && <p>{error}</p>}
          
          {!loading && !error && (
            <>
            <ComparisonCharts
              barData={chartData?.bar}
              doughnutData={chartData?.doughnut}
              radarData={chartData?.radar}
            />
          <ComparisonTable rows={tableData} />
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

export default ComparisonPage;
