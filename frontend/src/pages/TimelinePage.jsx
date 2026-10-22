import { useOutletContext } from "react-router-dom";

import EmptyState from "../components/common/EmptyState";
import PageLoader from "../components/common/PageLoader";
import PageHeader from "../components/common/PageHeader";
import TimelineFilterToolbar from "../components/timeline/TimelineFilterToolbar";

import TimelineChart from "../components/timeline/TimelineChart";
import TimelineInsights from "../components/timeline/TimelineInsights";

import useTimelineData from "../hooks/useTimelineData";
import useArmsMetadata from "../hooks/useArmsMetadata";

import { FARM_BUSINESS_METRICS, FARM_BUSINESS_REPORTS, PAGE_KEYS, DEFAULT_TIMELINE_FILTERS } from "../data/farmBusinessMetrics";

function TimelinePage() {
   const { activeDomain } = useOutletContext();

  const { years, loading: metadataLoading, error: metadataError } = useArmsMetadata();

  const { filters, setFilters, chartData, summary, loading, error,} = useTimelineData(years, metadataLoading);

  const contentLoading = loading || metadataLoading;
  const contentError = error || metadataError;

  const pageMetrics = FARM_BUSINESS_METRICS.filter(
    (metric) => metric.pages.includes(PAGE_KEYS.TIMELINE)
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
      if (next.startYear > next.endYear) {
        if (nextValues.startYear !== undefined) next.endYear = next.startYear;
        else next.startYear = next.endYear;
      }
      return next;
    });
  }

  function clearFilters() {
    setFilters({ ...DEFAULT_TIMELINE_FILTERS });
  }

  return (
    <>
      {!contentLoading && !contentError && <PageHeader
        overlapTarget=".filter-layout__surface"
        overlapEnabled={!contentLoading && !contentError}
        title="Historical Trends"
        description="Track how U.S. farm business financial metrics change across time."
      />}

      {contentLoading ? (
        <PageLoader message="Loading timeline data…" />
      ) : contentError ? (
        <p className="page-status" role="alert">{contentError}</p>
      ) : (
        <>
          <TimelineFilterToolbar
            reports={activeReports} metrics={activeMetrics} years={years}
            filters={filters} onChange={updateFilters} onClear={clearFilters}
          />

          {activeDomain === "household" ? (
            <EmptyState
            title="Operator Household Trends"
            message="Historical household financial reporting is planned for a future release."
          />
          ) : (
            <main className="timeline-page">
              <TimelineChart chartData={chartData} metricLabel={filters.metricLabel} />
              <TimelineInsights summary={summary} />
            </main>
          )}

        </>
      )}
    </>
  );
}

export default TimelinePage;
