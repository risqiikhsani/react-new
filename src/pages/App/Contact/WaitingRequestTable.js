import { Avatar, Link, Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { memo } from 'react';
import { Link as LinkRouter } from "react-router-dom";
import { request_api } from '../../../api/Api';
import FriendRequestTableRowButton from './FriendRequestTableRowButton';
import WaitingRequestTableRowButton from './WaitingRequestTableRowButton';


export default function WaitingRequestTable(props) {


    const waitingRequests = useQuery(
        ["waiting-requests"],
        () => {
            return request_api.get_my_waiting_list();
        },
        {
            keepPreviousData: true,
        }
    );

    return (
        <React.Fragment>
            {waitingRequests.data && <Typography fontSize={25} sx={{m:'10px'}}>Count = {waitingRequests.data.data.length}</Typography>}
        <TableContainer component={Paper}>
            <Table aria-label="simple table">

                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Date request</TableCell>
                        <TableCell align="right">Cancel</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {waitingRequests.isLoading && <Typography>loading...</Typography>}
                    {waitingRequests.isError && <Typography>error</Typography>}
                    {
                        waitingRequests.data && waitingRequests.data.data.map((a) => (
                            <TableRow
                                key={a.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                    >
                                        <Avatar
                                            src={a.user.profile.profile_picture.small}
                                            sx={{ width: 24, height: 24 }}
                                        />
                                        <Link underline="hover" component={LinkRouter} to={`/user/${a.user.id}`}>{a.user.profile.name}</Link>
                                    </Stack>
                                </TableCell>
                                <TableCell align="right">{a.time_creation}</TableCell>
                                <WaitingRequestTableRowButton user_id={a.user.id} />
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
        </React.Fragment>

    );
}

