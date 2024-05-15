import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState, useEffect } from "react";
import { tweets } from "../../data";
import DoughnutChart from "./DoughnutChart";
import { BarChart } from "./BarChart";
import { axiosInstance } from "../../api/axios/config";
import { TweetData } from "../../types";
import { saveTweetData } from "../../context";

Chart.register(CategoryScale);

interface chartDataProps {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
        borderColor: string;
        borderWidth: number;
    }[];
}

export default function AnalyticsBoardContent() {

    const [tweetSentiments, setTweetSentiments] = useState<TweetData[]>([]);

    const [chartData, setChartData] = useState<chartDataProps>({
        labels: [],
        datasets: [{
            label: '',
            data: [],
            backgroundColor: [],
            borderColor: "",
            borderWidth: 2,
        }],

    });



    useEffect(() => {
        const fetchSentiments = async () => {
            try {
                const sentiments = await Promise.all(
                    tweets.map((tweet) => {
                        // Check if the tweet is already in tweetSentiments
                        const existingSentiment = tweetSentiments.find(
                            (sentiment) => sentiment.tweet === tweet.tweet
                        );

                        if (existingSentiment) {
                            // If the tweet is already in tweetSentiments, return the existing sentiment
                            return existingSentiment.sentiment;
                        } else {
                            // If the tweet is not in tweetSentiments, make the API call
                            return axiosInstance
                                .post("/analysis/getSentiment", tweet)
                                .then((response) => {
                                    const scoreLabels = response.data.scored_labels;

                                    if (!scoreLabels || scoreLabels.length === 0) {
                                        return null;
                                    }
                                    const scoreLabel = scoreLabels[0];

                                    // setTweetSentiments((prevSentiments) => [
                                    //     ...prevSentiments,
                                    //     { tweet: tweet.tweet, sentiment: scoreLabel.label },
                                    // ]);

                                    return scoreLabel.label;
                                });
                        }
                    })
                );

                const positiveCount = sentiments.filter(sentiment => sentiment === 'POSITIVE').length;
                const negativeCount = sentiments.filter(sentiment => sentiment === 'NEGATIVE').length;

                const total = sentiments.length;
                const positivePercentage = (positiveCount / total) * 100;
                const negativePercentage = (negativeCount / total) * 100;

                setChartData({
                    labels: ['Positive', 'Negative'],
                    datasets: [{
                        label: 'Sentiment',
                        data: [positivePercentage, negativePercentage],
                        backgroundColor: ['#36A2EB', '#FF6384'],
                        borderColor: "black",
                        borderWidth: 2,
                    }],
                });
                // Store sentiments in state or somewhere else if necessary
            } catch (error) {
                console.error('Failed to fetch sentiments:', error);
            }
        };

        saveTweetData(tweetSentiments);
        fetchSentiments();
    }, []);

    return (

        <div className="grid grid-cols-2 justify-center items-center">
            <div className="flex flex-row gap-10 justify-center items-center">
                <DoughnutChart chartData={chartData} />
                <DoughnutChart chartData={chartData} />
            </div>
            <BarChart chartData={chartData} />
        </div>



    );
}