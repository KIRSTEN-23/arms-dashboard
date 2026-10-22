import LineChart from "../charts/LineChart";
import CardShell from "../common/CardShell";

function TimelineChart({ chartData, metricLabel }) {
  if (!chartData) {
    return <CardShell title="Historical Trend" className="timeline-chart" />;
  }

  return <LineChart title={`${metricLabel} Over Time`} data={chartData} />;
}

export default TimelineChart;
