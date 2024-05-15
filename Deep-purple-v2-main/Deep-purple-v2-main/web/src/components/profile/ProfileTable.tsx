import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { deleteProfileByUsername, getAllProfile } from '../../api/appwrite/api';
import React, { useEffect, useState } from 'react';
import { MyUserProfile } from '../../types';
import { Alert, Button, Snackbar } from '@mui/material';
import { NavLink } from 'react-router-dom';




export default function ProfileTable() {

    const [profileData, setProfileData] = React.useState<MyUserProfile[]>([]);
    const [open, setOpen] = useState(false);

    async function getUserProfiles() {
        const userprofiles = await getAllProfile();

        if (userprofiles === undefined) return;

        const profiles: MyUserProfile[] = userprofiles.documents.map((profile: any) => {
            const tempProfile: MyUserProfile = {
                username: profile.username,
                FirstName: profile.FirstName,
                LastName: profile.LastName,
                Email: profile.Email,
                Age: profile.Age,
                Role: profile.Role,
                Occupation: profile.Occupation,
            }
            return tempProfile;
        });

        return profiles;

    }

    const closeAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        window.location.reload();
    };

    async function deleteProfile(username: string) {
        await deleteProfileByUsername(username);
        console.log("deleted user " + username);
        setOpen(true);
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    }

    useEffect(() => {
        if (profileData.length === 0 || profileData === undefined) {
            const fetchProfileData = async () => {
                const profiles: MyUserProfile[] = await getUserProfiles() ?? [];
                setProfileData(profiles);

            }
            fetchProfileData();
        };

    }, [profileData]);

    return (
        <TableContainer component={Paper} sx={{ background: '#3A3361' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ color: 'white', fontSize: '14px' }} align="left">Username</TableCell>
                        <TableCell sx={{ color: 'white', fontSize: '14px' }} align="left">First Name</TableCell>
                        <TableCell sx={{ color: 'white', fontSize: '14px' }} align="left">Last Name</TableCell>
                        <TableCell sx={{ color: 'white', fontSize: '14px' }} align="left">Email</TableCell>
                        <TableCell sx={{ color: 'white', fontSize: '14px' }} align="left">Age</TableCell>
                        <TableCell sx={{ color: 'white', fontSize: '14px' }} align="left">Occupation</TableCell>
                        <TableCell sx={{ color: 'white', fontSize: '14px' }} align="left">Group</TableCell>
                        <TableCell sx={{ color: 'white', fontSize: '14px' }} align="left"></TableCell>
                        <TableCell sx={{ color: 'white', fontSize: '14px' }} align="left"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {profileData.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align='left' sx={{ color: 'white', fontSize: '14px' }} >
                                {row.username}
                            </TableCell>
                            <TableCell align="left" sx={{ color: 'white', fontSize: '14px' }} >{row.FirstName}</TableCell>
                            <TableCell align="left" sx={{ color: 'white', fontSize: '14px' }} >{row.LastName}</TableCell>
                            <TableCell align="left" sx={{ color: 'white', fontSize: '14px' }} >{row.Email}</TableCell>
                            <TableCell align="left" sx={{ color: 'white', fontSize: '14px' }} >{row.Age}</TableCell>
                            <TableCell align="left" sx={{ color: 'white', fontSize: '14px' }} >{row.Occupation}</TableCell>
                            <TableCell align="left" sx={{ color: 'white', fontSize: '14px' }} >{row.Role}</TableCell>
                            <TableCell align="left" sx={{ color: 'white' }} >
                                <NavLink to={`/profile/editProfile/${row.username}`}>
                                    <Button variant="contained" style={{ backgroundColor: "#877EFF", fontSize: '10px' }}>
                                        Edit
                                    </Button>
                                </NavLink>
                            </TableCell>
                            <TableCell align="left" sx={{ color: 'white' }} >
                                <Button variant="contained" style={{ backgroundColor: "#877EFF", fontSize: '10px' }}
                                    onClick={() => { deleteProfile(row.username) }}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Snackbar open={open} autoHideDuration={6000} onClose={closeAlert}>
                <Alert onClose={closeAlert} severity="success" sx={{ width: '100%' }}>
                    Delete Success!
                </Alert>
            </Snackbar>
        </TableContainer>
    );
}