import { ID, Query } from "appwrite";

import { appwriteConfig, databases } from "./config";
import { MyReportChart, MyReportChartGroups, MySocialMediaFeed, MyUserProfile, MyUserReplies, userFeedReplies} from "../../types";

export async function saveStreamDashboardToDB (dashboard : {
    useremail : string,
    dashboard : string,
    stream : string
}) {
    try { 
        const newDashboard = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.dashboardCollectionId,
            ID.unique(),
            dashboard
        );

        return newDashboard;
    }
    catch (error) {
        console.log(error);
    }
}

export async function getUserStreamDashboards (email? : string) {
    if (!email) return;
    try {
        const dashboard = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.dashboardCollectionId,
            [Query.equal("useremail", email)]
        );
        if (!dashboard) throw Error;

        return dashboard;
    }
    catch (error) {
        console.log(error);
    }
}

export async function getStreamDashboardIDFromDB (dashboardName? : string) {
    if (!dashboardName) return;

    const dashboard = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.dashboardCollectionId,
        [Query.equal("dashboard", dashboardName)],
    );

    if (!dashboard) throw Error;

    return dashboard.documents[0].$id;
}

export async function deleteStreamDashboardFromDB (dashboardName? : string) {
    if (!dashboardName) return;

    const dashboard_id = await getStreamDashboardIDFromDB(dashboardName);

    if (!dashboard_id) return;

    try {
        const statusCode = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.dashboardCollectionId,
            dashboard_id
        );

        if (!statusCode) throw Error;

        return { status : "Ok" };
    } catch (error) { 
        console.log(error);
    }
}

export async function saveStreamToDB (stream : {
    socialMedia : string,
    socialmedia_username : string,
    streamName : string,
}) {
    try {
        const newStream = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.streamCollectionId,
            ID.unique(),
            stream
        );

        return newStream;
    } catch (error) {
        console.log(error);
    }
}

export async function getStreamFromDB(streamName? : string) {
    console.log(streamName);
    if (!streamName) return;

    try {
        const stream = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.streamCollectionId,
            [Query.equal("streamName", streamName)]
        );

        if (!stream) throw Error;

        return stream;
    } catch (error) {
        console.log(error);
    }
}

export async function getStreamFromDBUsingUseremailAndDashBoadName (useremail? : string, dashboardName? : string) {
    if (!useremail || !dashboardName) return;

    try {
        const dashboard = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.dashboardCollectionId,
            [Query.equal("useremail", useremail), Query.equal("dashboard", dashboardName)]
        );

        if (!dashboard) throw Error;
        

        const stream = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.dashboardCollectionId,
            [Query.equal("stream", dashboard.documents[0].stream)]
        );

        if (!stream) throw Error;
        console.log(stream);
        return stream;
    }
    catch (error) {
        console.log(error);
    }
}

export async function updateDashboardStream (useremail? : string, dashboardname? : string, stream? : string) {
    if (!useremail || !dashboardname || !stream) return;

    try {
        const dashboard = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.dashboardCollectionId,
            [Query.equal("useremail", useremail), Query.equal("dashboard", dashboardname)]
        );
        
        if (!dashboard) throw Error;

        const dashboard_id = dashboard.documents[0].$id;

        if (!dashboard_id) throw Error;

        const response = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.dashboardCollectionId,
            dashboard_id,
            {
                stream : stream
            }
        );

        if (!response) throw Error;

        return response;
    }
    catch (error) {
        console.log(error);
    }

}

export async function saveSocialMediaAccounts(account:{
    account_username : string,
    platform : string,
    useremail : string,
    socialmedia_feeds : string [],
}) {
    try {
        const newAccount = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userSocialMediaCollectionId,
            ID.unique(),
            account
        );

        return newAccount;
    } catch (error) {
        console.log(error);
    }
}

export async function getSocialMediaAccounts(useremail? : string) {
    if (!useremail) return;

    try {
        const accounts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userSocialMediaCollectionId,
            [Query.equal("useremail", useremail)]
        );

        if (!accounts) throw Error;

        return accounts;
    }
    catch (error) {
        console.log(error);
    }
}

export async function saveSocialMediaFeed(feed : MySocialMediaFeed) {

    const response = await getSocialMediaFeedById(feed.post_id);

    if (response === undefined || response.documents.length > 0) return;
   
    try {
        const newFeed = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.socialMediaFeedsCollectionId,
            ID.unique(),
            feed
        );

        return newFeed;
    } catch (error) {
        console.log(error);
    }
}

export async function getSocialMediaFeedById (id?: string){
    if (!id) return;
    try {
        const feed = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.socialMediaFeedsCollectionId,
            [Query.equal("post_id", id)]
        );

        if (!feed) throw Error;

        return feed;
    }
    catch (error) {
        console.log(error);
    }
}

