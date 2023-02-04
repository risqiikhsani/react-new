import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { memo } from 'react';



function FriendRequestTable(props) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Date request</TableCell>
                        <TableCell align="right">Accept</TableCell>
                        <TableCell align="right">Decline</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.data && props.data.map((a) => (
                            <TableRow
                                key={a.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {a.sender.profile.name}
                                </TableCell>
                                <TableCell align="right">{a.time_creation}</TableCell>
                                <TableCell align="right">{a.accept ? "true":"false"}</TableCell>
                                <TableCell align="right">{a.decline ? "true":"false"}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default memo(FriendRequestTable)