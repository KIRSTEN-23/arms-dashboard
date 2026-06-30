function DomainTabs({ activeDomain, onChange }) {
  return (
    <div className="domain-tabs" role="tablist" aria-label="Financial domain">
      <button
        type="button"
        className={activeDomain === "business" ? "active" : ""}
        onClick={() => onChange("business")}
      >
        Business
      </button>

      <button
        type="button"
        className={activeDomain === "household" ? "active" : ""}
        onClick={() => onChange("household")}
      >
        Household
      </button>
    </div>
  );
}

export default DomainTabs;