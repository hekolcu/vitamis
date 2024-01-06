import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";
import {login} from "../../utils/VitamisApiFunctions";
import {useAuth} from "../../App";

interface LogInProps {
    onLogin: () => void; // or more specific type, if needed
}

function Login(props: LogInProps){
    const navigate = useNavigate();
    const { setToken } = useAuth();

    React.useEffect(() => {
        props.onLogin();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const loginData = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        const response = await login(loginData)

        if(response.token != null){
            props.onLogin();
            setToken(response.token);
        }
    };

    const navigateCreateProfile = () => {
        navigate('/createProfile');
    };

    return (
        <Box sx={{mt: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <img src="/vitamis_icon_192.png" alt="My Icon"
                 style={{maxHeight: '50px', marginBottom: '16px'}}/>
            <Typography component="h1" variant="h5">
                VITAMIS SIGN IN
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                <TextField
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                    color="warning"
                    onClick={navigateCreateProfile}
                >
                    Sign In
                </Button>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Link href="#" variant="body2">
                        Forgot password?
                    </Link>
                    <Link href="/register" variant="body2">
                        Don't have an account? Sign Up
                    </Link>
                </Box>
            </Box>
        </Box>
    );
}

export default Login