import { useEffect } from "react";
import Chart from 'react-apexcharts';

interface ReportLineChartProps {
    labels: string[];
    values: number[];
}

export default function ReportColumnChart({ labels, values }: ReportLineChartProps) {

    const series = [{
        name: 'series-1',
        data: values,

    }];

    const options = {
        chart: {
            id: 'column-bar'
        },
        xaxis: {
            categories: labels
        },
    };


    useEffect(() => {

    }, [labels, values]);
    return (
        <div className="max-h-[300px] min-h-[300px] min-w-[400px]">
            <Chart options={options} series={series} type="bar" width={'100%'} height={'100%'} />
        </div>
    )
}