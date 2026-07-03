import StatCard from "../common/StatCard";

function TimelineInsights({ summary = [] }) {
  return (
    <section className="timeline-summary">
      {summary.map((card) => (
        <StatCard key={card.id} {...card} />
      ))}
    </section>
  );
}

export default TimelineInsights;