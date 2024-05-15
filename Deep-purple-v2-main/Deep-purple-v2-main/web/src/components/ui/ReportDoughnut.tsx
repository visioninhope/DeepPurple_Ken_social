import { ApexOptions } from "apexcharts";
import Chart from 'react-apexcharts';

interface ReportDoughnutProps {
    values: number[];
    labels: string[];
}


export default function ReportDoughnut({ values, labels }: ReportDoughnutProps) {
    const series = values;
    const options: ApexOptions = {
        labels: labels,
        colors: ['#28A745', '#DC3545'],
        plotOptions: {
            pie: {
                startAngle: -135,
                endAngle: 135,
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
                                return Math.round(Number(val)).toString();
                            }
                        }
                    }
                },
            },

        },
        legend: {
            show: false
        }
    };

    return (
        <div className="flex flex-col bg-light-1 py-3 px-3 rounded-md
        justify-center">

            <Chart options={options} series={series} type="donut" width={'100%'} />
        </div>
    );

}