import { useState } from "react";

import PageHeader from "../components/common/PageHeader";
import DomainTabs from "../components/common/DomainTabs";
import EmptyState from "../components/common/EmptyState";

import DashboardSummary from "../components/dashboard/DashboardSummary";
import FarmMetricOverview from "../components/dashboard/FarmMetricOverview";
import CategoryBreakdown from "../components/dashboard/CategoryBreakdown";

import useDashboardData from "../hooks/useDashboardData";

function OverviewPage() {
  const [activeDomain, setActiveDomain] = useState("business");

  const {
    summaryMetrics,
    incomeItems,
    balanceItems,
    healthItems,
    loading,
    error,
  } = useDashboardData();

  return (
    <>
      <PageHeader
        title="Farm Business Financial Overview"
        description="A national snapshot of farm business performance, position and financial health."
      />

      <div className="page-toolbar">
        <DomainTabs activeDomain={activeDomain} onChange={setActiveDomain} />
      </div>

      {activeDomain === "household" ? (
        <EmptyState
          title="Household finance coming soon"
          message="This version focuses on farm business performance. Operator household income and balance sheet views are planned for a future release."
        />
      ) : (
        <main className="overview-page">
          {loading && <p>Loading dashboard data...</p>}

          {error && <p>{error}</p>}

          {!loading && !error && (
            <>
              <DashboardSummary metrics={summaryMetrics} />

              <div className="overview-grid">
                <FarmMetricOverview
                  title="Income statement"
                  items={incomeItems}
                />

                <FarmMetricOverview
                  title="Balance sheet"
                  items={balanceItems}
                />
              </div>

              <CategoryBreakdown title="Financial health" items={healthItems} />
            </>
          )}
        </main>
      )}
    </>
  );
}

export default OverviewPage;