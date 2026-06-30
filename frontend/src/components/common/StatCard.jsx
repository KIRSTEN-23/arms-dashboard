function StatCard({ label, value, helper }) {
  return (
    <article className="stat-card">
      <p className="stat-card__label">{label}</p>
      <h3 className="stat-card__value">{value}</h3>
      {helper && <span className="stat-card__helper">{helper}</span>}
    </article>
  );
}

export default StatCard;