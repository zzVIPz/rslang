import Chart from 'chart.js';

const renderChartLinear = (canvas, AxisXData, AxisYData) => new Chart(canvas, {
  type: 'line',
  data: {
    labels: AxisXData,
    datasets: [{
      label: 'Learned words',
      pointBackgroundColor: '#ffffff',
      pointBorderColor: '#2582e7',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: '#2582e7',
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
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          precision: 0,
          autoSkipPadding: 10,
          suggestedMax: 30,
        },
      }],
    },
  },
});

export default renderChartLinear;
