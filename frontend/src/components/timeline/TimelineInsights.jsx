import StatCard from "../common/StatCard";

const cards = [
  {
    id: "highest",
    label: "Highest Value",
    value: "$0",
    helper: "Pending API",
  },
  {
    id: "lowest",
    label: "Lowest Value",
    value: "$0",
    helper: "Pending API",
  },
  {
    id: "average",
    label: "Average",
    value: "$0",
    helper: "Pending API",
  },
  {
    id: "change",
    label: "Overall Change",
    value: "0%",
    helper: "Pending API",
  },
];

function TimelineInsights() {
  return (
    <section className="timeline-summary">

      {cards.map((card) => (
        <StatCard
          key={card.id}
          {...card}
        />
      ))}

    </section>
  );
}

export default TimelineInsights;