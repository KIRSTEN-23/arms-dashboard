import { useState } from "react";
import PageHeader from "../components/common/PageHeader";
import DomainTabs from "../components/common/DomainTabs";
import EmptyState from "../components/common/EmptyState";
import DashboardSummary from "../components/dashboard/DashboardSummary";
import FarmMetricOverview from "../components/dashboard/FarmMetricOverview";
import CategoryBreakdown from "../components/dashboard/CategoryBreakdown";

const summaryMetrics = [
  {
    id: "income",
    label: "Gross cash farm income",
    value: "$238K",
    helper: "Latest national average",
  },
  {
    id: "assets",
    label: "Farm assets",
    value: "$1.8M",
    helper: "Business balance sheet",
  },
  {
    id: "net-income",
    label: "Net farm income",
    value: "$76K",
    helper: "After expenses",
  },
  {
    id: "debt-ratio",
    label: "Debt-to-asset ratio",
    value: "13%",
    helper: "Financial health",
  },
];

const incomeStatementItems = [
  {
    id: "revenue",
    label: "Revenue",
    value: "$238K",
    note: "Gross cash farm income",
  },
  {
    id: "expenses",
    label: "Expenses",
    value: "$162K",
    note: "Total cash expenses",
  },
  {
    id: "net-income",
    label: "Net income",
    value: "$76K",
    note: "Net farm income",
  },
];

const balanceSheetItems = [
  {
    id: "assets",
    label: "Assets",
    value: "$1.8M",
    note: "Total farm assets",
  },
  {
    id: "liabilities",
    label: "Liabilities",
    value: "$234K",
    note: "Farm business debt",
  },
  {
    id: "equity",
    label: "Equity",
    value: "$1.56M",
    note: "Assets minus liabilities",
  },
];

const healthItems = [
  {
    label: "Income strength",
    value: "72%",
    percentage: 72,
  },
  {
    label: "Asset position",
    value: "84%",
    percentage: 84,
  },
  {
    label: "Debt risk",
    value: "28%",
    percentage: 28,
  },
];

function OverviewPage() {
  const [activeDomain, setActiveDomain] = useState("business");

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
          <DashboardSummary metrics={summaryMetrics} />

          <div className="overview-grid">
            <FarmMetricOverview
              title="Income statement"
              items={incomeStatementItems}
            />

            <FarmMetricOverview
              title="Balance sheet"
              items={balanceSheetItems}
            />
          </div>

          <CategoryBreakdown title="Financial health" items={healthItems} />
        </main>
      )}
    </>
  );
}

export default OverviewPage;