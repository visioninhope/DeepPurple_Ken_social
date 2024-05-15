import { SubscriptionData, TweetData } from "../types";


export const prices : SubscriptionData[] = [
    {
        id: "Basic",
        name: "Basic",
        description: "Basic Plan",
        price: 0,
        popular: false,
        features: [
            "Access to 1 social media account",
            "Access to 1 sentiment analysis model",
            "Access to 1 emotion analysis model",
        ]
    },
    {
        id: "Pro",
        name: "Pro",
        price: 10,
        popular: true,
        features: [
            "Access to 5 social media accounts",
            "Access to 5 sentiment analysis models",
            "Access to 5 emotion analysis models",
        ]
    },
    {
        id : "Enterprise",
        name: "Enterprise",
        price: 20,
        popular: false,
        features: [
            "Access to 10 social media accounts",
            "Access to 10 sentiment analysis models",
            "Access to 10 emotion analysis models",
        ]
    }
]

export const tweets : TweetData[] = [
{
    tweet: "Have you ever wondered what it would be like to travel to the moon? 🚀🌕 With the latest advancements in space technology, it might not be as far-fetched as you think! 🚀🌕 Imagine floating in zero gravity, looking down at the Earth from above, and experiencing the thrill of space travel. 🌎🚀🌕 #spaceexploration #moontravel #futuretech #innovation #excitingtimesahead #adventureawaits #letsgo #spacetravel #zerogravity #earthfromabove #thrillofalifetime #bucketlist",
    sentiment: "POSITIVE",
    emotion: [
        {label: "joy", value: 0.5},
        {label: "sadness", value: 0.1},
        {label: "anger", value: 0.1},
        {label: "fear", value: 0.1},
        {label: "sad", value: 0.1},
        {label: "surprise", value: 0.1}
    ],
    date: "2021-09-01T00:00:00.000Z"
},
{
    tweet: "Just finished reading an amazing book that I couldn't put down! Highly recommend it to all the bookworms out there. #booklovers #pageturner #mustread #lovereading #bookrecommendation #bookwormsunite",
    sentiment: "POSITIVE",
    emotion: [
        {label: "joy", value: 0.5},
        {label: "sadness", value: 0.1},
        {label: "anger", value: 0.1},
        {label: "fear", value: 0.1},
        {label: "sad", value: 0.1},
        {label: "surprise", value: 0.1}
    ],
    date: "2021-09-01T00:00:00.000Z"
},
{
    tweet: "The best part of my day is sipping on a hot cup of coffee and watching the sunrise. It's the little things that bring the most joy. #simplepleasures #morningritual #coffeelover #sunrise #gratefulheart #mindfulness #enjoythelittlethings",
    sentiment: "POSITIVE",
    emotion: [
        {label: "joy", value: 0.5},
        {label: "sadness", value: 0.1},
        {label: "anger", value: 0.1},
        {label: "fear", value: 0.1},
        {label: "sad", value: 0.1},
        {label: "surprise", value: 0.1}
    ],
    date: "2021-09-02T00:00:00.000Z"
},
{
    tweet: "Excited to announce that I'll be launching my own podcast soon! Stay tuned for some inspiring conversations, valuable insights, and a whole lot of fun. #podcastlaunch #comingsoon #staytuned #inspiringconversations #newadventures #podcasters #excitingtimes",
    sentiment: "NEGATIVE",
    emotion: [
        {label: "joy", value: 0.5},
        {label: "sadness", value: 0.1},
        {label: "anger", value: 0.1},
        {label: "fear", value: 0.1},
        {label: "sad", value: 0.1},
        {label: "surprise", value: 0.1},
    
    ],
    date: "2021-09-02T00:00:00.000Z"
}
]