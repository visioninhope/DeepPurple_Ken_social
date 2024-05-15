import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const ApexD: React.FC = () => {
    const series = [75, 25];
    const options: ApexOptions = {
        labels: ['Postive', 'Negative'],
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

export default ApexD;