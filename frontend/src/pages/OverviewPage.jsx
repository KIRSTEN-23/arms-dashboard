import { useState } from "react";
import DomainTabs from "../components/common/DomainTabs";
import EmptyState from "../components/common/EmptyState";
import PageHeader from "../components/common/PageHeader";
import CardShell from "../components/common/CardShell";

function OverviewPage() {
  const [activeDomain, setActiveDomain] = useState("business");

  return (
    <>
      <PageHeader
        title="Welcome"
        description="National overview of U.S. farm business financial performance."
      />

      <div className="toolbar">
        <DomainTabs activeDomain={activeDomain} onChange={setActiveDomain} />

        <button type="button" className="filter-button">
          Select Year
        </button>
      </div>

      {activeDomain === "household" ? (
        <EmptyState
          title="Household finance coming soon"
          message="This dashboard currently focuses on farm business performance. Operator household income and balance sheet views are planned for a future version."
        />
      ) : (
        <div className="page-grid">
          <div className="kpi-grid">
            <CardShell title="Total Assets" />
            <CardShell title="Total Liabilities" />
            <CardShell title="Equity" />
            <CardShell title="Debt-to-Assets Ratio" />
          </div>

          <div className="two-column-grid">
            <CardShell title="Income Summary" />
            <CardShell title="Expenses Summary" />
          </div>

          <CardShell title="Financial Health (Ratios)" className="wide" />
        </div>
      )}
    </>
  );
}

export default OverviewPage;