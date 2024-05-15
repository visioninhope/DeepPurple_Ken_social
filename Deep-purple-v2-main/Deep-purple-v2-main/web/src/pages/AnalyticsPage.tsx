import SentimentAnalyisBoard from "../components/analytics/sentimentAnalysis";
import AnalyticsBoardLeftBar from "../components/analytics/AnalyticsBoardLeftBar"
import { useParams } from "react-router-dom";
import AnalyticsBoardWelcome from "../components/analytics/AnalyticsBoardWelcome";
import MetadataAnalysisBoard from "../components/analytics/MetadataAnalysisBoard";
import NegativeSentimentBoard from "../components/analytics/NegativeSentimentBoard";
import { useContext, useEffect, useState } from "react";
import NegativePostDetails from "../components/analytics/NegativePostDetails";
import AnalyticsTopSidebar from "../components/analytics/AnalyticsTopSideBar";
import SentimentIndividualPost from "../components/analytics/SentimentIndividualPost";
import { getRepliesToThatAuthor, updateEmotion, updateSentiment } from "../api/appwrite/api";
import { MyUserReplies, userFeedReplies } from "../types";
import EmotionAnalysisBoard from "../components/analytics/emotionAnalysis";
import EmptyAnalyticsPage from "../components/analytics/EmptyAnalyticsPage";
import NegativeSentimentPostsTable from "../components/analytics/NegativeSentimentPostsTable";
import { UsernameContext } from "../context/Usernamecontext";
import UserAnalysisBoard from "../components/analytics/UserdataAnalysisContent";


const AnalyticsPage = () => {

    const { analyticsType } = useParams<{ analyticsType: string }>();
    const { postId } = useParams<{ postId: string }>();
    const { displayType } = useParams<{ displayType: string }>();

    const sentiment = ['positive', 'negative']
    const emotions = ['anger', 'fear', 'joy', 'love', 'sadness', 'surprise']

    const { selectedUsername, setSelectedUsername } = useContext(UsernameContext);
    const [repliesData, setRepliesData] = useState<MyUserReplies[]>([]);

    const [displayPostDetail, setDisplayPostDetail] = useState(false);
    const [displaySentimentDetail, setDisplaySentimentDetail] = useState(false);

    function handleUsernameChange(value: string) {
        console.log(value);
        setSelectedUsername(value);
        getRepliesData();
    }

    function getSentiment() {
        return sentiment[Math.floor(Math.random() * sentiment.length)];
    }

    function getEmotion() {
        return emotions[Math.floor(Math.random() * emotions.length)];
    }

    async function getRepliesData() {

        const data = await getRepliesToThatAuthor(selectedUsername, 100);

        if (data === undefined || data.total === 0) {
            return false;
        } else {

            for (let i = 0; i < data.documents.length; i++) {
                let doc = data.documents[i];


                if (doc.sentiment === '') {
                    doc.sentiment = getSentiment();
                    updateSentiment(doc.$id, doc.sentiment);
                }

                if (doc.emotion === '') {
                    doc.emotion = getEmotion();
                    updateEmotion(doc.$id, doc.emotion);
                }
            }
        }
    }

    useEffect(() => {

        if (postId !== undefined) {
            setDisplayPostDetail(true);
        } else {
            setDisplayPostDetail(false);
        }

        if (displayType !== undefined) {
            setDisplaySentimentDetail(true);
        } else {
            setDisplaySentimentDetail(false);
        }
    }, [postId, displayType])
    return (

        <div className="flex flex-row min-h-screen">
            <AnalyticsBoardLeftBar />
            <div className="flex-grow flex-col pl-[250px]">
                <div className="flex-grow flex-col items-center">

                    {selectedUsername === "" ? (
                        <>
                            <AnalyticsTopSidebar title={analyticsType?.toUpperCase() || "ANALYTICS"}
                                onUsernameChange={handleUsernameChange} />
                            <EmptyAnalyticsPage />
                        </>

                    ) : displayPostDetail ? (
                        <>
                            <AnalyticsTopSidebar title={"POST# " + postId?.toUpperCase()} />
                            <div className="px-6">
                                <NegativePostDetails postId={postId ?? "1683920951807971329"} />
                            </div>
                        </>

                    ) : displaySentimentDetail ? (
                        <>
                            <AnalyticsTopSidebar title={"SENTIMENT"} />
                            <div className="px-6 bg-purple-1">
                                <SentimentIndividualPost username={selectedUsername} />
                            </div>
                        </>

                    ) : (
                        <>
                            <AnalyticsTopSidebar title={analyticsType?.toUpperCase() || "ANALYTICS"}
                                onUsernameChange={handleUsernameChange} />
                            <div className="px-6 ">
                                {(() => {
                                    switch (analyticsType) {
                                        case 'metadata':
                                            return <MetadataAnalysisBoard username={selectedUsername} />;
                                        case 'sentiment':
                                            return <SentimentAnalyisBoard username={selectedUsername} />;
                                        case 'negativeposts':
                                            return <NegativeSentimentPostsTable />;
                                        case 'emotion':
                                            return <EmotionAnalysisBoard username={selectedUsername} />;
                                        case 'userdata':
                                            return <UserAnalysisBoard username={selectedUsername} />;
                                        default:
                                            return <AnalyticsBoardWelcome />;
                                    }
                                })()}
                            </div>

                        </>
                    )}


                </div>
            </div>
        </div>

    )
}

export default AnalyticsPage