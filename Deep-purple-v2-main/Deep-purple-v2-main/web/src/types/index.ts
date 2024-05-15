export type IResolveParams = {
    provider : string,
    data : string,
}

export type MyNavLink = {
    imgURL: string,
    route: string,
    label: string,
}

export type Tweet = {
    tweet: string,
}

export type TweetData = {
    tweet: string,
    sentiment: string,
    emotion: emotion[],
    date: string,
}

export type emotion = {
    label: string,
    value: number,
}

export type MyChartData = {
    labels: string[],
    datasets: MyChartDataset[],
}

export type MyChartDataset = {
    label: string,
    data: number[],
    fill?: boolean,
    backgroundColor: string[],
    borderColor: string,
    borderWidth: number,
    yAxisID?: string,
}

export type socialMediaAccount = {
    account_username : string,
    platform : string,
    useremail : string,
    socialmedia_feeds : string[],
}

export type userFeed = {
    name : string,
    username : string,
    tweets : userFeedData[],
}

export type userFeedData = {
    date : string,
    likes : string,
    views : string,
    reply_count : string,
    replies : userFeedReplies[],
    tweet : string,
    "tweet-id" : string,
}

export type userFeedReplies = {
    author : string,
    comment : string,
}

export type MyUserReplies = {
    author : string,
    reply_text : string,
    replied_to : string,
    author_replied_to: string,
    sentiment : string,
    emotion : string,
}

export type socialMediaStream = {
    socialMedia: string,
    socialmedia_username: string,
    streamName: string,
}

export type MyReportChart = {
    platform: string,
    charttype: string,
    charttitle: string,
    accountName : string,
    report_group: string,
    labels: string[],
    values: number[],
}

export type MyReportChartGroups = {
    accountName : string,
    report_group: string,
}
export type MySocialMediaFeed = {
    platform : string,
    account_username : string,
    post_id : string,
    post_text : string,
    date : string,
    views : number,
    likes : number,
    reply_count : number,  
    replies : string[],
}

export type MyStreamMetaData = {
    Likes : number,
    Views : number,
    Replies : number,
}

export type MyMetaData = {
    Likes : number,
    Views : number,
    Replies : number,
    latestLikes : number,
    dailyAverageLikes : number,
    likesAverage : number,
    viewsAverage : number,
    repliesAverage : number,
}

export type MySentimentData = {
    positivePercentage: number,
    negativePercentage: number,
    positiveCount: number,
    negativeCount: number,
    totalSentiment: number,
}

export type MyEmotionData = {
    anger: number,
    fear: number,
    joy: number,
    sadness: number,
    love: number,
    surprise: number,
    positiveCount: number,
    negativeCount: number,
}

export type MySentimentTableData = {
    postId: string,
    platform: string,
    postlink: string,
    date: string,
    overall_sentiment: string,
    negative_count: number,
    positive_count: number,
}

export type MyUserProfile = {
    username: string,
    FirstName: string,
    LastName: string,
    Age: number,
    Role: string,
    Occupation: string,
    Email: string,
}

export type SubscriptionData = {
    id: string,
    popular: boolean, 
    description?: string,
    name: string, 
    price: number, 
    info?: string, 
    features?: string[]  
}

export type MyReports =  {
    report_date : string,
    report_by_name : string,
    report_text : string,
}

export type CountrySentiment = [string, number|string];