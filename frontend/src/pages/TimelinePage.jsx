import { useState } from "react";
import DomainTabs from "../components/common/DomainTabs";
import EmptyState from "../components/common/EmptyState";
import PageHeader from "../components/common/PageHeader";
import CardShell from "../components/common/CardShell";
import { SlidersHorizontal } from "lucide-react";

function TimelinePage() {
  const [activeDomain, setActiveDomain] = useState("business");

  return (
    <>
      <PageHeader
        title="Trends Timeline"
        description="Track how farm business financial metrics change over time."
        action={
          <button type="button" className="export-button">
            Export
          </button>
        }
      />

      <div className="toolbar">
        <DomainTabs activeDomain={activeDomain} onChange={setActiveDomain} />

        <button type="button" className="filter-button">
          Select Start Year
        </button>

        <button type="button" className="filter-button">
          Select End Year
        </button>

        <button type="button" className="filter-button">
          <SlidersHorizontal size={16} />
          Filter
        </button>
      </div>

      {activeDomain === "household" ? (
        <EmptyState
          title="Household trends coming soon"
          message="This version tracks farm business trends. Operator household trends are planned for a future version."
        />
      ) : (
        <div className="page-grid">
          <CardShell title="Line / Area Chart / Table" className="chart-large" />

          <div className="kpi-grid">
            <CardShell title="Highest Value" />
            <CardShell title="Lowest Value" />
            <CardShell title="Overall Change" />
            <CardShell title="Average Annual Growth" />
          </div>
        </div>
      )}
    </>
  );
}

export default TimelinePage;