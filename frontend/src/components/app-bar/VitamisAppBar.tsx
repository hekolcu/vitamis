import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import {useVitamisContext} from "../../App";

interface VitamisAppBarProps {
    // user: User | null;
}

function VitamisAppBar(props: VitamisAppBarProps)  {
    const navigate = useNavigate();
    const { user } = useVitamisContext()

    React.useEffect(() => {
        console.log(user);
    }, [user]);

    const navigateLogin = () => {
        navigate('/login');
    };

    const navigateRegister = () => {
        navigate('/register');
    };

    const navigateLogOut = () => {
        navigate('/logout');
    };

    return (
        <AppBar position="static" color="default">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img src="/vitamis_icon_192.png" alt="My Icon"
                         style={{display: 'flex', marginRight: '8px', maxHeight: '50px'}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        VITAMIS
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}></Box>

                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}></Box>

                    <Box sx={{flexGrow: 0}}>
                        {user ? (
                            <div>
                                <Typography sx={{display: 'inline-block', mr: 2}}>
                                    {user.email}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    color="warning"
                                    onClick={navigateLogOut}
                                >
                                    SIGN OUT
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <Button
                                    variant="outlined"
                                    color="warning"
                                    sx={{m: 2}}
                                    onClick={navigateLogin}
                                >
                                    LOGIN
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="warning"
                                    onClick={navigateRegister}>
                                    REGISTER
                                </Button>
                            </div>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
        ;
}

export default VitamisAppBar;