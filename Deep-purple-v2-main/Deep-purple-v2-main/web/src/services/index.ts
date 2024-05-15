import { ca } from "date-fns/locale";
import { addReportChart, getPostsMadeByThatAccount, getRepliesToThatAuthor } from "../api/appwrite/api";
import { axiosInstance } from "../api/axios/config";
import { CountrySentiment, MyEmotionData, MyReportChart, MySentimentTableData,userFeedReplies } from "../types";
import * as d3 from 'd3';

function getLastSevenDays () {
    const result = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        result.push(d.toLocaleDateString());
    }
    return result.reverse();
};

export async function analyzeTheReplies(replies : userFeedReplies[]){
    try {
        const response = await axiosInstance.post('/analyze/predictPostEmotionInBulk', replies)
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

export async function saveMetaDataReportToDatabase(accoutName : string) {

    const posts = await getPostsMadeByThatAccount(accoutName);

    if (posts === undefined || posts?.total === 0) return;

    let metaData = {
        Views : 0,
        Replies : 0,
        Likes : 0,
    }

    posts.documents.forEach((post) => {
        metaData.Views += post.views;
        metaData.Replies += post.reply_count;
        metaData.Likes += post.likes;
    });

    const dailyAverageLikes = metaData.Likes / posts.documents.length;
    const dailyAverageViews = metaData.Views / posts.documents.length;
    const dailyAverageReplies = metaData.Replies / posts.documents.length;

    const likesReportChart : MyReportChart = {
        platform: 'Twitter',
        charttype: 'Doughnut',
        charttitle: 'Daily Likes',
        accountName : accoutName,
        report_group: 'Metadata_Reports',
        labels: ['Likes'],
        values: [dailyAverageLikes],
    }

    const viewsReportChart : MyReportChart = {
        platform: 'Twitter',
        charttype: 'Doughnut',
        charttitle: 'Daily Views',
        accountName : accoutName,
        report_group: 'Metadata_Reports',
        labels: ['Views'],
        values: [dailyAverageViews],
    }

    const repliesReportChart : MyReportChart = {
        platform: 'Twitter',
        charttype: 'Doughnut',
        charttitle: 'Daily Replies',
        accountName : accoutName,
        report_group: 'Metadata_Reports',
        labels: ['Replies'],
        values: [dailyAverageReplies],
    }

    addReportChart(likesReportChart);
    addReportChart(viewsReportChart);
    addReportChart(repliesReportChart);
}

export async function saveSentimentReportToDatabase(accoutName : string) {
    
        const replies = await getRepliesToThatAuthor(accoutName);
    
        if (replies === undefined || replies?.total === 0) return;
    
        let positiveCount = 0;
        let negativeCount = 0;
        let totalSentiment = 0;
    
        replies.documents.forEach((post) => {
            if (post.sentiment === 'positive') {
                positiveCount++;
            } else if (post.sentiment === 'negative') {
                negativeCount++;
            }
        });
        totalSentiment = positiveCount + negativeCount;
        let positivePercentage = parseFloat((positiveCount / totalSentiment).toFixed(2)) * 100;
    
        const sentimentDistReportChart : MyReportChart = {
            platform: 'Twitter',
            charttype: 'Doughnut',
            charttitle: 'Sentiment Analysis',
            accountName : accoutName,
            report_group: 'Sentiment Analysis',
            labels: ['Positive', 'Negative'],
            values: [positivePercentage, 100 - positivePercentage],
        }

        // Define standard deviation
        let standardDeviation = 2; // Adjust this value as needed

        // Generate a series of 7 data points
        let sentimentTrend = d3.range(7).map(() => {
            let value = d3.randomNormal(positivePercentage, standardDeviation)();
            return Math.round(Math.max(0, Math.min(100, value))); 
        });

        const sentimentTrendReportChart : MyReportChart = {
            platform: 'Twitter',
            charttype: 'Line',
            charttitle: 'Sentiment Trend',
            accountName : accoutName,
            report_group: 'Sentiment Analysis',
            labels: getLastSevenDays(),
            values: sentimentTrend,
        };
        
        
        addReportChart(sentimentDistReportChart);
        addReportChart(sentimentTrendReportChart);
}

export async function getMetaDataOfThatAccount(account_username: string){
    
    if (!account_username) return;

    const posts = await getPostsMadeByThatAccount(account_username);
    
    if (posts === undefined || posts?.total === 0) return;

    let metaData = {
        Views : 0,
        Replies : 0,
        Likes : 0,
        latestLikes : 0,
        dailyAverageLikes : 0,
        likesAverage : 0,
        viewsAverage : 0,
        repliesAverage : 0,
    }

    posts.documents.forEach((post) => {
        metaData.Views += post.views;
        metaData.Replies += post.reply_count;
        metaData.Likes += post.likes;
    });

    metaData.viewsAverage = metaData.Views / posts.documents.length;
    metaData.repliesAverage = metaData.Replies / posts.documents.length;
    metaData.likesAverage = metaData.Likes / posts.documents.length;

    posts.documents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (posts.documents.length > 7) {
        
        const latestPosts = posts.documents.slice(0, 7);

        let totalLikes = 0;

        latestPosts.forEach((post) => {
            totalLikes += post.likes;
        });

        // Calculate the daily average likes
        const dailyAverageLikes = totalLikes / 7;

        console.log('Total likes for the 7 latest posts:', totalLikes);
        console.log('Daily average likes for the 7 latest posts:', dailyAverageLikes);

        metaData.latestLikes = totalLikes;
        metaData.dailyAverageLikes = dailyAverageLikes;
    } else {
        const latestPosts = posts.documents.slice(0, posts.documents.length);

        let totalLikes = 0;

        latestPosts.forEach((post) => {
            totalLikes += post.likes;
        });

        // Calculate the daily average likes
        const dailyAverageLikes = totalLikes / posts.documents.length;

        console.log('Total likes for the 7 latest posts:', totalLikes);
        console.log('Daily average likes for the 7 latest posts:', dailyAverageLikes);

        metaData.latestLikes = totalLikes;
        metaData.dailyAverageLikes = dailyAverageLikes;
    }
    
    
    return metaData;
} 

export async function getSentimentDataOfThatAccount(account_username: string){
    
    if (!account_username) return;

    const posts = await getRepliesToThatAuthor(account_username, 100);
    
    if (posts === undefined || posts?.total === 0) return;

    let positiveCount = 0;
    let negativeCount = 0;
    let totalSentiment = 0;

    posts.documents.forEach((post) => {
        if (post.sentiment === 'positive') {
            positiveCount++;
        } else if (post.sentiment === 'negative') {
            negativeCount++;
        }
    });
    totalSentiment = positiveCount + negativeCount;
    let positivePercentage = parseFloat((positiveCount / totalSentiment).toFixed(2));

    const sentimentData = {
        positivePercentage: positivePercentage,
        negativePercentage: 1 - positivePercentage,
        positiveCount: positiveCount,
        negativeCount: negativeCount,
        totalSentiment: totalSentiment,
    }

    return sentimentData;

}

export async function getSentimentTableDataOfThatAccount(account_username: string){
    
    if (!account_username) return;

    const replies = await getRepliesToThatAuthor(account_username, 100);
    
    if (replies === undefined || replies?.total === 0) return;

    const posts = await getPostsMadeByThatAccount(account_username, 100);

    if (posts === undefined || posts?.total === 0) return;

    const sentimentTableData: MySentimentTableData[] = posts.documents.map(doc => {
        const docReplies = replies.documents.filter(reply => reply.replied_to === doc.post_id);
        const positiveCount = docReplies.filter(reply => reply.sentiment === 'positive').length;
        const overallSentiment = parseFloat(docReplies.length > 0 ? (positiveCount / docReplies.length * 100).toFixed(2) : '0');
        
        const qualitativeSentiment = overallSentiment >= 80 ? 'very positive' :
                                overallSentiment >= 60 ? 'positive' :
                                overallSentiment >= 40 ? 'neutral' :
                                overallSentiment >= 20 ? 'negative' :
                                                         'very negative';
      
        return {
          postId: doc.post_id,
          platform: doc.platform,
          postlink: "https://twitter.com/Ogo4200/status/" + doc.post_id, 
          date: doc.date,
          overall_sentiment: qualitativeSentiment,
          negative_count: docReplies.length - positiveCount,
          positive_count: positiveCount,
        };
    });

    return sentimentTableData;
} 

export async function getSentimentTableOfThatPost(postId: string) {
    if (!postId) return;

    const replies = await getRepliesToThatAuthor(postId, 100);
    
    if (replies === undefined || replies?.total === 0) return;

    const sentimentTableData: MySentimentTableData[] = replies.documents.map(doc => {
        const positiveCount = doc.sentiment === 'positive' ? 1 : 0;
        const overallSentiment = parseFloat(positiveCount / 1 * 100 + '');
        
        
        if (positiveCount === 0) {
            const qualitativeSentiment = 'neutral';

            return {
                postId: doc.post_id,
                platform: doc.platform,
                postlink: "https://twitter.com/Ogo4200/status/" + doc.post_id, 
                date: doc.date,
                overall_sentiment: qualitativeSentiment,
                negative_count: doc.sentiment === 'positive' ? 0 : 1,
                positive_count: positiveCount,
              };
        } else {
            const qualitativeSentiment = overallSentiment >= 80 ? 'very positive' :
                                overallSentiment >= 60 ? 'positive' :
                                overallSentiment >= 40 ? 'neutral' :
                                overallSentiment >= 20 ? 'negative' :
                                                         'very negative';
            return {
            postId: doc.post_id,
            platform: doc.platform,
            postlink: "https://twitter.com/Ogo4200/status/" + doc.post_id, 
            date: doc.date,
            overall_sentiment: qualitativeSentiment,
            negative_count: doc.sentiment === 'positive' ? 0 : 1,
            positive_count: positiveCount,
            };
        }
        
      
        
    });
    

    return sentimentTableData;

}

export async function getEmotionDataOfThatAccont(account_username: string){
    if (!account_username) return;

    const replies = await getRepliesToThatAuthor(account_username, 200);
    
    if (replies === undefined || replies?.total === 0) return;

    const emotionCounts = replies.documents.reduce((acc: {[key: string]: number}, doc) => {
        const emotion = doc.emotion;
        acc[emotion] = (acc[emotion] || 0) + 1;
        return acc;
    }, {});
    
    const sentimentCounts = replies.documents.reduce((acc: {[key: string]: number}, doc) => {
        const sentiment = doc.sentiment;
        acc[sentiment] = (acc[sentiment] || 0) + 1;
        return acc;
    }, {});
    
    const emotionData : MyEmotionData = {
        anger: emotionCounts.anger ?? 0,
        fear: emotionCounts.fear ?? 0,
        joy: emotionCounts.joy ?? 0,
        sadness: emotionCounts.sadness ?? 0,
        love: emotionCounts.love ?? 0,
        surprise: emotionCounts.surprise ?? 0,
        positiveCount: sentimentCounts.positive ?? 0,
        negativeCount: sentimentCounts.negative ?? 0,
    }

    return emotionData;
}

export async function getTheSentimentDistributionOfThatAccount(account_username: string){
    if (!account_username) return;

    const sentimentData = await getSentimentDataOfThatAccount(account_username);

    if (sentimentData === undefined) return;

    const country_code = [
            "BN", "ID", "KH", "LA", "MM", "BU", "MY", "PH", "SG", "TH", "TL", "TP", "VN",
            "AF", "BD", "BT", "IN", "IR", "LK", "MV", "NP", "PK",
            "CN", "HK", "JP", "KP", "KR", "MN", "MO", "TW",
            "TM", "TJ", "KG", "KZ", "UZ",
            "AU", "NF", "NZ",
            "GG", "JE", "AX", "DK", "EE", "FI", "FO", "GB", "IE", "IM", "IS", "LT", "LV", "NO", "SE", "SJ",
            "AT", "BE", "CH", "DE", "DD", "FR", "FX", "LI", "LU", "MC", "NL",
            "BG", "BY", "CZ", "HU", "MD", "PL", "RO", "RU", "SU", "SK", "UA",
            "BM", "CA", "GL", "PM", "US", "MX", 
            "AR", "BO", "BR", "CL", "CO", "EC", "FK", "GF", "GY", "PE", "PY", "SR", "UY", "VE"
        ]
    
    const data = country_code.map(country => {
        const sentiment = Math.random() * sentimentData.positivePercentage * 100;
        return [country, parseFloat(sentiment.toFixed(2))];
    }) as CountrySentiment[];

    data.unshift(['Country', 'Sentiment']);

    return data;
}