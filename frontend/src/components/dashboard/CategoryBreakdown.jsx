function CategoryBreakdown({ title, items = [] }) {
  return (
    <section className="overview-card">
      <div className="overview-card__header">
        <h3>{title}</h3>
      </div>

      <div className="breakdown-list">
        {items.map((item) => (
          <div className="breakdown-item" key={item.label}>
            <div className="breakdown-item__meta">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>

            <div className="breakdown-item__bar">
              <div style={{ width: `${item.percentage}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoryBreakdown;