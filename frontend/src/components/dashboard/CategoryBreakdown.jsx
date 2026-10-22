import StatCard from "../common/StatCard";

function CategoryBreakdown({ title, items = [] }) {
  return (
    <section className="overview-health" aria-label={title}>
      {items.map((item) => <StatCard
        key={item.id}
        label={item.label}
        value={item.value}
        helper={item.unitLabel || "Financial ratio"}
      />)}
    </section>
  );
}

export default CategoryBreakdown;
