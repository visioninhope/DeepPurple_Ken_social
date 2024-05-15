import { useEffect, useState } from "react";
import { MyReports, MyUserReplies } from "../types";
import { getAllBugReports, getRepliesToThatAuthor } from "../api/appwrite/api";
import BugReportLeftSideBar from "../components/bugreports/BugReportLeftSideBar";
import BugReportTopBar from "../components/bugreports/BugReportTopBar";
import BugReportContent from "../components/bugreports/BugReportContent";

export default function BugReportPage() {

    const [accountName, setAccountName] = useState<string>("");
    const [bugReports, setBugReports] = useState<MyReports[]>([]);

    function handleUsernameChange(value: string) {
        setAccountName(value);
    }

    async function getReports() {
        const bugReports = await getAllBugReports();

        if (bugReports === undefined) return;

        const reports = bugReports.documents.map((report) => ({
            report_text: report.report_text,
            report_date: report.report_date,
            report_by_name: report.report_by_name,
        }));

        return reports;
    }

    useEffect(() => {
        const fetchReplies = async () => {
            const reports = await getReports();
            if (reports === undefined) return;
            setBugReports(reports);
        }
        fetchReplies();

    }, [accountName]);

    return (
        <section className="flex flex-row min-h-screen">

            <div className="flex flex-col w-full">
                <div className="border-b-2 ">
                    <BugReportTopBar onUsernameChange={handleUsernameChange} />
                </div>
                <div className="m-5">
                    <BugReportContent replies={bugReports} />
                </div>
            </div>
        </section>
    )
}