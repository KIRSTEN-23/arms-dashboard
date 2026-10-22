import useIsMobile from "../../hooks/useIsMobile";
import { useId, useState } from "react";
import { formatMetricValue } from "../../utils/formatMetricValue";

function ComparisonTable({ rows = [], metrics = [], layered = false }) {
  const [showDetails, setShowDetails] = useState(false);
  const tableId = useId();
  const mobile = useIsMobile();
  if (layered) return (
    <section className="comparison-table-card">
      <h3>Comparison table</h3>
      <table className="comparison-table">
        <thead><tr>{["Object", "Metric", "Mean estimate", "Median", "RSE"].map((label) =>
          <th scope="col" key={label}>{label}</th>)}</tr></thead>
        <tbody>{rows.flatMap((row) => metrics.map((metric) => {
          const record = row.measures[metric.id];
          return <tr key={`${row.object}-${metric.id}`}>
            <th scope="row">{row.object}</th>
            <td>{metric.label}</td>
            <td>{formatMetricValue(record?.estimate, metric.unitType)}</td>
            <td>{formatMetricValue(record?.median, metric.unitType)}</td>
            <td>{Number.isFinite(record?.rse) ? `${record.rse}%` : "N/A"}</td>
          </tr>;
        }))}</tbody>
      </table>
    </section>
  );
  return (
    <section className="comparison-table-card">
      <div className="comparison-table-card__header">
        <h3>Financial measures by object</h3>
        <button
          type="button"
          className="comparison-table-card__details-toggle"
          aria-expanded={showDetails}
          aria-controls={tableId}
          onClick={() => setShowDetails((current) => !current)}
        >
          {showDetails ? "Hide details" : "Show details"}
        </button>
      </div>
      {mobile ? <div id={tableId} className="comparison-mobile-table">
        {rows.map((row) => <section className="comparison-mobile-object" key={row.object}>
          <h4>{row.object}</h4>
          <dl>{metrics.map((metric) => {
            const record = row.measures[metric.id];
            return <div className="comparison-mobile-value" key={metric.id}>
              <dt>{metric.label}<small className="comparison-unit">{metric.unitLabel}</small></dt>
              <dd>{formatMetricValue(record?.estimate, metric.unitType)}
                {record?.unreliable && <span className="estimate-quality">Low reliability</span>}
                {record && showDetails && <div className="estimate-details">
                  <p>Median: {formatMetricValue(record.median, metric.unitType)}</p>
                  <p>RSE: {Number.isFinite(record.rse) ? `${record.rse}%` : "N/A"}</p>
                </div>}
              </dd>
            </div>;
          })}</dl>
        </section>)}
        {!rows.length && <p>No comparison data available.</p>}
      </div> : <table id={tableId} className="comparison-table">
        <thead><tr>
          <th scope="col">Metric</th>
          {rows.map((row) => <th scope="col" key={row.object}>{row.object}</th>)}
        </tr></thead>
        <tbody>
          {rows.length > 0 && metrics.map((metric) => <tr key={metric.id}>
            <th scope="row">{metric.label}<small className="comparison-unit">{metric.unitLabel}</small></th>
            {rows.map((row) => {
              const record = row.measures[metric.id];
              return <td key={row.object}>
                {formatMetricValue(record?.estimate, metric.unitType)}
                {record?.unreliable && <span className="estimate-quality">Low reliability</span>}
                {record && showDetails && <div className="estimate-details">
                  <p>Median: {formatMetricValue(record.median, metric.unitType)}</p>
                  <p>RSE: {Number.isFinite(record.rse) ? `${record.rse}%` : "N/A"}</p>
                </div>}
              </td>;
            })}
          </tr>)}
          {!rows.length && <tr><td colSpan={rows.length + 1}>No comparison data available.</td></tr>}
        </tbody>
      </table>}
    </section>
  );
}

export default ComparisonTable;
