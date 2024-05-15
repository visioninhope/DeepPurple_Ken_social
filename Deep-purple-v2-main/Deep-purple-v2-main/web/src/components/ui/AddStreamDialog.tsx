import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TextField } from '@mui/material';

const emails = ['edwardphyoo'];

export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, selectedValue, open } = props;
    const [username, setUsername] = React.useState('');

    const handleClose = () => {
        onClose(selectedValue);
    };

    function handleConfirm() {
        if (username === '' || username === undefined) {
            return;
        }
        onClose(username);
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Add Dashboard</DialogTitle>
            <DialogContent>
                <DialogContentText>

                    The App is only support twitter for now. Please enter name for dashboardNames.

                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Dashboard Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirm}>Confirm</Button>
            </DialogActions>
        </Dialog>
    );
}

interface AddStreamDialogProps {
    onValueReturn: (value: string) => void;
}

export default function AddStreamDialog({ onValueReturn }: AddStreamDialogProps) {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(emails[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
        setSelectedValue(value);
        onValueReturn(value);
    };

    return (
        <div className='flex flex-col gap-2 items-center justify-center'>
            <Typography variant="subtitle1" sx={{ color: '#fff' }} >Add Stream</Typography>
            <Button onClick={handleClickOpen}>
                <AddCircleIcon />
            </Button>
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}
