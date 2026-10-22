function FarmMetricOverview({ title, items = [] }) {
  return (
    <section className="overview-card">
      <div className="overview-card__header">
        <h3>{title}</h3>
      </div>

      <div className="metric-flow">
        {items.map((item) => (
          <div className="metric-flow__row" key={item.id}>
            <div>
              <p>{item.label}</p>
              <strong>{item.value}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FarmMetricOverview;
