import Chart from 'react-apexcharts';
import { useEffect, useState } from "react";
import { MyEmotionData } from "../../types";
import { ApexOptions } from 'apexcharts';

interface EmotionDistBarChartProps {
    emotiondata: MyEmotionData;
}

export default function EmotionDistBarChart({ emotiondata }: EmotionDistBarChartProps) {


    const [series, setSeries] = useState([{
        name: '',
        data: [0]
    }]);

    useEffect(() => {

        if (emotiondata !== undefined || emotiondata !== null) {
            setSeries([
                { name: 'Anger', data: [emotiondata.anger] },
                { name: 'Fear', data: [emotiondata.fear] },
                { name: 'Joy', data: [emotiondata.joy] },
                { name: 'Sadness', data: [emotiondata.sadness] },
                { name: 'Surprise', data: [emotiondata.surprise] },
                { name: 'Love', data: [emotiondata.love] },
            ]);
        }

    }, [emotiondata]);

    const options: ApexOptions = {
        chart: {
            id: 'basic-bar',
        },
        xaxis: {
            categories: ['Emotion'],
            labels: {
                show: false
            }
        },

    }
    return (

        <Chart options={options} series={series} width={'100%'} height={'280%'} type='bar' />

    )
}

