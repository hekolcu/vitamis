import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import {useNavigate} from "react-router-dom";


function ProfileCreation() {
    const navigate = useNavigate();
    // States for each form field
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [disease, setDisease] = useState('');
    const [sunExposure, setSunExposure] = useState('');
    const [smoking, setSmoking] = useState('');
    const [gender, setGender] = useState('');

    // Function to handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle the form submission
        // send a POST request to server with the form data
    };

    const navigateUserDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <Container maxWidth="xs">
            <Box my={4} display="flex" flexDirection="column" justifyContent="center">
                <Box display="flex" justifyContent="center" mb={2}>
                    <img src="/vitamis_icon_192.png" alt="My Icon"
                         style={{maxHeight: '50px', marginBottom: '16px'}}/>
                </Box>

                <Typography component="h1" variant="h5" align="center">
                    PROFILE CREATION
                </Typography>

                <TextField label="Height" margin="normal" fullWidth variant="standard" required/>
                <TextField label="Weight" margin="normal" fullWidth variant="standard" required/>
                <TextField label="Disease" margin="normal" fullWidth variant="standard"/>

                <TextField
                    required
                    variant="standard"
                    label="Date of birth"
                    type="date"
                    defaultValue="2024-01-01"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel id="sunExp-label">Sun Exposure</InputLabel>
                    <Select
                        variant="standard"
                        labelId="sunExp-label"
                        id="sunExp-select"
                        label="Sun Exposure"
                        // value={activity}
                        // onChange={handleActivityChange}
                    >
                        <MenuItem value="Low">Low</MenuItem>
                        <MenuItem value="Moderate">Moderate</MenuItem>
                        <MenuItem value="High">High</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel id="smoking-label">Smoking</InputLabel>
                    <Select
                        variant="standard"
                        labelId="smoking-label"
                        id="smoking-select"
                        label="Smoking"
                        // value={activity}
                        // onChange={handleActivityChange}
                    >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal" required>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                        variant="standard"
                        labelId="gender-label"
                        id="gender-select"
                        label="Gender"
                        // value={activity}
                        // onChange={handleActivityChange}
                    >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    color="warning"
                    size="large"
                    fullWidth sx={{mt:5}}
                    onClick={navigateUserDashboard}
                >
                    Create Profile
                </Button>
            </Box>
        </Container>
    );
}

export default ProfileCreation