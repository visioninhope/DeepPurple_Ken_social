import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { MySentimentTableData } from '../../types';

interface SentimentTableData {
    sentimentTableData: MySentimentTableData[],
}

export default function SentimentIndividualPostTable({ sentimentTableData }: SentimentTableData) {
    function createData(
        postId: string,
        platform: string,
        postlink: string,
        date: string,
        overall_sentiment: string,
        negative_count: number,
        positive_count: number,
    ) {
        return { postId, postlink, date, platform, overall_sentiment, negative_count, positive_count };
    }

    const [rows, setRows] = React.useState<MySentimentTableData[]>([]);

    React.useEffect(() => {

        const tempRows = sentimentTableData.map((data: MySentimentTableData) => {
            return createData(
                data.postId,
                data.platform,
                data.postlink,
                data.date,
                data.overall_sentiment,
                data.negative_count,
                data.positive_count,
            );
        });
        setRows(tempRows);
    }, [sentimentTableData]);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="right">Platform</TableCell>
                        <TableCell align="center">Link</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Sentiment</TableCell>
                        <TableCell align="right">
                            <p>Positive</p>
                            <p>Emotions</p>
                        </TableCell>
                        <TableCell align="right">
                            <p>Negative</p>
                            <p>Emotions</p>
                        </TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.postId}
                            </TableCell>
                            <TableCell align="center">{row.platform}</TableCell>
                            <TableCell align="right" style={{ maxWidth: '150px', wordWrap: 'break-word' }}>
                                <p className='max-w-[100px]'>{row.postlink}</p>
                            </TableCell>
                            <TableCell align="right">{row.date}</TableCell>
                            <TableCell align="right">{row.overall_sentiment}</TableCell>
                            <TableCell align="right">{row.positive_count}</TableCell>
                            <TableCell align="right">{row.negative_count}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

