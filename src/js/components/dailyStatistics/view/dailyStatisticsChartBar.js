import Chart from 'chart.js';

const renderChartBar = (canvas, AxisXData, AxisYData) => new Chart(canvas, {
  type: 'horizontalBar',
  data: {
    datasets: [{
      label: 'Game starts',
      // barPercentage: 0.5,
      // barThickness: 6,
      // maxBarThickness: 8,
      // minBarLength: 2,
      data: AxisXData,
    }],
    labels: AxisYData,
  },
  options: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    // scales: {
    //   yAxes: [{
    //     ticks: {
    //       beginAtZero: true,
    //       precision: 0,
    //       autoSkipPadding: 10,
    //       suggestedMax: 30,
    //     },
    //   }],
    // },
  },
});

export default renderChartBar;
