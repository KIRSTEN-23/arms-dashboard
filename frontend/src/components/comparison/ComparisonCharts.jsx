import ComparisonHeatmap from "./ComparisonHeatmap";
import PolarAreaChart from "../charts/PolarAreaChart";
import { chartGradient, greenSegmentColours } from "../../data/chartOptions";
import BarChart from "../charts/BarChart";
import DoughnutChart from "../charts/DoughnutChart";

function ComparisonCharts({ barData, metricLabel, category, rows, metrics }) {
  const colouredBarData = {
    ...barData,
    datasets: barData.datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: (context) => chartGradient(context,
        ...greenSegmentColours[(context.dataIndex ?? 0) % greenSegmentColours.length]),
      hoverBackgroundColor: (context) => greenSegmentColours[
        (context.dataIndex ?? 0) % greenSegmentColours.length
      ][1],
    })),
  };
  const hasNegative = barData.datasets.some((dataset) => dataset.data.some((value) => Number.isFinite(value) && value < 0));
  const donutData = {
    labels: barData.labels,
    datasets: barData.datasets.map((dataset) => ({
      label: dataset.label,
      data: dataset.data,
      backgroundColor: (context) => chartGradient(context,
        ...greenSegmentColours[(context.dataIndex ?? 0) % greenSegmentColours.length]),
      borderColor: "#FFFFFF",
      borderWidth: 2,
    })),
  };
  return (
    <section className="comparison-charts">
      <BarChart title={`${metricLabel} by ${category}`} data={colouredBarData} roundedSegments />
      <div className="comparison-chart-row">
      {hasNegative ? <section className="chart-card">
        <h3>{metricLabel} across selected objects</h3>
        <p>Donut unavailable: this selection includes negative estimates. Use the bar chart and table for the full values.</p>
      </section> : <DoughnutChart title={`${metricLabel}: relative estimates across objects`} data={donutData} />}
      {hasNegative ? <div>
        <p className="comparison-layer-note">Polar area cannot represent negative estimates. The heatmap shows the full signed values instead.</p>
        <ComparisonHeatmap rows={rows} metrics={metrics} />
      </div> : <PolarAreaChart title={`${metricLabel} by object`} data={donutData} />}
      </div>
    </section>
  );
}

export default ComparisonCharts;
