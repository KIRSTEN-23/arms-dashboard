import useIsMobile from "../../hooks/useIsMobile";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { comparisonChartOptions } from "../../data/chartOptions";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function BarChart({ title, data, stacked = false, roundedSegments = false }) {
  const mobile = useIsMobile();
  const options = {
    ...comparisonChartOptions,
    indexAxis: mobile ? "x" : "y",
    scales: {
      x: { ...comparisonChartOptions.scales.x, stacked, grid: { display: !mobile }, ticks: mobile ? { maxRotation: 45, minRotation: 0, autoSkip: false } : comparisonChartOptions.scales.x.ticks },
      y: { ...comparisonChartOptions.scales.y, stacked, beginAtZero: mobile, grid: { display: mobile } },
    },
  };
  const chartData = roundedSegments ? {
    ...data,
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      borderColor: "#FFFFFF",
      borderWidth: 2,
      borderSkipped: false,
      borderRadius: { topLeft: 4, topRight: 4, bottomLeft: 4, bottomRight: 4 },
    })),
  } : data;
  return (
    <section className="chart-card">
      <h3>{title}</h3>
      <div className="chart-card__canvas">
        <Bar data={chartData} options={options} />
      </div>
    </section>
  );
}

export default BarChart;
