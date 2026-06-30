import { useState } from "react";
import PageHeader from "../components/common/PageHeader";
import DomainTabs from "../components/common/DomainTabs";
import EmptyState from "../components/common/EmptyState";
import ComparisonControls from "../components/comparison/ComparisonControls";
import ComparisonCharts from "../components/comparison/ComparisonCharts";
import ComparisonTable from "../components/comparison/ComparisonTable";

function ComparisonPage() {
  const [activeDomain, setActiveDomain] = useState("business");

  return (
    <>
      <PageHeader
        title="Farm Data Comparison"
        description="Compare farm business financial metrics across selected farm categories."
      />

      <div className="page-toolbar">
        <DomainTabs activeDomain={activeDomain} onChange={setActiveDomain} />
      </div>

      {activeDomain === "household" ? (
        <EmptyState
          title="Household comparison coming soon"
          message="This version compares farm business data. Household comparison is planned for a future release."
        />
      ) : (
        <main className="comparison-page">
          <ComparisonControls />
          <ComparisonCharts />
          <ComparisonTable />
        </main>
      )}
    </>
  );
}

export default ComparisonPage;