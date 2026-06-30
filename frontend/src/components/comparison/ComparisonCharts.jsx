import CardShell from "../common/CardShell";

function ComparisonCharts() {
  return (
    <section className="comparison-charts">
      <CardShell title="Bar chart" className="comparison-chart-large" />
      <CardShell title="Radar chart" />
      <CardShell title="Polar area chart" />
    </section>
  );
}

export default ComparisonCharts;