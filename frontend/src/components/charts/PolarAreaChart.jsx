import { PolarArea } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, RadialLinearScale, Tooltip, Legend } from "chart.js";
import { polarAreaChartOptions } from "../../data/chartOptions";

ChartJS.register(ArcElement, RadialLinearScale, Tooltip, Legend);

function PolarAreaChart({ title, data }) {
  return (
    <section className="chart-card">
      <h3>{title}</h3>
      <div className="chart-card__canvas">
        <PolarArea data={data} options={polarAreaChartOptions} />
      </div>
    </section>
  );
}

export default PolarAreaChart;
