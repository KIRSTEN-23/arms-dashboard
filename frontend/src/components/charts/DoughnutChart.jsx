import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ title, data }) {
  return (
    <section className="chart-card">
      <h3>{title}</h3>
      <div className="chart-card__canvas">
        <Doughnut data={data} />
      </div>
    </section>
  );
}

export default DoughnutChart;