import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import {useNavigate} from "react-router-dom";
import {useVitamisContext} from "../../App";
import {updateProfile} from "../../utils/VitamisApiFunctions";

const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

function ProfileCreation() {
    const navigate = useNavigate();
    const [height, setHeight] = useState<string | null>(null);
    const [weight, setWeight] = useState<string | null>(null);
    const [dateOfBirth, setDateOfBirth] = useState<string>(getCurrentDate());
    const [disease, setDisease] = useState('');
    const [sunExposure, setSunExposure] = useState('');
    const [smoking, setSmoking] = useState('');
    const [gender, setGender] = useState<string | null>(null);
    const { token, user } = useVitamisContext()

    React.useEffect(() => {
        if (user?.dateOfBirth != null && user.gender != null) {
            navigate('/dashboard');
        }
    }, [user]);

    function createProfile() {
        if (height &&
            weight &&
            dateOfBirth != getCurrentDate() &&
            gender &&
            token
        ) {
            updateProfile(token, {
                gender: gender,
                dateOfBirth: dateOfBirth,
                height: +height,
                weight: +weight,
                disease: disease,
                sunExposure: sunExposure,
                smoking: smoking == "Yes"
            }).then(r => {
                if (r) {
                    navigate('/dashboard');
                }
            });
        }
    }

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

                <TextField
                    label="Height"
                    margin="normal"
                    fullWidth
                    variant="standard"
                    required
                    value={height}
                    onChange={(event) => setHeight(event.target.value)}
                />
                <TextField
                    label="Weight"
                    margin="normal"
                    fullWidth
                    variant="standard"
                    required
                    value={weight}
                    onChange={(event) => setWeight(event.target.value)}/>
                <TextField
                    label="Disease"
                    margin="normal"
                    fullWidth
                    variant="standard"
                    value={disease}
                    onChange={(event) => setDisease(event.target.value)}
                />

                <TextField
                    required
                    variant="standard"
                    label="Date of birth"
                    type="date"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={dateOfBirth}
                    onChange={(event) => setDateOfBirth(event.target.value)}
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel id="sunExp-label">Sun Exposure</InputLabel>
                    <Select
                        variant="standard"
                        labelId="sunExp-label"
                        id="sunExp-select"
                        label="Sun Exposure"
                        value={sunExposure}
                        onChange={(event) => setSunExposure(event.target.value)}
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
                        value={smoking}
                        onChange={(event) => setSmoking(event.target.value)}
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
                        value={gender}
                        onChange={(event) => setGender(event.target.value)}
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
                    onClick={createProfile}
                >
                    Create Profile
                </Button>
            </Box>
        </Container>
    );
}

export default ProfileCreation