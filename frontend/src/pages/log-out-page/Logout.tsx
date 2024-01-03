import * as React from 'react';
import {Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

interface LogoutProps {
    onLogout: () => void; // or more specific type, if needed
}

function Logout(props: LogoutProps){
    React.useEffect(props.onLogout)
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
                You successfully signing out !
            </Typography>

            <Button
                variant="contained"
                color="warning"
                sx={{mt: 2}}
                onClick={navigateDashboard}
            >
                Go to Dashboard
            </Button>
        </Box>
    )
}

export default Logout