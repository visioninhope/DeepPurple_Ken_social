import React, { useState } from 'react';
import { TextField, Button, Stack, Snackbar, Alert } from '@mui/material';
import { MyUserProfile } from '../../types';
import { saveProfile } from '../../api/appwrite/api';
export function CreateProfileForm() {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [age, setAge] = useState<number>(0);
    const [role, setRole] = useState<string>("");
    const [occupation, setOccupation] = useState<string>("");

    const [open, setOpen] = useState(false);

    async function handleSubmit() {
        const profile: MyUserProfile = {
            username: username,
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Age: age,
            Role: role,
            Occupation: occupation,
        }

        await saveProfile(profile);
        setOpen(true);
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }
    const closeAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        window.location.reload();
    };
    return (
        <div className='bg-light-1 p-10 min-w-[700px] max-w-[700px] rounded-lg'>
            <React.Fragment>
                <h2>Register Form</h2>
                <form>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Username"
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                        required
                        fullWidth
                        sx={{ mb: 4 }}
                    />
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="First Name"
                            onChange={e => setFirstName(e.target.value)}
                            value={firstName}
                            fullWidth
                            required
                        />
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Last Name"
                            onChange={e => setLastName(e.target.value)}
                            value={lastName}
                            fullWidth
                            required
                        />
                    </Stack>
                    <TextField
                        type="email"
                        variant='outlined'
                        color='secondary'
                        label="Email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        fullWidth
                        required
                        sx={{ mb: 4 }}
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Occupation"
                        onChange={e => setOccupation(e.target.value)}
                        value={occupation}
                        fullWidth
                        required
                        sx={{ mb: 4 }}
                    />
                    <TextField
                        type="number"
                        variant='outlined'
                        color='secondary'
                        label="Age"
                        onChange={e => setAge(parseInt(e.target.value))}
                        value={age}
                        fullWidth
                        required
                        sx={{ mb: 4 }}
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Group"
                        onChange={e => setRole(e.target.value)}
                        value={role}
                        fullWidth
                        required
                        sx={{ mb: 4 }}
                    />


                    <Button variant="contained" style={{ backgroundColor: "#877EFF" }}
                        onClick={handleSubmit}>
                        Create
                    </Button>
                </form>
                <Snackbar open={open} autoHideDuration={6000} onClose={closeAlert}>
                    <Alert onClose={closeAlert} severity="success" sx={{ width: '100%' }}>
                        This is a success message!
                    </Alert>
                </Snackbar>

            </React.Fragment>
        </div>
    )
}