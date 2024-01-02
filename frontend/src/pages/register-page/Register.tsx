import React, {useState} from 'react';
import {
    Box,
    Tab,
    Tabs,
    TextField,
    Button,
    Typography,
    Link,
} from '@mui/material';
import {TabContext, TabPanel} from '@mui/lab';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {useNavigate} from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Here you would handle the form submission
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        // setSelectedFile(file);
    };

    interface TabPanelProps {
        children?: React.ReactNode;
        index: any;
        value: any;
    }

    function TabPanel(props: TabPanelProps) {
        const {children, value, index, ...other} = props;

        return (
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box p={3}>{children}</Box>}
            </Typography>
        );
    }

    function a11yProps(index: any) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const navigateSuccesfulRegister = () => {
        navigate('/confirmation');
    };

    return (
        <Box sx={{mt: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <img src="/vitamis_icon_192.png" alt="My Icon"
                 style={{maxHeight: '50px', marginBottom: '16px'}}/>
            <Typography component="h1" variant="h5">
                VITAMIS REGISTER
            </Typography>
            <TabContext value={tabValue}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={tabValue} onChange={handleChange} aria-label="Registration tabs">
                        <Tab label="Advisee" value="1" {...a11yProps(0)} />
                        <Tab label="Dietitian" value="2" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={tabValue} index="1">
                    <Box component="form" onSubmit={handleSubmit} noValidate maxWidth="sm">
                        <TextField required fullWidth label="Name" margin="normal" variant="standard"/>
                        <TextField required fullWidth label="Surname" margin="normal" variant="standard"/>
                        <TextField required fullWidth type="email" label="Email" margin="normal" variant="standard"/>
                        <TextField required fullWidth type="password" label="Password" margin="normal"
                                   variant="standard"/>
                        <TextField required fullWidth type="password" label="Re-enter password" margin="normal"
                                   variant="standard"/>
                        <Button type="submit" fullWidth variant="contained" color="warning" size="large"
                                sx={{mt: 3, mb: 2}}>
                            Register
                        </Button>
                        <Link href="#" variant="body2" sx={{mb: 3}}>
                            Already have an account? Sign in
                        </Link>
                    </Box>
                </TabPanel>
                <TabPanel value={tabValue} index="2">
                    <Box component="form" onSubmit={handleSubmit} noValidate maxWidth="sm">
                        <TextField required fullWidth label="Name" margin="normal" variant="standard"/>
                        <TextField required fullWidth label="Surname" margin="normal" variant="standard"/>
                        <TextField required fullWidth type="email" label="Email" margin="normal" variant="standard"/>
                        <TextField required fullWidth type="password" label="Password" margin="normal"
                                   variant="standard"/>
                        <TextField required fullWidth type="password" label="Re-enter password" margin="normal"
                                   variant="standard"/>
                        <input
                            accept="image/png, image/jpeg, application/pdf"
                            style={{display: 'none'}}
                            id="raised-button-file"
                            multiple
                            type="file"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="raised-button-file">
                            <Button component="span" variant="contained" startIcon={<CloudUploadIcon/>} sx={{mt: 1}}>
                                Upload Diploma
                            </Button>
                        </label>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="warning"
                            size="large"
                            sx={{mt: 3, mb: 2}}
                            onClick={navigateSuccesfulRegister}
                        >
                            Register
                        </Button>
                        <Link href="/login" variant="body2" sx={{mb: 3}}>
                            Already have an account? Sign in
                        </Link>
                    </Box>
                </TabPanel>
            </TabContext>
        </Box>
    );
}

export default Register