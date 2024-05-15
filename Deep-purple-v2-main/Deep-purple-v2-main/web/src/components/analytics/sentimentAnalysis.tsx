import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState, useEffect } from "react";
import { tweets } from '../../data';
import MyGaugheChart from "./gaugeChart";
import ApexD from "./ApexChart_Doughnut";
import SentimentStackedBar from "./SentimentStackedBar";
import { Button } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { NavLink } from "react-router-dom";
import { getSentimentDataOfThatAccount } from "../../services";
import { MySentimentData } from "../../types";
import Sentiment_Doughnut from "./Sentiment_Doughnut";

Chart.register(CategoryScale);

interface SentimentAnalysisBoardProps {
    username: string;
}

export default function SentimentAnalyisBoard({ username }: SentimentAnalysisBoardProps) {

    const [sentimentData, setSentimentData] = useState<MySentimentData>();

    useEffect(() => {
        const fetchSentimentData = async () => {
            const sentimentData = await getSentimentDataOfThatAccount(username);
            setSentimentData(sentimentData);
        };
        console.log(sentimentData);
        fetchSentimentData();
    }, [username]);


    return (
        <div className="flex flex-col gap-10 py-10 px-5">

            <div className="grid grid-cols-8 gap-10">
                <div className="bg-light-1 rounded-md col-span-4">
                    <div className="border-b-2">
                        <p className="px-5  py-2 text-lg text-purple-1 ">Overall positive sentiment level</p>
                    </div>
                    <div className="grid grid-cols-6 gap-10 py-10">
                        <div className="col-span-4">
                            <MyGaugheChart positivePercentage={sentimentData?.positivePercentage} />
                        </div>
                        <div className="flex flex-col gap-5 col-span-2 text-dark-1">
                            <p className="font-bold text-5xl">{(sentimentData?.positivePercentage ?? 0) * 100}%</p>
                            <p>out of 100%</p>
                            {(sentimentData?.positivePercentage ?? 0) * 100 <= 20 && <p className="text-very-negative-red font-bold text-3xl">Very Negative</p>}
                            {(sentimentData?.positivePercentage ?? 0) * 100 > 20 && (sentimentData?.positivePercentage ?? 0) * 100 <= 40 && <p className="text-negative-red font-bold text-3xl">Negative</p>}
                            {(sentimentData?.positivePercentage ?? 0) * 100 > 40 && (sentimentData?.positivePercentage ?? 0) * 100 <= 60 && <p className="text-neutral font-bold text-3xl">Neutral</p>}
                            {(sentimentData?.positivePercentage ?? 0) * 100 > 60 && (sentimentData?.positivePercentage ?? 0) * 100 <= 80 && <p className="text-positive-green font-bold text-3xl">Positive</p>}
                            {(sentimentData?.positivePercentage ?? 0) * 100 > 80 && <p className="text-very-positive-green font-bold text-3xl">Very Positive</p>}
                        </div>
                    </div>
                </div>

                <div className="bg-light-1 rounded-md col-span-4">
                    <div className="border-b-2">
                        <p className="px-5  py-2 text-lg text-purple-1 ">Sentiment Distribution</p>
                    </div>

                    <div>
                        <Sentiment_Doughnut positivePercentage={(sentimentData?.positivePercentage ?? 0) * 100}
                            negativePercentage={(sentimentData?.negativePercentage ?? 0) * 100} />
                    </div>

                </div>

            </div>
            <div>
                <div className="bg-light-1 rounded-md py-16 px-16">
                    {sentimentData && <SentimentStackedBar sentimentData={sentimentData} />}
                </div>
            </div>
        </div>





    );
}