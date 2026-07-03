import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { timelineChartOptions } from "../../data/chartOptions";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

function LineChart({ title, data }) {
  return (
    <section className="chart-card">
      <h3>{title}</h3>
      <div className="chart-card__canvas">
        <Line data={data} options={timelineChartOptions} />
      </div>
    </section>
  );
}

export default LineChart;