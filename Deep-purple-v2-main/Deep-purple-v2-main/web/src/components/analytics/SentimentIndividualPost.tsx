import { Button, IconButton, TextField } from "@mui/material";
import { NavLink } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from "@mui/icons-material/Search";
import SentimentIndividualPostTable from "./SentimentIndividualPostTable";
import { useEffect, useState } from "react";
import { getSentimentTableDataOfThatAccount } from "../../services";
import { MySentimentTableData } from "../../types";

interface SentimentIndividualPostProps {
    username: string,
}

export default function SentimentIndividualPost({ username }: SentimentIndividualPostProps) {

    const [accountName, setAccountName] = useState(username);
    const [sentimentTableData, setSentimentTableData] = useState<MySentimentTableData[]>([]);
    async function getTableData() {
        const tabledata: MySentimentTableData[] = await getSentimentTableDataOfThatAccount(username) || [];
        setSentimentTableData(tabledata);
    }

    useEffect(() => {
        setAccountName(username);
        console.log(accountName);
        getTableData();
    }, [username])

    return (
        <section className="flex flex-col gap-5 pt-10 px-5">
            <div className="flex flex-row justify-between items-center">
                <p className="font-bold text-3xl  ">Last 7 days</p>
                <NavLink to={"/analytics/sentiment/"}>
                    <Button variant="contained" style={{ backgroundColor: "#877EFF" }}>
                        <ArrowBackIcon /> Overall Sentiment
                    </Button>
                </NavLink>

            </div>

            <div className="mt-10">
                <SentimentIndividualPostTable sentimentTableData={sentimentTableData} />
            </div>

        </section>
    )
}
