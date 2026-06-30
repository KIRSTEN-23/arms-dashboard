import { useState } from "react";
import DomainTabs from "../components/common/DomainTabs";
import EmptyState from "../components/common/EmptyState";
import PageHeader from "../components/common/PageHeader";
import CardShell from "../components/common/CardShell";
import { SlidersHorizontal } from "lucide-react";

function ComparisonPage() {
  const [activeDomain, setActiveDomain] = useState("business");

  return (
    <>
      <PageHeader
        title="Farm Data Comparison"
        description="Compare selected farm business financial metrics across categories."
        action={
          <button type="button" className="export-button">
            Export
          </button>
        }
      />

      <div className="toolbar">
        <DomainTabs activeDomain={activeDomain} onChange={setActiveDomain} />

        <button type="button" className="filter-button">
          Select Year
        </button>

        <button type="button" className="filter-button">
          <SlidersHorizontal size={16} />
          Filter
        </button>
      </div>

      {activeDomain === "household" ? (
        <EmptyState
          title="Household comparison coming soon"
          message="Business comparison is available in this version. Household comparison is planned as a future feature."
        />
      ) : (
        <div className="page-grid">
          <CardShell title="Bar Chart" className="chart-large" />

          <div className="two-column-grid">
            <CardShell title="Donut" />
            <CardShell title="Radar / Polar" />
          </div>

          <CardShell title="Comparison Data Table" className="table-card" />
        </div>
      )}
    </>
  );
}

export default ComparisonPage;