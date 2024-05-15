import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TwitterIcon from '@mui/icons-material/Twitter';

interface TwitterAddAccountProps {
    closeTheLogInList: (platform: string, username: string) => void;
}

export default function TwitterAddAccount({ closeTheLogInList }: TwitterAddAccountProps) {

    const [open, setOpen] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    function handleClose() {
        setOpen(false);
        closeTheLogInList('Twitter', username);
    };
    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                <TwitterIcon />
                <p>Twitter</p>
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Link Twitter Handle</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add account enter the twitter handle
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        label="Username"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Add</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

