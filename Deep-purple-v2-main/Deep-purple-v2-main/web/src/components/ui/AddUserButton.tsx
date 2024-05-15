import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { addUser } from '../../context/AuthContext';

export default function AddUserButton() {
    return (
        <div onClick={() => {
            addUser();
        }}>
            <Button style={{ backgroundColor: "#877EFF", color: "#FFFFFF", width: "85px", height: "50px" }}>
                <AddIcon />
            </Button>
        </div>
    )
}