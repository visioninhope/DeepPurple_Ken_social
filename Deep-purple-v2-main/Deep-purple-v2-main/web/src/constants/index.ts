import analytics from "../assets/icons/analytics.svg";
import report from "../assets/icons/report.svg";
import feedback from "../assets/icons/feedback.png";
import inbox from "../assets/icons/inbox.svg";
import stream from "../assets/icons/stream.svg";
import invoice from "../assets/icons/invoice.svg";
import subscription from "../assets/icons/subscription.svg";
import usermanagement from "../assets/icons/usermanagement.svg";
import bugreport from "../assets/icons/bugReport.svg";
import heart from "../assets/icons/heart.svg";
import world from "../assets/icons/world.svg";
import like from "../assets/icons/like.svg";


export const sidebarLinks = [
    {
        imgURL: stream,
        route: "/",
        label: "Stream",
    },
    {
        imgURL: analytics,
        route: "/analytics/sentiment",
        label: "Analytics",
    },
    {
        imgURL: report,
        route: "/report/all-report",
        label: "Report",
    },
    {
        imgURL: inbox,
        route: "/inbox",
        label: "Inbox"
    },
    // {
    //     imgURL: subscription,
    //     route: "/subscription",
    //     label: "Subscription"
    // },
    
    {
        imgURL: invoice,
        route: "/invoices",
        label: "Billing invoices",
    },
    {
        imgURL: usermanagement,
        route: "/user/",
        label: "User accounts",

    },
    {
        imgURL: bugreport,
        route: "/bug_report",
        label: "Bug Reports",
    },
    {
        imgURL : subscription,
        route : "/subscription_plan/",
        label : "Subcription plans",
    },
]

export const analyticsBoardLinks = [
    {
        imgURL: feedback,
        route: "/analytics/sentiment",
        label: "Sentiment analysis",
    },
    {
        imgURL: heart,
        route: "/analytics/emotion",
        label: "Emotion Analysis",
    },
    {
        imgURL: like,
        route: "/analytics/metadata",
        label: "Metadata analysis",
    },
    {
        imgURL: world,
        route: "/analytics/userdata",
        label: "User data analysis",
    },

]