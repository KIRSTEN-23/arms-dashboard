function CardShell({ title, className = "" }) {
  return (
    <section className={`card-shell ${className}`}>
      <h3>{title}</h3>
    </section>
  );
}

export default CardShell;
