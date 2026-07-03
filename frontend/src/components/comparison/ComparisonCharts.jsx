import CardShell from "../common/CardShell";
import BarChart from "../charts/BarChart";
import DoughnutChart from "../charts/DoughnutChart";
import RadarChart from "../charts/RadarChart";

function ComparisonCharts({ barData, doughnutData, radarData }) {
  return (
    <section className="comparison-charts">
      {barData ? (
        <BarChart
          title="Gross Cash Farm Income by Production Specialty"
          data={barData}
        />
      ) : (
        <CardShell title="Bar chart" />
      )}

      <div className="comparison-chart-row">
        {doughnutData ? (
          <DoughnutChart title="Income Share" data={doughnutData} />
        ) : (
          <CardShell title="Donut chart" />
        )}

        {radarData ? (
          <RadarChart title="Category Profile" data={radarData} />
        ) : (
          <CardShell title="Radar chart" />
        )}
      </div>
    </section>
  );
}


export default ComparisonCharts;