export async function getSocialMediaFeedsByPlatformAndUsername (platform? : string, username? : string) {
    if (!platform || !username) return;
    try {
        const feeds = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.socialMediaFeedsCollectionId,
            [Query.equal("platform", platform), Query.equal("account_username", username)]
        );

        if (!feeds) throw Error;

        return feeds;
    }
    catch (error) {
        console.log(error);
    }

}

export async function saveSocialMediaFeedReply(feedReply : MyUserReplies) {
    try {
        const newFeedReply = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.socialMediaFeedsRepliesCollectionId,
            ID.unique(),
            feedReply
        );

        return newFeedReply;
    } catch (error) {
        console.log(error);
    }
}

export async function getPostsMadeByThatAccount(account_username? : string, limit: number = 25) {
    if (!account_username) return;

    try {
        const feeds = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.socialMediaFeedsCollectionId,
            [Query.equal("account_username", account_username), Query.limit(limit)]
        );

        if (!feeds) throw Error;
       
        return feeds;
    }
    catch (error) {
        console.log(error);
    }

}

export async function getRepliesOfThatPost(postId? : string){

    if (!postId) return;

    try {
        const replies = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.socialMediaFeedsRepliesCollectionId,
            [Query.equal("replied_to", postId)]
        );

        if (!replies) throw Error;

        return replies;
    }
    catch (error) {
        console.log(error);
    }
}

export async function getRepliesToThatAuthor(author? : string, limit : number = 25) {
    if (!author) return;

    try {
        const replies = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.socialMediaFeedsRepliesCollectionId,
            [Query.equal("author_replied_to", author), Query.limit(limit)],
            
        );

        if (!replies) throw Error;
        
        
        return replies;
    }
    catch (error) {
        console.log(error);
    }
}

export async function updateSentiment (id? : string, sentiment? : string) {
    if (!id || !sentiment) return;

    try {
        const response = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.socialMediaFeedsRepliesCollectionId,
            id,
            {
                sentiment : sentiment
            }
        );

        if (!response) throw Error;

        return response;
    }
    catch (error) {
        console.log(error);
    }
}

export async function updateEmotion (id? : string, emotion? : string) {
    if (!id || !emotion) return;

    try {
        const response = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.socialMediaFeedsRepliesCollectionId,
            id,
            {
                emotion : emotion
            }
        );

        if (!response) throw Error;

        return response;
    }
    catch (error) {
        console.log(error);
    }

}

export async function addReportChart(chart : MyReportChart) {
    try {
        const newChart = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.reportChartCollectionId,
            ID.unique(),
            chart
        );

        return newChart;
    }
    catch (error) {
        console.log(error);
    }

}

export async function getAllReportCharts() {
    try {
        const charts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.reportChartCollectionId,
        );

        if (!charts) throw Error;

        return charts;
    }
    catch (error) {
        console.log(error);
    }
}

export async function getUserReportsChartsGroup () {
    try {
        const response = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.reportChartCollectionId,
        );

        if (!response) throw Error;

        const result: MyReportChartGroups[] = [];
        const tempResult: { [key: string]: Set<string> } = {};

        response.documents.forEach((doc) => {
            const accountName = doc.accountName;
            const reportGroup = doc.report_group;

            if (!tempResult[accountName]) {
                tempResult[accountName] = new Set();
            }

            tempResult[accountName].add(reportGroup);
        });

        for (const accountName in tempResult) {
            tempResult[accountName].forEach((reportGroup) => {
                result.push({ accountName, report_group: reportGroup });
            });
        }
        return result;
    }
    catch (error) {
        console.log(error);
    }
}

export async function getReportChartsByAccountNameAndReportGroup (accountName? : string, reportGroup? : string) {
    if (!accountName || !reportGroup) return;

    try {
        const charts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.reportChartCollectionId,
            [Query.equal("accountName", accountName), Query.equal("report_group", reportGroup)]
        );

        if (!charts) throw Error;

        return charts;
    }
    catch (error) {
        console.log(error);
    }
}

export async function deleteReportFromDatabase (accoutName? : string , charttitle? : string) {
    if (!accoutName || !charttitle) return;

    try {
        const documents = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.reportChartCollectionId,
            [Query.equal("accountName", accoutName), Query.equal("charttitle", charttitle)]
        );

        if (documents.total === 0) {
            throw new Error('No document found');
        }

        const documentId = documents.documents[0].$id;

        const response = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.reportChartCollectionId,
            documentId
        );

        if (!response) throw Error;

        return response;
    }
    catch (error) {
        console.log(error);
    }

}

export async function saveProfile(profile : MyUserProfile){
    if (!profile || !profile.username) return;

    try {
        const newProfile = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userProfilesCollectionId,
            ID.unique(),
            profile
        );

        return newProfile;
    }
    catch (error) {
        console.log(error);
    }
}

export async function getAllProfile() {
    try {
        const profiles = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userProfilesCollectionId,
        );

        if (!profiles) throw Error;
        
        return profiles;
    }
    catch (error) {
        console.log(error);
    }
}

