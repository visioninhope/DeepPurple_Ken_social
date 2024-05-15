import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import MetadataLineChart from "./MetadataLineChart";
import { useEffect, useState } from "react";
import { MyChartDataset, MyMetaData } from "../../types";
import { getMetaDataOfThatAccount } from "../../services";

Chart.register(CategoryScale);

interface chartDataProps {
    labels: string[];
    datasets: MyChartDataset[];
}

interface MetadataAnalysisBoardProps {
    username: string;
}
export default function MetadataAnalysisBoard({ username }: MetadataAnalysisBoardProps) {

    const [metaData, setMetaData] = useState<MyMetaData>();
    const [chartDataMetrics, setchartDataMetrics] = useState<chartDataProps>({
        labels: [],
        datasets: [],
    });

    async function getMetadataMetrics() {
        const metadata = await getMetaDataOfThatAccount(username);
        return metadata;
    }

    function generateRandomData(average: number): number[] {
        const range = average * 0.2; // Adjust this value to change the range of random numbers
        const min = average - range;
        const max = average + range;

        const data = Array.from({ length: 7 }, () => Math.floor(Math.random() * (max - min + 1) + min));

        return data;
    }



    useEffect(() => {
        const fetchMetaData = async () => {
            const metadata = await getMetadataMetrics();
            setMetaData(metadata);
        }
        fetchMetaData();
    }, [username]);

    useEffect(() => {
        const labels = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }).reverse();
        console.log(metaData?.likesAverage);
        const data: chartDataProps = {
            labels: labels,
            datasets: [
                {
                    label: 'Likes',
                    data: generateRandomData(metaData?.likesAverage ?? 0),
                    fill: false,
                    backgroundColor: ['#3DA5D1'],
                    borderColor: '#3DA5D1',
                    borderWidth: 2,
                },
                {
                    label: 'Views',
                    data: generateRandomData(metaData?.viewsAverage ?? 0),
                    fill: false,
                    backgroundColor: ['#A97AD0'],
                    borderColor: '#A97AD0',
                    borderWidth: 2,
                },
                {
                    label: 'Comments',
                    data: generateRandomData(metaData?.repliesAverage ?? 0),
                    fill: false,
                    backgroundColor: ['#CBE137'],
                    borderColor: '#CBE137',
                    borderWidth: 2,
                }
            ]
        };
        setchartDataMetrics(data);
    }, [metaData]);


    return (
        <div>
            <section className="flex flex-row gap-32 mt-5 justify-start items-center">
                <div className="flex flex-col pl-3 gap-3 justify-start">
                    <p className="text-2xl">Total likes</p>
                    <p className="text-5xl font-bold text-primary-500">{metaData?.Likes}</p>
                    <p className="text-xl text-positive-green"></p>
                </div>
                <div className="flex flex-col pl-3 gap-3 justify-start">
                    <p className="text-2xl">New likes</p>
                    <p className="text-5xl font-bold text-primary-500">{metaData?.latestLikes}</p>
                    <p><span className="text-2xl">{metaData?.dailyAverageLikes.toFixed(0)}</span>   (daily avg)</p>
                </div>
                <div className="flex flex-col pl-3 gap-3 justify-start">
                    <p className="text-2xl">Views</p>
                    <p className="text-5xl font-bold text-primary-500">{metaData?.Views}</p>
                    <p className="text-xl text-positive-green"></p>
                </div>
            </section>

            <section className="mt-10">
                <div className="py-2 border-b-2">
                    <p className="font-bold text-xl">Weekly Post Feedbacks</p>
                </div>
                <div className="py-5">
                    <MetadataLineChart chartData={chartDataMetrics} />
                </div>
            </section>
        </div>

    )
}
