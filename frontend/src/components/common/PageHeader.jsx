function PageHeader({ title, description, action }) {
  return (
    <section className="page-header">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      {action && <div>{action}</div>}
    </section>
  );
}

export default PageHeader;