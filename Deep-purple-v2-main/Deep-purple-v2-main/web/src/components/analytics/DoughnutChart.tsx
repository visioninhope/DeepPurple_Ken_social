import { Doughnut } from "react-chartjs-2";
import { MyChartData } from "../../types";

interface DoughnutChartProps {
    chartData: MyChartData;
}

function DoughnutChart({ chartData }: DoughnutChartProps) {

    return (

        <div className="chart-container px-10 py-4 rounded-md" style={{ width: '40%' }}>
            <h2 style={{ textAlign: "center" }} className="text-dark-1">Customer Sentiment</h2>
            <Doughnut
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: false,
                            text: "Customer sentiment"
                        },
                        legend: {
                            position: 'left',
                            display: true,
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: true,
                    cutout: '60%',
                }}
            />
        </div>


    );
}
export default DoughnutChart;