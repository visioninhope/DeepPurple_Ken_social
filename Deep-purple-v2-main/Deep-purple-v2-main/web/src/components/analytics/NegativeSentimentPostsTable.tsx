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

function createData(
    postId: string,
    negative_scale: string,
    platform: string,
    date: string,
) {
    return { postId, negative_scale, platform, date };
}

const rows = [
    createData('123456', 'very negative', 'Twitter', '2021-10-10'),
    createData('123456', 'very negative', 'Twitter', '2021-10-13'),
    createData('123456', 'negative', 'Twitter', '2021-10-11'),

];

export default function NegativeSentimentPostsTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Negative Scale</TableCell>
                        <TableCell align="right">Platform</TableCell>
                        <TableCell align="right">Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.postId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.postId}
                            </TableCell>
                            <TableCell align="right">{row.negative_scale}</TableCell>
                            <TableCell align="right">{row.platform}</TableCell>
                            <TableCell align="right">{row.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}