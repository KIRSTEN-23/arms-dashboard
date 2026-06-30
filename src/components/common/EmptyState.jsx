import { Sprout } from "lucide-react";

function EmptyState({
  title = "Coming soon",
  message = "This section is planned as a future feature.",
}) {
  return (
    <section className="empty-state">
      <div className="empty-state-icon">
        <Sprout size={32} />
      </div>

      <h3>{title}</h3>
      <p>{message}</p>
    </section>
  );
}

export default EmptyState;