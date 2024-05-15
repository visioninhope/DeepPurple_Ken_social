import { useParams } from "react-router-dom";
import ReportBoardContent from "../components/report/ReportBoardContent"
import ReportBoardLeftSideBar from "../components/report/ReportBoardLeftSideBar"
import ReportBoardTopSideBar from "../components/report/ReportBoardTopSideBar"
import { useEffect, useState } from "react";
import { MyReportChart } from "../types";
import { getReportChartsByAccountNameAndReportGroup } from "../api/appwrite/api";

export default function ReportsBoard() {

    const { sub_page } = useParams<{ sub_page: string }>();

    const [firstReports, setFirstReports] = useState<MyReportChart[]>([]);
    const [secondReports, setSecondReports] = useState<MyReportChart[]>([]);
    const [reports, setReports] = useState<MyReportChart[]>([]);

    async function getSelectReport(groupname: string) {
        const [accountName, reportGroup] = groupname.split(" : ");
        const reports = await getReportChartsByAccountNameAndReportGroup(accountName, reportGroup);
        return reports?.documents;
    }

    async function handleFirstSelectReport(groupname: string) {

        if (groupname === "") {
            setFirstReports([]);
            return;
        }

        const firstreports = await getSelectReport(groupname);

        if (firstreports === undefined) {
            return;
        }

        const reports: MyReportChart[] = firstreports.map((report) => {
            const data: MyReportChart = {
                platform: report.platform,
                charttype: report.charttype,
                charttitle: report.charttitle,
                accountName: report.accountName,
                report_group: report.report_group,
                labels: report.labels,
                values: report.values,
            }
            return data;
        })

        setFirstReports(reports);
    }

    async function handleSecondSelectReport(groupname: string) {

        if (groupname === "") {
            setSecondReports([]);
            return;
        }

        const secondReports = await getSelectReport(groupname);

        if (secondReports === undefined) {
            return;
        }

        const reports: MyReportChart[] = secondReports.map((report) => {
            const data: MyReportChart = {
                platform: report.platform,
                charttype: report.charttype,
                charttitle: report.charttitle,
                accountName: report.accountName,
                report_group: report.report_group,
                labels: report.labels,
                values: report.values,
            }
            return data;
        })

        setSecondReports(reports);
    }

    useEffect(() => {
        const combineReports = () => {
            if (firstReports && secondReports) {
                const combinedReports = [...firstReports, ...secondReports];
                setReports(combinedReports);
            }
        };
        combineReports();

    }, [sub_page, firstReports, secondReports])
    return (
        <section className="flex flex-row h-screen">
            <ReportBoardLeftSideBar />
            <div className="w-full">
                <ReportBoardTopSideBar title={sub_page?.toUpperCase() || 'Report'} handleFirstSelectReportFunction={handleFirstSelectReport}
                    handleSecondSelectReportFunction={handleSecondSelectReport} />
                {(() => {
                    switch (sub_page) {
                        case 'all-report':
                            return <ReportBoardContent comparison_reports={reports ?? []} />;
                        default:
                            return <ReportBoardContent comparison_reports={reports ?? []} />;
                    }
                })()}
            </div>
        </section>
    )
}

