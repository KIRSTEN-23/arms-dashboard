import { useState } from "react";

import PageHeader from "../components/common/PageHeader";
import DomainTabs from "../components/common/DomainTabs";
import EmptyState from "../components/common/EmptyState";

import TimelineControls from "../components/timeline/TimelineControls";
import TimelineChart from "../components/timeline/TimelineChart";
import TimelineInsights from "../components/timeline/TimelineInsights";

function TimelinePage() {

  const [activeDomain, setActiveDomain] = useState("business");

  return (
    <>

      <PageHeader
        title="Historical Trends"
        description="Track how financial metrics change across time."
      />

      <div className="page-toolbar">

        <DomainTabs
          activeDomain={activeDomain}
          onChange={setActiveDomain}
        />

      </div>

      {activeDomain === "household" ? (

        <EmptyState
          title="Operator Household Trends"
          message="Historical household financial reporting is planned for a future release."
        />

      ) : (

        <main className="timeline-page">

          <TimelineControls />

          <TimelineChart />

          <TimelineInsights />

        </main>

      )}

    </>
  );

}

export default TimelinePage;