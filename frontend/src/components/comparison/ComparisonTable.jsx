const rows = [
  { object: "Corn", value: "$534K", median: "$235K", reliability: "Reliable" },
  { object: "Soybean", value: "$254K", median: "$61K", reliability: "Reliable" },
  { object: "Dairy", value: "$1.9M", median: "$529K", reliability: "Reliable" },
];

function ComparisonTable() {
  return (
    <section className="comparison-table-card">
      <h3>Comparison table</h3>

      <table className="comparison-table">
        <thead>
          <tr>
            <th>Object</th>
            <th>Mean estimate</th>
            <th>Median</th>
            <th>Reliability</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.object}>
              <td>{row.object}</td>
              <td>{row.value}</td>
              <td>{row.median}</td>
              <td>{row.reliability}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default ComparisonTable;