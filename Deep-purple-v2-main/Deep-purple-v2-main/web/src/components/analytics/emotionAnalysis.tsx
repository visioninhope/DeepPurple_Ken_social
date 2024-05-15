import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState, useEffect } from "react";
import { tweets } from '../../data';
import MyGaugheChart from "./gaugeChart";
import ApexD from "./ApexChart_Doughnut";
import ApexChartStackedBar from "./SentimentStackedBar";
import { Button } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { NavLink } from "react-router-dom";
import { getEmotionDataOfThatAccont, getSentimentDataOfThatAccount } from "../../services";
import { MyEmotionData, MySentimentData } from "../../types";
import Sentiment_Doughnut from "./Sentiment_Doughnut";
import EmotionDistBarChart from "./EmotionDistBarChart";
import EmotionStackedBar from "./EmotionStackedBar";

Chart.register(CategoryScale);

interface EmotionAnalysisBoardProps {
    username: string;
}

export default function EmotionAnalysisBoard({ username }: EmotionAnalysisBoardProps) {

    const [emotiondata, setEmotionData] = useState<MyEmotionData>();

    const defaultEmotionData: MyEmotionData = {
        anger: 0,
        fear: 0,
        joy: 0,
        sadness: 0,
        surprise: 0,
        love: 0,
        positiveCount: 0,
        negativeCount: 0,
    };

    useEffect(() => {
        const fetchEmotionData = async () => {
            const emotiondata = await getEmotionDataOfThatAccont(username);
            setEmotionData(emotiondata);
            console.log(emotiondata);
        };

        fetchEmotionData();
    }, [username]);


    return (
        <div className="flex flex-col gap-10 py-10 px-5">
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
                    <p className="px-5  py-2 text-lg text-purple-1 ">Emotions Distribution (Last 7 days)</p>
                </div>
                <div className="py-2">

                    <EmotionDistBarChart emotiondata={emotiondata ?? defaultEmotionData} />

                </div>
            </div>
        </div>





    );
}