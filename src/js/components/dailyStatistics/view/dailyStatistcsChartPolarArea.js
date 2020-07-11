import Chart from 'chart.js';

const renderChartBar = (canvas, dataArr) => new Chart(canvas, {
  type: 'polarArea',
  data: {
    datasets: [{
      backgroundColor: [
        'rgba(255, 15, 15, 0.5)',
        'rgba(15, 255, 15, 0.5)',
        'rgba(15, 135, 255, 0.5)',
      ],
      borderColor: 'rgba(255, 255, 255, 0.1)',
      data: dataArr,
    }],
    labels: ['Easy', 'Difficult', 'Repeat'],
  },
  options: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
    },
    scale: {
      ticks: {
        beginAtZero: true,
        precision: 0,
        autoSkipPadding: 10,
        suggestedMax: 2,
      },
    },
  },
});

export default renderChartBar;
