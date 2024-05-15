import { ApexOptions } from "apexcharts";
import { useEffect } from "react";
import Chart from 'react-apexcharts';

interface ReportStackedBarChartProps {
    labels: string[];
    values: number[];
}

export default function ReportStackerBar({ labels, values }: ReportStackedBarChartProps) {

    useEffect(() => {

    }, [labels, values])

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
            data: [30, 30, 30, 30, 30, 30, 30] // Replace with your data
        },
        {
            name: 'Suprise',
            type: 'column',
            data: [10, 10, 10, 10, 10, 10, 10] // Replace with your data
        },
        {
            name: 'Anger',
            type: 'column',
            data: [10, 10, 10, 10, 10, 10, 10] // Replace with your data
        },
        {
            name: 'Love',
            type: 'column',
            data: [20, 20, 20, 20, 20, 20, 20] // Replace with your data
        },
        {
            name: 'Fear',
            type: 'column',
            data: [10, 10, 10, 10, 10, 10, 10] // Replace with your data
        },
        {
            name: 'Sadness',
            type: 'column',
            data: [20, 20, 20, 20, 20, 20, 20] // Replace with your data
        },


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
            width: [0, 0, 0, 0, 0, 0],
            curve: 'smooth'
        },
        plotOptions: {
            bar: {
                horizontal: true,
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
        <div className="max-h-[420px] min-h-[420px]">
            <Chart options={options} series={series} type="bar" width={'220%'} />
        </div>
    );

}