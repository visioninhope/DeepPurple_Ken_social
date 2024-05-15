import { NavLink } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';

export default function ProfilePageLeftBar() {
    return (
        <nav className="flex-col justify-between min-w-[220px] bg-purple-2 h-screen">
            <div className="py-10 flex justify-center items-center border-b-2">
                <p className="text-2xl font-bold">User Account</p>
            </div>



            <div className="py-5 flex flex-col justify-center items-center">
                <div className="py-5 hover:bg-primary-500">
                    <NavLink to="/Profile" className="flex flex-row gap-3">
                        <PersonIcon />
                        <p className="text-md font-bold">User profile</p>
                    </NavLink>
                </div>
                <div className="py-5 hover:bg-primary-500">
                    <NavLink to="/Profile/createProfile" className="flex flex-row gap-3">
                        <p className="text-md font-bold">Create profile</p>
                    </NavLink>
                </div>
                <div className="py-5 hover:bg-primary-500">
                    <NavLink to="/Profile/searchProfile" className="flex flex-row gap-3">
                        <p className="text-md font-bold">Search Profile</p>
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}