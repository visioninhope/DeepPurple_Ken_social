import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import DatasetIcon from '@mui/icons-material/Dataset';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SickIcon from '@mui/icons-material/Sick';
import SwitchAccountDropDown from './SwitchAccountDropDown';
import { saveMetaDataReportToDatabase, saveSentimentReportToDatabase } from '../../services';

export default function AddReportDialog() {
    const [open, setOpen] = React.useState(false);
    const [accountName, setAccountName] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    function handleClose(value: string) {

        if (value === 'Metadata') {
            saveMetaDataReportToDatabase(accountName);
        }
        else if (value === 'Sentiment') {
            saveSentimentReportToDatabase(accountName);
        }
        setOpen(false);
    };

    React.useEffect(() => {
        console.log(accountName);
    }, [accountName]);

    return (
        <React.Fragment>
            <Button variant="contained" style={{ backgroundColor: "#877EFF" }} onClick={handleClickOpen}>
                Add Report
            </Button>
            <Dialog open={open} onClose={() => { handleClose('') }}>
                <DialogTitle>Create Stats Report</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please choose the type of report you want to create
                    </DialogContentText>
                    <div className='py-2'>
                        <SwitchAccountDropDown onUsernameChange={(value) => setAccountName(value)} />
                    </div>
                    <Box sx={{ backgroundColor: '#F6F4EB', padding: 2, marginY: 3 }}>
                        <Button variant="contained" sx={{ margin: 1 }} onClick={() => { handleClose('Metadata') }}>
                            <DatasetIcon />
                            <p>Metadata</p>
                        </Button>
                        <Button variant="contained" sx={{ margin: 1 }} onClick={() => { handleClose('Sentiment') }}>
                            <SentimentSatisfiedAltIcon />
                            <p>Sentiment</p>
                        </Button>
                        <Button variant="contained" sx={{ margin: 1 }} onClick={() => { handleClose('Emotion') }}>
                            <SickIcon />
                            <p>Emotion</p>
                        </Button>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { handleClose('') }}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )

}