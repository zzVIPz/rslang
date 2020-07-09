import MainModel from '../models/mainModel';
import { SECONDS_IN_DAY, CHART_CONTAINER, GRID_DENSITY } from '../constants/constStatistic';
// const CanvasJS = require('canvasjs');
// import CanvasJS from 'canvasjs';



export default class Statistic {
    constructor() {
        this.mainModel = new MainModel();
        this.statisticData = {};
        this.dataForChart = [];
        this.maxValuation = 0;
    }

    async init() {
        this.statisticData = await this.mainModel.getUserStatistic();
        this.splitStatistic(this.statisticData);
        this.addChartContainer()
        this.countMaxChartValue(this.dataForChart);
        this.createChart(this.maxValuation, this.dataForChart);
    }

    splitStatistic(statisticData) {
        let wordsInStat = statisticData.optional.progress;
        let nextDay;
        let previous = {date: undefined, words: undefined}
        for (let chartPoint in wordsInStat) {
            if(!previous.date) {
                previous.date = new Date(chartPoint)
                this.addPointToData(chartPoint, wordsInStat[chartPoint])
                previous.words = wordsInStat[chartPoint];
            }else{
                nextDay = new Date(chartPoint);
                if ((nextDay - previous.date) / SECONDS_IN_DAY === 1) {
                    this.addPointToData(chartPoint, wordsInStat[chartPoint]);
                    previous.words = wordsInStat[chartPoint];
                    previous.date = new Date(chartPoint);
                }else{
                    const lagPerDays = (nextDay - previous.date) / SECONDS_IN_DAY ;
                    nextDay = previous.date;
                    for (let i = 0 ; i < lagPerDays ; i += 1) {
                        nextDay.setSeconds(nextDay.getSeconds() + SECONDS_IN_DAY / 1000);
                        if(i === lagPerDays - 1) {
                            this.addPointToData(nextDay, wordsInStat[chartPoint]);
                        }else {
                            this.addPointToData(nextDay, previous.words);
                        }
                    }
                    previous.words = wordsInStat[chartPoint];
                    previous.date = new Date(chartPoint);
                }
            }
        }
    }

    addPointToData(date, words) {
        let onePointObject = {}
        onePointObject.x = new Date(date);
        onePointObject.y = words;
        this.dataForChart.push(onePointObject);
    }

    addChartContainer() {
        document.querySelector('.main').innerHTML = CHART_CONTAINER;
    }
    
    countMaxChartValue(data) {
        this.maxValuation =  (Math.floor(data[data.length-1].y / GRID_DENSITY) + 1) * GRID_DENSITY;
    }

    createChart(value, dataWords) {
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            animationDuration: 1000,
            interactivityEnabled: true,
            zoomEnabled: true,
            zoomType: "x",
            backgroundColor: "#ecfdff",

            title:{
                text: "Games statistic"
            },
            toolTip: {
                enabled: true,
                content: "at {x} you lerned {y} {name}",
            },
            axisX:{
                    gridColor: "Silver",
                    valueFormatString: "DD/MMM/YYYY"
                },
            axisY :{
                title: "how many words did you learn",
                includeZero: true,
                maximum: value,
                interval: value / 10,
                gridDashType: "dash",
            },	
            legend: {
                fontSize: 13,
                cursor:"pointer",
            },
            data: [{
                type: "area",
                showInLegend: true,
                name: "words",
                yValueFormatString: "",
                xValueFormatString: "DD MMMM YYYY",
                color: "red",
                dataPoints: dataWords,
            }
            ]
        });
        chart.render();
    }

}
