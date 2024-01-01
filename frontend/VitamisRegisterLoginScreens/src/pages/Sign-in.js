import React from "react"
import { Grid, Paper, Avatar, TextField } from "@mui/material"
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';



export default function(){
    const paperStyle={padding :20,height:"70vh",width:280,margin:"20px auto"}
    const avatarStyle={backgroundColor:"green"}
return(
<Grid>
    <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
            <Avatar style={avatarStyle}>
                <HealthAndSafetyIcon/>
            </Avatar>
            <h2>VITAMIS SIGN IN </h2>
                </Grid>
                <TextField label="Email" placeholder="Email" variant="standard" fullWidth required/>
                <TextField label="Password" placeholder="Password" variant="standard" type="password" fullWidth required/>
                <Link to="/create-profile">
                    <Button variant="contained" fullWidth>Sign In</Button>
                    </Link>
                    <Button size="small" href="/landing">Forgot password?</Button>
                    <Button size="small" href="/register">Don't have an account? Sign Up</Button>


       
    </Paper>
</Grid>

)

}
