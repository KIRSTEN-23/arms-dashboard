function ComparisonTable({ rows = [] }) {
  return (
    <section className="comparison-table-card">
      <h3>Comparison table</h3>

      <table className="comparison-table">
        <thead>
          <tr>
            <th>Object</th>
            <th>Mean estimate</th>
            <th>Median</th>
            <th>RSE</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={`${row.categoryValue}-${row.estimate}`}>
              <td>{row.categoryValue}</td>
              <td>${Math.round(row.estimate).toLocaleString()}</td>
              <td>${Math.round(row.median).toLocaleString()}</td>
              <td>{row.rse}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default ComparisonTable;