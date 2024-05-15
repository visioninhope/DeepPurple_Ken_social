import { ApexOptions } from "apexcharts";
import { useEffect } from "react";
import Chart from 'react-apexcharts';

interface ReportLineChartProps {
    labels: string[];
    values: number[];
}

export default function ReportLineChart({ labels, values }: ReportLineChartProps) {

    const series = [{
        name: 'sentiment',
        data: values,
        color: '#00E396'
    }];

    const options: ApexOptions = {
        chart: {
            id: 'basic-bar'
        },
        xaxis: {
            categories: labels,
            labels: {
                style: {
                    colors: '#000000', // replace with your desired color
                },
            },
        },
        markers: {
            size: 6,
            colors: ['#00E396']
        },
        stroke: {
            curve: 'smooth',
        },

    };

    useEffect(() => {

    }, [labels, values]);

    return (
        <div className="max-h-[300px] min-h-[300px]">

            <Chart options={options} series={series} type="line" width={'200%'} height={'100%'} />
        </div>
    )
}