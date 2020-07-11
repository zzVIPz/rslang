import Chart from 'chart.js';

const renderChartBar = (canvas, AxisXData) => new Chart(canvas, {
  type: 'horizontalBar',
  data: {
    datasets: [{
      label: 'Game starts',
      backgroundColor: [
        'rgba(255, 15, 15, 0.5)',
        'rgba(255, 15, 255, 0.5)',
        'rgba(255, 255, 15, 0.5)',
        'rgba(15, 255, 15, 0.5)',
        'rgba(15, 135, 255, 0.5)',
        'rgba(135, 15, 255, 0.5)',
      ],
      data: AxisXData,
    }],
    labels: ['SpeakIt', 'English Puzzle', 'AudioCall', 'Savannah', 'Sprint', 'Word Search'],
  },
  options: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    scales: {
      xAxes: [{
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

export default renderChartBar;
