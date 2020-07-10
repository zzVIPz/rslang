import Chart from 'chart.js';

const renderChart = (canvas, AxisXData, AxisYData) => new Chart(canvas, {
  type: 'line',
  data: {
    labels: AxisXData,
    datasets: [{
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: AxisYData,
    }],
  },
  options: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Progress',
    },
  },
});

export default renderChart;
