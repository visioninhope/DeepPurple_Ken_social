import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';

interface Sentiment_DoughnutProps {
    positivePercentage: number;
    negativePercentage: number;
}

export default function Sentiment_Doughnut({ positivePercentage, negativePercentage }: Sentiment_DoughnutProps) {



    const [series, setSeries] = useState<number[]>([positivePercentage, negativePercentage]);

    useEffect(() => {
        console.log(positivePercentage, negativePercentage);
        setSeries([positivePercentage, negativePercentage]);
    }, [positivePercentage, negativePercentage])
    const options: ApexOptions = {
        labels: ['Postive', 'Negative'],
        colors: ['#00E396', '#F44336'],
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '20px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            color: '#000',
                            offsetY: -10
                        },
                        value: {
                            show: true,
                            fontSize: '16px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            color: '#000',
                            offsetY: 16,
                            formatter: function (val: string) {
                                return val.toString();
                            }
                        }
                    }
                },
            },

        },
    };

    return (
        <Chart options={options} series={series} type="donut" width={'80%'} />
    );
};

