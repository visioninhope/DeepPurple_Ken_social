import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getTheSentimentDistributionOfThatAccount } from "../../services";
import { CountrySentiment, MyEmotionData } from "../../types";
import { Chart as GoogleChart } from "react-google-charts";

Chart.register(CategoryScale);

interface UserAnalysisBoardProps {
    username: string;
}

export default function UserAnalysisBoard({ username }: UserAnalysisBoardProps) {

    const [data, setData] = useState<CountrySentiment[]>([
        ["Country", "Sentiment"],
        ["Germany", 0],
        ["United States", 0],
        ["Brazil", 0],
        ["Canada", 0],
        ["France", 0],
        ["RU", 0],
    ]);

    useEffect(() => {
        const fetchGeoData = async () => {
            const data = await getTheSentimentDistributionOfThatAccount(username);

            if (!data) return;

            setData(data);
        };

        fetchGeoData();
    }, [username]);


    return (
        <div className="flex flex-col gap-10 py-10 px-5 bg-purple-2">
            <div className="flex flex-row justify-between items-center">
                <p className="font-bold text-5xl ">Last 7 days</p>
                <NavLink to={"/analytics/sentiment/individualAnalysis"}>
                    {/* <Button variant="contained" style={{ backgroundColor: "#877EFF" }}>
                        Individual Posts <ArrowForwardIcon />
                    </Button> */}
                </NavLink>

            </div>

            <div className="bg-light-1 rounded-md">
                <div className="border-b-2">
                    <p className="px-5  py-2 text-lg text-purple-1 ">Sentiment Distribution Last Week</p>
                </div>
                <div className="py-2">

                    <GoogleChart
                        chartEvents={[
                            {
                                eventName: "select",
                                callback: ({ chartWrapper }) => {
                                    const chart = chartWrapper.getChart();
                                    const selection = chart.getSelection();
                                    if (selection.length === 0) return;
                                    const region = data[selection[0].row + 1];
                                    console.log("Selected : " + region);
                                },
                            },
                        ]}
                        chartType="GeoChart"
                        width="100%"
                        height="400px"
                        data={data}
                    />

                </div>
            </div>




        </div>





    );
}