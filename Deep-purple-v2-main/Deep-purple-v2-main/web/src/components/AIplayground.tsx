import { Button, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { axiosInstance } from '../api/axios/config'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

type sentimentdata = {
    label: string,
    score: number
}


const AIplayground = () => {

    const [text, setText] = useState('');
    const [analysisData, setAnalysisData] = useState<sentimentdata[]>([]);

    async function getSentiment() {
        const response = await axiosInstance.post('analysis/getSentiment', {
            text: text
        })
        const sentiment = response.data.scored_labels[0].label;
        const sentimentScore = response.data.scored_labels[0].score;
        setAnalysisData(prevData => [...prevData, { label: sentiment, score: sentimentScore }]);

    }

    async function getEmotion() {
        const response = await axiosInstance.post('analysis/getEmotion', {
            text: text
        })
        const emotion = response.data.scored_labels;
        setAnalysisData(prevData => [...prevData, ...emotion]);
    }

    function handleSubmit() {
        getSentiment();
        getEmotion();
    }

    useEffect(() => {
        console.log(analysisData);
    }, [analysisData])


    return (
        <section className="h-180 justify-center items-center bg-light-1 w-full">
            <div className="flex flex-col gap-3 justify-center items-center">
                <div className="py-10 px-10 ">
                    <TextField sx={{ width: '400px' }}
                        id="outlined-multiline-static"
                        label="Enter Text"
                        multiline
                        rows={4}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <Button onClick={handleSubmit}>
                    Submit
                </Button>
                <div className="min-w-[400px]">
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Data</TableCell>
                                    <TableCell align="right">Score</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {analysisData.map((row) => (
                                    <TableRow key={row.label}>
                                        <TableCell component="th" scope="row">
                                            {row.label}
                                        </TableCell>
                                        <TableCell align="right">{row.score}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

            </div>


        </section>
    )
}

export default AIplayground