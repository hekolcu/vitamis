import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import {useNavigate} from "react-router-dom";

function SuccessfulRegister(){
    const navigate = useNavigate();
    const navigateDashboard = () => {
        navigate('/');
    };

    return(
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            textAlign="center"
        >
            <img src="/vitamis_icon_192.png" alt="My Icon"
                 style={{maxHeight: '50px', marginBottom: '16px'}}/>

            <Typography variant="h5" component="h1" color="#2E7D32" gutterBottom>
                Thank you for your registration
            </Typography>

            <Typography variant="body1" color="textSecondary">
                We will keep you posted when the confirmation is done in 48 hours
            </Typography>

            <Button
                variant="contained"
                color="warning"
                sx={{mt: 2}}
                onClick={navigateDashboard}
            >
                Go Back
            </Button>
        </Box>
    );
}

export default SuccessfulRegister