export async function getProfileByUsername(username? : string) {
    if (!username) return;

    try {
        const profile = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userProfilesCollectionId,
            [Query.equal("username", username)]
        );

        if (!profile) throw Error;
        
        return profile;
    }
    catch (error) {
        console.log(error);
    }

}

export async function deleteProfileByUsername(username? : string) {
    if (!username) return;

    try {
        const documents = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userProfilesCollectionId,
            [Query.equal("username", username)]
        );

        if (documents.total === 0) {
            throw new Error('No document found');
        }

        const documentId = documents.documents[0].$id;

        const response = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userProfilesCollectionId,
            documentId
        );

        if (!response) throw Error;

        return response;
    }
    catch (error) {
        console.log(error);
    }
}

export async function updateProfileByUsername(username? : string, profile? : MyUserProfile) {
    if (!username || !profile) return;
    console.log(profile);
    try {
        const documents = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userProfilesCollectionId,
            [Query.equal("username", username)]
        );

        if (documents.total === 0) {
            throw new Error('No document found');
        }

        const documentId = documents.documents[0].$id;

        const response = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userProfilesCollectionId,
            documentId,
            profile
        );

        if (!response) throw Error;

        return response;
    }
    catch (error) {
        console.log(error);
    }
}

export async function getAllBugReports(){
    try {
        const reports = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.bugreportsCollectionId,
        );

        if (!reports) throw Error;

        return reports;
    }
    catch (error) {
        console.log(error);
    }
}

export async function getClosedBugReports(){
    try {
        const documents = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.bugreportsCollectionId,
            [Query.equal("status", "closed")]
        );

        if (!documents) throw Error;

        return documents;
    }
    catch (error) {
        console.log(error);
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateBugReport(bugId: string, report : any) {
    try {
        const newReport = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.bugreportsCollectionId,
            bugId,
            report
        );

        return newReport;
    }
    catch (error) {
        console.log(error);
    }

}


export async function getAllBillings(){
    try {
        const reports = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.billingsCollectionId,
        );

        if (!reports) throw Error;

        return reports;
    }
    catch (error) {
        console.log(error);
    }
}


export async function getAllActivePlans(){
    try {
        const documents = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.subscriptionPlanCollectionId,
            [Query.equal("isActive", true)]
        );

        if (!documents) throw Error;

        return documents;
    }
    catch (error) {
        console.log(error);
    }
}
export async function getAllSuspendedPlans(){
    try {
        const documents = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.subscriptionPlanCollectionId,
            [Query.equal("isActive", false)]
        );

        if (!documents) throw Error;

        return documents;
    }
    catch (error) {
        console.log(error);
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function addSubPlan(plan : any) {
    try {
        const newPlan = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.subscriptionPlanCollectionId,
            ID.unique(),
            plan
        );

        return newPlan;
    }
    catch (error) {
        console.log(error);
    }

}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateSubPlan(planId: string, plan : any) {
    try {
        const newPlan = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.subscriptionPlanCollectionId,
            planId,
            plan
        );

        return newPlan;
    }
    catch (error) {
        console.log(error);
    }

}

export async function subspendSubPlan (subplanId : string) {
    
    try {
        await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.subscriptionPlanCollectionId,
            subplanId,
            {
                isActive: false
            }
        );

        return { status : "Ok" };
    } catch (error) { 
        console.log(error);
    }
}

export async function getAllActiveUsers(){
    try {
        const documents = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userAccountCollectionId,
            [Query.equal("isActive", true)]
        );

        if (!documents) throw Error;

        return documents;
    }
    catch (error) {
        console.log(error);
    }
}

export async function getAllSuspendedUsers(){
    try {
        const documents = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userAccountCollectionId,
            [Query.equal("isActive", false)]
        );

        if (!documents) throw Error;

        return documents;
    }
    catch (error) {
        console.log(error);
    }
}

export async function subspendUser(userId : string) {
    
    try {
        await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userAccountCollectionId,
            userId,
            {
                isActive: false
            }
        );

        return { status : "Ok" };
    } catch (error) { 
        console.log(error);
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function addUserAccount(user : any) {
    try {
        const newPlan = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userAccountCollectionId,
            ID.unique(),
            user
        );

        return newPlan;
    }
    catch (error) {
        console.log(error);
    }

}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateUserAccount(userId: string, user : any) {
    try {
        const newUserAccount = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userAccountCollectionId,
            userId,
            user
        );

        return newUserAccount;
    }
    catch (error) {
        console.log(error);
    }

}

export async function getAccountDetailsByUsername(username : string){
    try {
        const documents = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userAccountCollectionId,
            [Query.equal("name", username)]
        );

        if (!documents) throw Error;

        return documents;
    }
    catch (error) {
        console.log(error);
    }
}
