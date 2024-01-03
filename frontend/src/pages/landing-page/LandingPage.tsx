import React from 'react';
import {Container} from "@mui/material";
import VitamisAppBar from "../../components/app-bar/VitamisAppBar";
function LandingPage() {
    return (
        <div>
            <VitamisAppBar user={null}/>
            <Container maxWidth="xl" style={{
                backgroundImage: "url('landing_page_bg.png')",
                backgroundSize: 'cover',
                // backgroundPosition: 'center',
                height: '100vh'
            }}/>
        </div>
    );
}

export default LandingPage;
