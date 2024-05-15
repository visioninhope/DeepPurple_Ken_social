import React, { useState } from 'react';
import { Button, Dialog, DialogContent, List, ListItem, ListItemIcon, ListItemText } from '@mui/material/';
import TwitterAddAccount from './TwitterAddAccount';
import { saveSocialMediaAccounts } from '../../api/appwrite/api';
import { handleFetchUserAttributes } from '../../context/AuthContext';


function SocialMediaPopUp() {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [userEmail, setUserEmail] = useState<string>();

    const handleClickOpen = () => {
        setOpen(true);
    };

    handleFetchUserAttributes().then((res) => {
        setUserEmail(res);
    });

    const handleClose = (platform: string, username: string) => {
        setOpen(false);
        setSelectedValue(platform);
        console.log(platform, username);

        const socialMediaAccounts = {
            account_username: username,
            platform: platform,
            useremail: userEmail || '',
            socialmedia_feeds: [],
        };

        saveSocialMediaAccounts(socialMediaAccounts);
    };

    return (
        <div>
            <Button variant="contained" style={{ backgroundColor: "#877EFF" }} onClick={handleClickOpen}>
                Add Social Account
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <List>
                        {/* <ListItem button selected={selectedValue === 'Facebook'} onClick={() => handleClose('Facebook')}>
                            <ListItemIcon>
                                <FacebookIcon />
                            </ListItemIcon>
                            <ListItemText primary="Facebook" />
                        </ListItem> */}
                        <ListItem button selected={selectedValue === 'Twitter'}>
                            <ListItemIcon>
                                <TwitterAddAccount closeTheLogInList={handleClose} />
                            </ListItemIcon>
                        </ListItem>
                        {/* Add other social media icons as needed */}
                    </List>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default SocialMediaPopUp;