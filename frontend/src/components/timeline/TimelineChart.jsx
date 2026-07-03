import LineChart from "../charts/LineChart";
import CardShell from "../common/CardShell";

function TimelineChart({ chartData }) {
  if (!chartData) {
    return <CardShell title="Historical Trend" className="timeline-chart" />;
  }

  return <LineChart title="Gross Cash Farm Income Over Time" data={chartData} />;
}

export default TimelineChart;