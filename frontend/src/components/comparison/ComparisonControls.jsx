function ComparisonControls() {
  return (
    <section className="comparison-controls">
      <select>
        <option>Income Statement</option>
        <option>Balance Sheet</option>
        <option>Financial Ratios</option>
      </select>

      <select>
        <option>Gross Cash Farm Income</option>
        <option>Net Farm Income</option>
        <option>Farm Assets</option>
      </select>

      <select>
        <option>Compare by: Production Specialty</option>
        <option>Compare by: NASS Region</option>
        <option>Compare by: Economic Class</option>
      </select>

      <button type="button">Apply filters</button>
    </section>
  );
}

export default ComparisonControls;