import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { MySentimentData } from '../../types';

interface SentimentStackedBarProps {
    sentimentData: MySentimentData;
}

export default function SentimentStackedBar({ sentimentData }: SentimentStackedBarProps) {
    const getLastSevenDays = () => {
        const result = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            result.push(d.toLocaleDateString());
        }
        return result.reverse();
    };

    const generateSeries = (count: number, days: number) => {
        const min = Math.floor(count * 0.7);
        const max = Math.ceil(count * 1.3);
        const series = Array.from({ length: days }, () => Math.floor(Math.random() * (max - min + 1) + min));
        return series;
    };

    const series = [
        {
            name: 'Positive Comments',
            type: 'column',
            data: generateSeries(sentimentData.positiveCount, 7)
        },
        {
            name: 'Negative Comments',
            type: 'column',
            data: generateSeries(sentimentData.negativeCount, 7)
        },
        {
            name: 'Overall Sentiment',
            type: 'line',
            data: generateSeries(sentimentData.positivePercentage * 100, 7)
        }
    ];
    const options: ApexOptions = {
        chart: {
            stacked: true,
            toolbar: {
                show: true
            },
            stackType: "normal",
        },
        stroke: {
            width: [0, 0, 4],
            curve: 'smooth'
        },
        plotOptions: {
            bar: {
                horizontal: false,
            },
        },
        xaxis: {
            categories: getLastSevenDays(),

        },
        yaxis: [
            {
                seriesName: 'Comments',

                show: true,
                title: {
                    text: 'Total Comments',
                },

            },
        ],
        colors: ['#008FFB', '#FF4560', '#775DD0'], // Colors for Positive, Negative, and Overall sentiment respectively
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

    useEffect(() => {
        console.log(sentimentData);
    }, [sentimentData]);

    return (
        <Chart options={options} series={series} type="line"
            height={'250%'} />
    );
};

