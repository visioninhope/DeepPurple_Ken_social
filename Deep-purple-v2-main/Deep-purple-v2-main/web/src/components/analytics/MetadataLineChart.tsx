import { Line } from "react-chartjs-2";
import { MyChartData } from "../../types";

interface MetadataLineChartProps {
    chartData: MyChartData;
}

function MetadataLineChart({ chartData }: MetadataLineChartProps) {

    if (chartData.datasets.length > 1) {
        chartData.datasets[1].yAxisID = 'y-axis-2';
    }
    if (chartData.datasets.length > 2) {
        chartData.datasets[2].yAxisID = 'y-axis-2';
    }

    return (
        <div className="chart-container bg-light-1 px-10 py-4 rounded-md max-h-96">
            <Line
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: false,
                            text: "Customer sentiment"
                        },
                        legend: {
                            display: true,
                            position: "bottom"
                        }
                    },
                    maintainAspectRatio: true,
                    responsive: true,
                    scales: {
                        y: { // This is the first y-axis
                            type: 'linear',
                            display: true,
                            position: 'left',
                        },
                        'y-axis-2': { // This is the second y-axis
                            type: 'linear',
                            display: true,
                            position: 'right',
                        }
                    }
                }}
            />
        </div>
    );
}
export default MetadataLineChart;