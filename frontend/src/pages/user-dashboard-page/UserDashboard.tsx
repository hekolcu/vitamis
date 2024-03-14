import * as React from 'react';
import VitamisAppBar from "../../components/app-bar/VitamisAppBar";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography} from '@mui/material';
import Box from "@mui/material/Box";
import {useVitamisContext} from "../../App";
import {getRecommendations} from "../../utils/VitamisApiFunctions";
import {VitaminRecommendation} from "../../types/VitaminRecommendation";

function UserDashboard() {
    const { token } = useVitamisContext();
    const [tableName, setTableName] = React.useState<string>("")
    const [vitamins, setVitamins] = React.useState<VitaminRecommendation[]>([]);

    React.useEffect(() => {
        (async () => {
            if (token) {
                const response = getRecommendations(token);
                response.then((value) => {
                    if (value) {
                        setTableName(value.groupName);
                        setVitamins(value.recommendedVitamins);
                    }
                });
            }
        })();
    }, [token]);

    return (
        <div>
            <VitamisAppBar />
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
                                    key={vitamin.vitaminName}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {vitamin.vitaminName}
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