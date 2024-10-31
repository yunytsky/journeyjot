import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const BarLineChart = ({ chartData }) => {
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1,
          callback: function(value) {
            return Number.isInteger(value) ? value : null;
          },
        },
      },
    },
  };



  return (
    <div className="chart">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarLineChart;