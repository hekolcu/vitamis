import * as React from 'react';
import VitamisAppBar from "../../components/app-bar/VitamisAppBar";
import {User} from "../../types/User";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography} from '@mui/material';
import Box from "@mui/material/Box";


// Define the type for a single vitamin
type Vitamin = {
    name: string;
    amount: number;
    unit: string;
};

interface UserDashboardProps {
    user: User | null;
}

function UserDashboard(props: UserDashboardProps) {
    const [tableName, setTableName] = React.useState<string>("")
    const [vitamins, setVitamins] = React.useState<Vitamin[]>([]);

    React.useEffect(() => {
        setTableName("Erkek 65-70");
        setVitamins([
            {name: "A", amount: 750, unit: "mcg"},
            {name: "B6", amount: 1.7, unit: "mg"},
            {name: "B12", amount: 4, unit: "mcg"},
            {name: "C", amount: 110, unit: "mg"},
            {name: "D", amount: 15, unit: "mcg"},
            {name: "E", amount: 13, unit: "mg"},
            {name: "K", amount: 70, unit: "mcg"},
            {name: "Folat4", amount: 330, unit: "mcg"},
            {name: "Niasin5", amount: 6.6, unit: "mg/1000kkal"},
            {name: "Tiamin", amount: 0.4, unit: "mg/1000kkal"},
            {name: "Riboflavin", amount: 1.6, unit: "mg"},
            {name: "Biotin", amount: 40, unit: "mcg"},
            {name: "Pantotenik asit", amount: 5, unit: "mg"}
        ]);
    }, []);

    return (
        <div>
            <VitamisAppBar user={props.user}/>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" flexDirection="column">
                <TableContainer component={Paper} sx={{
                    mb: 5,
                    mt: 5,
                    maxWidth: 490,
                    borderRadius: 5
                }}>
                    <Typography variant="h5" component="h1" color="#2E7D32" sx={{mt: 1, mb: 2, textAlign: 'center'}}>
                        {tableName}
                    </Typography>
                    <Table aria-label="simple table">
                        <TableHead sx={{backgroundColor: '#0288D1'}}>
                            <TableRow>
                                <TableCell>Vitamin</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell align="right">Unit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {vitamins.map((vitamin) => (
                                <TableRow
                                    key={vitamin.name}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {vitamin.name}
                                    </TableCell>
                                    <TableCell align="right">{vitamin.amount}</TableCell>
                                    <TableCell align="right">{vitamin.unit}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    )
}

export default UserDashboard