import { formatMetricValue } from "../../utils/formatMetricValue";

function ComparisonHeatmap({ rows = [], metrics = [] }) {
  return (
    <section className="chart-card comparison-heatmap">
      <h3>Financial measures heatmap</h3>
      <p className="comparison-heatmap__help">Colour intensity compares objects within each row. Darker means higher, not better.</p>
      <div className="comparison-heatmap__scroll">
        <table>
          <thead><tr>
            <th scope="col">Metric</th>
            {rows.map((row) => <th scope="col" key={row.object}>{row.object}</th>)}
          </tr></thead>
          <tbody>{metrics.map((metric) => {
            const values = rows.map((row) => row.measures[metric.id]?.estimate).filter(Number.isFinite);
            const min = values.length ? Math.min(...values) : 0;
            const max = values.length ? Math.max(...values) : 0;
            return <tr key={metric.id}>
              <th scope="row">{metric.label}<small className="comparison-unit">{metric.unitLabel}</small></th>
              {rows.map((row) => {
                const record = row.measures[metric.id];
                const value = record?.estimate;
                const present = Number.isFinite(value);
                const intensity = present ? (max === min ? 0.5 : (value - min) / (max - min)) : 0;
                const colour = [237, 245, 237].map((light, index) => Math.round(light + ([15, 45, 23][index] - light) * intensity));
                return <td key={row.object}>
                  <div
                    className={`comparison-heatmap__cell${present ? "" : " comparison-heatmap__cell--missing"}`}
                    style={present ? { backgroundColor: `rgb(${colour.join(",")})`, color: intensity >= 0.62 ? "#FFFFFF" : "#071309" } : undefined}
                    title={`${metric.label} — ${row.object}: ${formatMetricValue(value, metric.unitType)} (${metric.unitLabel})${record?.unreliable ? "; low reliability" : ""}`}
                  >
                    {formatMetricValue(value, metric.unitType)}
                    {record?.unreliable && <small>Low reliability</small>}
                  </div>
                </td>;
              })}
            </tr>;
          })}</tbody>
        </table>
      </div>
      {!rows.length && <p>No comparison data available.</p>}
      <div className="comparison-heatmap__legend"><span>Lower</span><span aria-hidden="true" /><span>Higher</span></div>
    </section>
  );
}

export default ComparisonHeatmap;
