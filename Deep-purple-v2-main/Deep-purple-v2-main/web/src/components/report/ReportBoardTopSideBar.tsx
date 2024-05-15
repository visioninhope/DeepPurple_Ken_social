import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { NavLink } from 'react-router-dom';
import ReportBoardTopBarSelectDropDown from '../ui/ReportBoardTopBarSelectDropDown';
import { MyReportChartGroups } from '../../types';
import { useEffect, useState } from 'react';
import { getUserReportsChartsGroup } from '../../api/appwrite/api';
import SignOutButton from '../ui/SignOutButton';

interface ReportBoardTopSideBarProps {
    title: string,
    handleFirstSelectReportFunction: (groupname: string) => void,
    handleSecondSelectReportFunction: (groupname: string) => void,
}

export default function ReportBoardTopSideBar({ title, handleFirstSelectReportFunction, handleSecondSelectReportFunction }: ReportBoardTopSideBarProps) {

    const [reportGroups, setReportGroups] = useState<MyReportChartGroups[]>();

    async function getAllReportGroups() {
        const reportGroups = await getUserReportsChartsGroup();

        if (!reportGroups) {
            return undefined;
        }
        return reportGroups;
    }

    function HandleFirstSelectChangeFunction(groupname: string) {
        handleFirstSelectReportFunction(groupname);
    }

    function HandleSecondSelectChangeFunction(groupname: string) {
        handleSecondSelectReportFunction(groupname);
    }

    useEffect(() => {

        const fetchReports = async () => {

            const reportGroups = await getAllReportGroups();

            if (reportGroups === undefined) {
                return;
            }


            setReportGroups(reportGroups);

        }
        fetchReports();

    }, [])

    return (
        <section className='flex flex-col py-5 border-b-2 px-10'>
            <div className='flex flex-row items-center justify-between'>
                <div className='px-5 flex flex-row gap-5 items-center'>
                    <NavLink className='px-2 py-2 rounded-full base-medium bg-primary-500' to='/report'>
                        <ArrowBackIosNewIcon />
                    </NavLink>
                    <p className='text-xl font-bold'>{title}</p>
                </div>
                <div>
                    <SignOutButton />
                </div>
            </div>
            <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row gap-12 items-center justify-center pl-48'>
                    <p className='font-bold text-lg'>Compare</p>
                    <div>
                        <ReportBoardTopBarSelectDropDown Menuitems={reportGroups} HandleSelectChangeFunction={HandleFirstSelectChangeFunction} />
                    </div>
                    <p>
                        with
                    </p>
                    <div>
                        <ReportBoardTopBarSelectDropDown Menuitems={reportGroups} HandleSelectChangeFunction={HandleSecondSelectChangeFunction} />
                    </div>
                </div>
            </div>
        </section>
    )
}