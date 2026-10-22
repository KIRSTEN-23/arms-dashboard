import { useOutletContext } from "react-router-dom";

import EmptyState from "../components/common/EmptyState";
import PageLoader from "../components/common/PageLoader";
import YearControl from "../components/common/YearControl";
import headerChevron from "../assets/navigation/header-chevron.svg";
import PageHeader from "../components/common/PageHeader";

import ComparisonFilterToolbar from "../components/comparison/ComparisonFilterToolbar";
import ComparisonCharts from "../components/comparison/ComparisonCharts";
import ComparisonTable from "../components/comparison/ComparisonTable";

import useComparisonData from "../hooks/useComparisonData";

import useArmsMetadata from "../hooks/useArmsMetadata";
import { FARM_BUSINESS_METRICS, FARM_BUSINESS_REPORTS, PAGE_KEYS, DEFAULT_COMPARISON_FILTERS, COMPARISON_GROUPS, MIN_COMPARISON_OBJECTS } from "../data/farmBusinessMetrics";

function ComparisonPage() {
  const { activeDomain } = useOutletContext();
  const { years, loading: metadataLoading, error: metadataError } = useArmsMetadata();

  const { filters, setFilters, chartData, tableData, availableObjects, visibleObjects, loading, error } = useComparisonData();

  const contentLoading = loading || metadataLoading;
  const contentError = error || metadataError;

  const pageMetrics = FARM_BUSINESS_METRICS.filter(
    (metric) => metric.pages.includes(PAGE_KEYS.COMPARISON)
  );
  const activeReports = FARM_BUSINESS_REPORTS.filter(
    (report) => pageMetrics.some((metric) => metric.reportKey === report.key)
  );
  const activeMetrics = pageMetrics.filter(
    (metric) => metric.reportKey === filters.reportKey
  );

  function updateFilters(nextValues) {
    setFilters((current) => {
      const next = { ...current, ...nextValues };
      if (nextValues.reportKey && nextValues.reportKey !== current.reportKey) {
        const metric = pageMetrics.find((item) => item.reportKey === nextValues.reportKey && item.id === nextValues.variable)
          || pageMetrics.find((item) => item.reportKey === nextValues.reportKey);
        if (!metric) return current;
        Object.assign(next, {
          variable: metric.id,
          metricLabel: metric.label,
          unitType: metric.unitType,
        });
      }
      if (nextValues.comparisonGroupId) {
        const group = COMPARISON_GROUPS.find((item) => item.id === nextValues.comparisonGroupId);
        if (!group) return current;
        next.category = group.apiCategory;
        next.selectedObjects = [];
      }
      if (nextValues.selectedObjects) {
        const selection = [...new Set(nextValues.selectedObjects)].filter((object) => availableObjects.includes(object));
        if (selection.length > 0 && selection.length < MIN_COMPARISON_OBJECTS) return current;
        next.selectedObjects = selection;
      }
      return next;
    });
  }

  function clearFilters() {
    setFilters({ ...DEFAULT_COMPARISON_FILTERS, selectedObjects: [] });
  }

  return (
    <>
      {!contentLoading && !contentError && <PageHeader
        overlapTarget=".filter-layout__surface"
        overlapEnabled={!contentLoading && !contentError}
        title="Farm Data Comparison"
        description="Compare a U.S. farm business financial measure across selected farm categories."
        action={<div className="header-report-select">
          <YearControl years={years} year={filters.year} onChange={updateFilters} />
          <img src={headerChevron} alt="" aria-hidden="true" />
        </div>}
      />}

      {contentLoading ? (
        <PageLoader message="Loading comparison data…" />
      ) : contentError ? (
        <p className="page-status" role="alert">{contentError}</p>
      ) : (
        <div className="comparison-layout">
          <div className="comparison-layout__content">
            <ComparisonFilterToolbar
              reports={activeReports} metrics={activeMetrics} groups={COMPARISON_GROUPS} objects={availableObjects}
              filters={{ ...filters, selectedObjects: visibleObjects }}
              onChange={updateFilters} onClear={clearFilters}
            />

            {activeDomain === "household" ? (
              <EmptyState
                title="Household comparison coming soon"
                message="This version compares farm business data. Household comparison is planned for a future release."
              />
            ) : (
              <main className="comparison-page">
                {visibleObjects.length < MIN_COMPARISON_OBJECTS ? <EmptyState
                  title="Not enough objects to compare"
                  message="This metric has fewer than two available objects. Try another metric, year, or comparison group."
                /> : <>
                <ComparisonCharts
                  rows={tableData}
                  metrics={chartData?.metrics}
                  metricLabel={filters.metricLabel}
                  category={filters.category}
                  barData={chartData?.bar}
                />
                <ComparisonTable rows={tableData} metrics={chartData?.metrics} />
                </>}
              </main>
            )}
          </div>

        </div>
      )}
    </>
  );
}

export default ComparisonPage;
