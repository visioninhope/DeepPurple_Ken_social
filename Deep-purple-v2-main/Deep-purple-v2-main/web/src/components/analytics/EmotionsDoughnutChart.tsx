import { Doughnut } from "react-chartjs-2";
import { MyChartData } from "../../types";

interface DoughnutChartProps {
    chartData: MyChartData;
}

function EmotionsDoughnutChart({ chartData }: DoughnutChartProps) {

    return (

        <div className="chart-container px-10 py-4  rounded-md" style={{ width: '35%' }}>
            <h2 style={{ textAlign: "center" }} className="text-dark-1">Emotions Distribution</h2>
            <Doughnut
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: false,
                            text: "Customer sentiment"
                        },
                        legend: {
                            display: true,
                            position: 'right'
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
export default EmotionsDoughnutChart;