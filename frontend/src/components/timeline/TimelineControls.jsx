function TimelineControls() {
  return (
    <section className="timeline-controls">

      <select>
        <option>Income Statement</option>
        <option>Balance Sheet</option>
        <option>Financial Ratios</option>
      </select>

      <select>
        <option>Gross Cash Farm Income</option>
      </select>

      <select>
        <option>All Farms</option>
      </select>

      <button type="button">
        Apply Filters
      </button>

    </section>
  );
}

export default TimelineControls;