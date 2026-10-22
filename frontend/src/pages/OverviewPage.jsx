import { useOutletContext } from "react-router-dom";

import PageLoader from "../components/common/PageLoader";
import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";
import YearControl from "../components/common/YearControl";
import headerChevron from "../assets/navigation/header-chevron.svg";

import DashboardSummary from "../components/dashboard/DashboardSummary";
import FarmMetricOverview from "../components/dashboard/FarmMetricOverview";
import CategoryBreakdown from "../components/dashboard/CategoryBreakdown";

import useDashboardData from "../hooks/useDashboardData";
import useArmsMetadata from "../hooks/useArmsMetadata";

function OverviewPage() {
  const { activeDomain } = useOutletContext();
  const { years, loading: metadataLoading, error: metadataError } = useArmsMetadata();

  const {
    filters,
    setFilters,
    summaryMetrics,
    incomeItems,
    balanceItems,
    healthItems,
    loading,
    error,
  } = useDashboardData();

  const contentLoading = loading || metadataLoading;
  const contentError = error || metadataError;

  return (
    <>
      {!contentLoading && !contentError && <PageHeader
        className="page-header--overview"
        overlapTarget=".dashboard-summary"
        overlapEnabled={!contentLoading && !contentError && activeDomain === "business"}
        title="Farm Business Financial Overview"
        description="A national snapshot of U.S. farm business performance, position and financial health."
        action={<div className="header-report-select">
          <YearControl
            years={years.length ? years : [filters.year]}
            year={filters.year}
            onChange={(nextValues) => setFilters((current) => ({ ...current, ...nextValues }))}
          />
          <img src={headerChevron} alt="" aria-hidden="true" />
        </div>}
      />}

      {contentLoading ? (
        <PageLoader message="Loading overview data…" />
      ) : contentError ? (
        <p className="page-status" role="alert">{contentError}</p>
      ) : (
        <>
          {activeDomain === "household" ? (
            <EmptyState
              title="Household finance coming soon"
              message="This version focuses on farm business performance. Operator household income and balance sheet views are planned for a future release."
            />
          ) : (
            <main className="overview-page">
              <DashboardSummary metrics={summaryMetrics} />
              <div className="overview-grid">
                <FarmMetricOverview title="Income statement" items={incomeItems} />
                <FarmMetricOverview title="Balance sheet" items={balanceItems} />
              </div>
              <CategoryBreakdown title="Financial health" items={healthItems} />
            </main>
          )}
        </>
      )}
    </>
  );
}

export default OverviewPage;
