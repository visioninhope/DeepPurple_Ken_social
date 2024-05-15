import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { getSocialMediaAccounts } from '../../api/appwrite/api';
import { socialMediaAccount } from "../../types";
import { handleFetchUserAttributes } from "../../context/AuthContext";

interface StreamContentRightBarProps {
    onToggleDisplayRightBar: () => void,
    addStream: (username: string) => void;
}

export default function StreamContentRightBar({ addStream, onToggleDisplayRightBar }: StreamContentRightBarProps) {
    const [selectedIndex, setSelectedIndex] = useState(1);

    const [socialMediaAccounts, setSocialMediaAccounts] = useState<socialMediaAccount[]>([]);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
        account_username: string,
    ) => {
        setSelectedIndex(index);

        if (account_username !== undefined) {
            addStream(account_username);
        }
    };

    async function getAccounts(useremail?: string) {
        if (!useremail) return;

        const useraccountsFromDB = await getSocialMediaAccounts(useremail);

        if (useraccountsFromDB === undefined || useraccountsFromDB.total === 0) {
            return false;
        } else {
            let accounts = useraccountsFromDB.documents.map(doc => ({
                account_username: doc.account_username,
                platform: doc.platform,
                useremail: doc.useremail,
                socialmedia_feeds: doc.socialmedia_feeds
            }));

            setSocialMediaAccounts(accounts);
        }

    }

    useEffect(() => {
        const fetchAttributes = async () => {
            const useremail = await handleFetchUserAttributes();

            if (useremail !== undefined) {
                getAccounts(useremail);
            }
        }

        fetchAttributes();

    }, [])
    return (
        <section className="flex-grow flex-col border-l-2">
            <div className="flex flex-row py-5 px-10 justify-between border-b-2">
                <p className="font-bold text-xl">Add a Stream</p>
                <Button variant="contained" style={{ backgroundColor: "#3A3361" }}
                    onClick={onToggleDisplayRightBar}>
                    <CloseFullscreenIcon />
                </Button>
            </div>
            <div className='py-5 px-5'>
                <Box sx={{ width: '100%' }} >
                    <List component="nav" aria-label="main mailbox folders"
                        className='flex flex-col gap-5'>
                        {socialMediaAccounts.map((account, index) => (
                            <div className='bg-light-1' key={index}>
                                <ListItemButton
                                    selected={selectedIndex === index}
                                    onClick={(event) => handleListItemClick(event, index,
                                        account.account_username)}
                                >
                                    <ListItemIcon className='pr-5'>
                                        <img src={'/src/assets/images/profile-placeholder.svg'} alt="profile" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={<span className='text-dark-1 font-bold text-lg'>{account.account_username}</span>}
                                        secondary={<span className='text-dark-1'>{account.platform}</span>}
                                    />
                                </ListItemButton>
                            </div>
                        ))}
                    </List>
                </Box>
            </div>
        </section>
    )
}
