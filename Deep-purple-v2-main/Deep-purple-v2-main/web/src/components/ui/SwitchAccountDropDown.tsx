import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { socialMediaAccount } from '../../types';
import { getRepliesToThatAuthor, getSocialMediaAccounts } from '../../api/appwrite/api';
import { handleFetchUserAttributes } from '../../context/AuthContext';
import { UsernameContext } from '../../context/Usernamecontext';

interface onUsernameChangeProps {
    onUsernameChange?: (value: string) => void;
}

export default function SwitchAccountDropDown({ onUsernameChange }: onUsernameChangeProps) {
    const { selectedUsername, setSelectedUsername } = React.useContext(UsernameContext);
    const [socialMediaAccounts, setSocialMediaAccounts] = React.useState<socialMediaAccount[]>([]);

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedUsername(event.target.value);
        onUsernameChange && onUsernameChange(event.target.value);
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
            console.log(socialMediaAccounts);
        }

    }

    React.useEffect(() => {
        const fetchAttributes = async () => {
            const useremail = await handleFetchUserAttributes();

            if (useremail !== undefined) {
                getAccounts(useremail);
            }
        }

        fetchAttributes();
    }, []);

    return (

        <FormControl sx={{ m: 1, minWidth: 180 }} size="small"
            className='bg-primary-500 rounded-lg'>
            <InputLabel id="demo-select-small-label">
                <div className='flex flex-row gap-1 justify-center items-center'>
                    <AccountBoxIcon />
                    <p>Select account</p>
                </div>
            </InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={selectedUsername}
                label="Age"
                onChange={handleChange}
            >
                {socialMediaAccounts && socialMediaAccounts.map((account, index) => (
                    <MenuItem key={index} value={account.account_username}>
                        {account.platform}: {account.account_username}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

    );
}
