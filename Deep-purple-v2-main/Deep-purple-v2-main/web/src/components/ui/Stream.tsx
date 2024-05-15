import { useState, useEffect } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import TwitterIcon from '@mui/icons-material/Twitter';
import BarChartIcon from '@mui/icons-material/BarChart';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';
import { MySocialMediaFeed, MyStreamMetaData, MyUserReplies, userFeed, userFeedData, userFeedReplies } from '../../types';
import { Tweet } from 'react-tweet';
import { axiosInstance as axios, axiosInstance } from '../../api/axios/config';
import { getSocialMediaFeedById, getSocialMediaFeedsByPlatformAndUsername, saveSocialMediaFeed, saveSocialMediaFeedReply } from '../../api/appwrite/api';
import { analyzeTheReplies, getMetaDataOfThatAccount } from '../../services';
import { NavLink } from 'react-router-dom';

interface StreamProps {
    username: string;
    onValueReturn: (value: string) => void;
}

export default function Stream({ username, onValueReturn }: StreamProps) {
    const [userfeeds, setUserfeeds] = useState<userFeed | null>(null);
    const [streamMetaData, setStreamMetaData] = useState<MyStreamMetaData>({
        'Likes': 0,
        'Replies': 0,
        'Views': 0,
    });

    const [refreshStream, setRefreshStream] = useState(true);
    const [displayedfeeds, setDisplayedfeeds] = useState(false);

    const handleDelete = (value: string) => {
        onValueReturn(value);
    };

    function saveFeedsToDB(data: userFeed) {
        const responseData = data;

        if (responseData === null || responseData === undefined) {
            return;
        }


        responseData?.tweets.map(async (tweet) => {
            const feed = await getSocialMediaFeedById(tweet['tweet-id']);

            if (feed?.total === 0) {
                saveRepliesToDB(tweet['replies'], tweet['tweet-id'], responseData.username);
                const socialMediaFeed: MySocialMediaFeed = {
                    platform: 'Twitter',
                    account_username: responseData.username,
                    post_id: tweet['tweet-id'],
                    post_text: tweet.tweet,
                    date: tweet.date,
                    views: tweet.views === "Unavailable" ? 0 : parseInt(tweet['views'], 10),
                    reply_count: parseInt(tweet['reply_count'], 10),
                    replies: tweet['replies'].map(reply => reply.comment),
                    likes: parseInt(tweet['likes'], 10),
                }

                saveSocialMediaFeed(socialMediaFeed);
            }
        });
    }

    const sentiments = ['positive', 'negative']
    const emotions = ['anger', 'love', 'fear', 'joy', 'sadness', 'surprise']

    function saveRepliesToDB(replies: userFeedReplies[], replied_to: string, author_being_reply_to: string) {
        const analysisData = analyzeTheReplies(replies);
        replies.map((reply) => {
            const randomSentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
            const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
            const reply_data: MyUserReplies = {
                author: reply.author,
                reply_text: reply.comment,
                replied_to: replied_to,
                author_replied_to: author_being_reply_to,
                sentiment: randomSentiment,
                emotion: randomEmotion,
            }
            saveSocialMediaFeedReply(reply_data);
        })
    }

    useEffect(() => {

        if (username === '' || username === undefined) {
            return;
        }
        if (refreshStream === true) {

            const fetchTweets = async () => {

                const tweets = await getSocialMediaFeedsByPlatformAndUsername('Twitter', username);

                if (tweets && tweets.total > 0) {
                    const transformedData: userFeedData[] = tweets.documents.map(doc => ({
                        date: doc.date,
                        likes: doc.likes, // Assuming 'likes' exists in your document
                        views: doc.views, // Assuming 'views' exists in your document
                        reply_count: doc.reply_count, // Assuming 'reply_count' exists in your document
                        replies: doc.replies, // Assuming 'replies' exists in your document
                        tweet: doc.post_text,
                        "tweet-id": doc.post_id,
                    }));

                    setUserfeeds({
                        name: "Phyo",
                        username: username,
                        tweets: transformedData,
                    });
                } else {
                    try {
                        const response = await axios.get('/streamRequest/Twitter/' + username);
                        setUserfeeds(response.data);
                        saveFeedsToDB(response.data);
                    } catch (error) {
                        console.log(error);
                    }
                }

                const metaData = await getMetaDataOfThatAccount(username);

                if (metaData === undefined) return;

                setStreamMetaData(
                    {
                        'Likes': metaData.Likes,
                        'Replies': metaData.Replies,
                        'Views': metaData.Views,
                    }
                )

                console.log(streamMetaData);
            }


            if (userfeeds !== undefined) {
                setDisplayedfeeds(true);
            }

            setRefreshStream(false);

            fetchTweets();
        }

    }, [refreshStream])
    return (
        <div>
            {userfeeds === null ? (
                <div className='bg-purple-1 mx-3 h-160 rounded-3xl border-dashed border-2 min-w-[500px]'>
                    <div className='flex flex-col gap-2 items-center justify-center h-160'>
                        <CircularProgress />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col px-5 py-2 ">
                    <div className="bg-purple-3 px-4 py-4 mb-2">
                        <ul className="flex  justify-between items-center gap-5">
                            <li className="flex flex-row gap-3">
                                <TwitterIcon />
                                <h2>{username}</h2>
                            </li>

                            <li>
                                <Button onClick={() => {
                                    setUserfeeds(null);
                                    setRefreshStream(true);
                                }}>
                                    <RefreshIcon />
                                </Button>
                                <Button onClick={() => {
                                    handleDelete('delete');
                                }}>
                                    <DeleteIcon />
                                </Button>

                            </li>
                        </ul>
                    </div>
                    <div className='flex flex-col gap-2 bg-purple-3 px-4 py-4'>
                        <div className='flex flex-row justify-between'>
                            <p className='text-xs font-bold'>Last 7 days</p>
                        </div>
                        <hr />
                        <ul className='flex flex-row gap-10 justify-evenly'>
                            <li className='flex flex-col items-center'>
                                <p className='text-3xl font-bold'>{streamMetaData.Likes}</p>
                                <p className='text-sm'>likes</p>
                            </li>
                            <li className='flex flex-col items-center'>
                                <p className='text-3xl font-bold'>{streamMetaData.Views}</p>
                                <p className='text-sm'>views</p>
                            </li>
                            <li className='flex flex-col items-center'>
                                <p className='text-3xl font-bold'>{streamMetaData.Replies}</p>
                                <p className='text-sm'>comments</p>
                            </li>
                        </ul>

                    </div>
                    <div className='flex flex-row justify-center bg-purple-3 border-t-2'>
                        <NavLink to='/analytics/sentiment'>
                            <Button>
                                <BarChartIcon />
                                <p className='text-xs'>View Insights</p>
                            </Button>
                        </NavLink>

                    </div>

                    <div className='flex flex-col bg-light-1 overflow-y-auto px-2 h-128'>
                        {displayedfeeds === true && userfeeds ? (
                            userfeeds.tweets.map((tweet, index) => (
                                <div key={index} className='flex flex-col h-fit light'>
                                    <Tweet id={tweet['tweet-id']} />
                                </div>
                            ))

                        ) : (
                            <>
                                <div>
                                    <img src={"/src/assets/images/dummypost.png"} alt="twitter-post-1" width={550} height={500} />
                                </div>
                                <div>
                                    <img src={"/src/assets/images/dummypost.png"} alt="twitter-post-2" width={550} height={500} />
                                </div>
                            </>
                        )}


                    </div>


                </div>
            )}

        </div>

    )
}
