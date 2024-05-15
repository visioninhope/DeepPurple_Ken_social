import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export default function EmotionStackedBar() {
    const getLastSevenDays = () => {
        const result = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            result.push(d.toLocaleDateString());
        }
        return result.reverse();
    };
    const series = [
        {
            name: 'Joy',
            type: 'column',
            data: [40, 30, 20, 50, 30, 30, 0] // Replace with your data
        },
        {
            name: 'Suprise',
            type: 'column',
            data: [20, 10, 30, 10, 10, 10, 15] // Replace with your data
        },
        {
            name: 'Anger',
            type: 'column',
            data: [10, 10, 10, 10, 10, 10, 15] // Replace with your data
        },
        {
            name: 'Love',
            type: 'column',
            data: [20, 20, 20, 0, 20, 20, 30] // Replace with your data
        },
        {
            name: 'Fear',
            type: 'column',
            data: [5, 10, 10, 10, 0, 10, 20] // Replace with your data
        },
        {
            name: 'Sadness',
            type: 'column',
            data: [5, 20, 10, 20, 30, 20, 20] // Replace with your data
        },
        // {
        //     name: 'Overall Sentiment',
        //     type: 'line',
        //     data: [40, 60, 30, 10, 50, 50, 10] // Replace with your data
        // }

    ];
    const options: ApexOptions = {
        chart: {
            stacked: true,

            toolbar: {
                show: true
            },
            stackType: "100%",
        },
        stroke: {
            width: [0, 0, 0, 0, 0, 0, 4],
            curve: 'smooth'
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%'
            },
        },
        xaxis: {
            categories: getLastSevenDays(),

        },
        yaxis: [
            {
                seriesName: 'Emotions',
                show: true,
                title: {
                    text: 'Total Emotions',
                },
            },


        ],
        colors: ['#F9B111', '#1E90FF', '#9A001A', '#FF1493', '#708090', '#4682B4'],
        legend: {
            show: true
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200,
                }
            }
        }]
    };

    return (

        <Chart options={options} series={series} type="bar" height={'250%'} />

    );
}