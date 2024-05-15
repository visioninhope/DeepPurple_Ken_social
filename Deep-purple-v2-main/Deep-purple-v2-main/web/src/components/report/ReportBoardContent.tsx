import ReportDoughnut from "../ui/ReportDoughnut";
import { useEffect, useState } from "react";
import { deleteReportFromDatabase, getAllReportCharts } from "../../api/appwrite/api";
import { MyReportChart } from "../../types";
import TwitterIcon from '@mui/icons-material/Twitter';
import ReportLineChart from "./ReportLineChart";
import ReportColumnChart from "./ReportColumnChart";
import ReportStackerBar from "./ReportStackerBar";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button } from "@mui/material";

interface ReportBoardContentProps {
    comparison_reports: MyReportChart[];
}


export default function ReportBoardContent({ comparison_reports }: ReportBoardContentProps) {

    const [reports, setReports] = useState<MyReportChart[]>();

    async function AllReports() {
        const reports = await getAllReportCharts();

        if (!reports) {
            return undefined;
        }
        return reports.documents;
    }

    async function deleteReport(accountName: string, charttitle: string) {
        await deleteReportFromDatabase(accountName, charttitle);
        setReports(reports?.filter(report => report.accountName !== accountName || report.charttitle !== charttitle));
    }

    useEffect(() => {
        const fetchReports = async () => {
            if (comparison_reports === undefined || comparison_reports.length === 0) {


                const reports = await AllReports();

                if (reports !== undefined) {
                    const chartsdata: MyReportChart[] = reports.map((report) => {
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
                    });
                    setReports(chartsdata);


                }
            } else {
                setReports(comparison_reports);
            }
        }
        fetchReports();
    }, [comparison_reports]);
    return (
        <section className="my-10 flex flex-col items-center h-report-space overflow-y-scroll">
            {/* <div className="py-5">
                <img src="/src/assets/icons/EmptyReportBoardIcon.svg" alt="emptyPage"
                    className="invert-white" />
            </div>
            <div className="flex flex-col gap-5 items-center justify-center">
                <p className="font-bold text-md">Please select the reports you want to compare</p>
                <p className="ml-5 px-5 text-sm max-w-sm">
                    Compare the reports to get insight on your content performance and new ideas for your content strategy.
                </p>
            </div> */}
            <div className="flex flex-row flex-wrap gap-10 justify-center items-center">

                {reports?.map((report, index) => {
                    return (
                        <div className="flex flex-col bg-light-1 py-3 px-3 rounded-md
                        justify-center " key={index}>
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row gap-2">
                                    <div className="bg-twitter-blue p-3 rounded-full text-light-1">
                                        <TwitterIcon />
                                    </div>
                                    <div>

                                        <p className="font-bold text-dark-1 text-xl">{report.charttitle}</p>
                                        <p className="text-sm text-dark-1">@{report.accountName}</p>
                                    </div>
                                </div>
                                <Button className=" text-twitter-blue" onClick={() => deleteReport(report.accountName, report.charttitle)}>
                                    <DeleteForeverIcon />
                                </Button>
                            </div>


                            {(() => {
                                switch (report.charttype) {
                                    case 'Doughnut':
                                        return <ReportDoughnut values={report.values} labels={report.labels} />
                                    case 'Line':
                                        return <ReportLineChart values={report.values} labels={report.labels} />;
                                    case 'Column':
                                        return <ReportColumnChart values={report.values} labels={report.labels} />;
                                    case 'StackedBar':
                                        return <ReportStackerBar values={report.values} labels={report.labels} />;
                                }
                            })()}

                        </div>
                    )
                })}
            </div>
        </section>
    )
}

