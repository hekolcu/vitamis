import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {login} from "../../utils/VitamisApiFunctions";
import {useVitamisContext} from "../../App";
import {useNavigate} from "react-router-dom";

function Login(){
    const { setToken, user } = useVitamisContext();

    const navigate = useNavigate();

    React.useEffect(() => {
        console.log(user);
        if (user?.gender != null && user.dateOfBirth != null){
            navigate('/dashboard');
        }
    }, [user]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const loginData = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        const response = await login(loginData)

        if(response.token != null){
            setToken(response.token);
        }
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