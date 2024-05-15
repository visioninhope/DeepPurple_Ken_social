import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import { signOut } from 'aws-amplify/auth';

export default function SignOutButton() {
    return (
        <div onClick={() => {
            signOut();
        }}>
            <Button style={{ backgroundColor: "#877EFF", color: "#FFFFFF", width: "85px", height: "50px" }}>
                <LogoutIcon />
            </Button>
        </div>
    )
}