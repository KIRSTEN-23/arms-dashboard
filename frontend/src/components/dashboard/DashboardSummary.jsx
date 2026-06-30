import StatCard from "../common/StatCard";

function DashboardSummary({ metrics = [] }) {
  return (
    <section className="dashboard-summary">
      {metrics.map((metric) => (
        <StatCard
          key={metric.id}
          label={metric.label}
          value={metric.value}
          helper={metric.helper}
        />
      ))}
    </section>
  );
}

export default DashboardSummary;