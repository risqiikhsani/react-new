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


export default function FriendRequestTable(props) {


    const friendRequests = useQuery(
        ["friend-requests"],
        () => {
            return request_api.get_list();
        },
        {
            keepPreviousData: true,
        }
    );

    return (
        <React.Fragment>
            {friendRequests.data && <Typography fontSize={25} sx={{ m: '10px' }}>Count = {friendRequests.data.data.length}</Typography>}
            <TableContainer component={Paper}>
                <Table aria-label="simple table">

                    <TableHead>
                        <TableRow>
                            <TableCell>no</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Date request</TableCell>
                            <TableCell>Accept</TableCell>
                            <TableCell>Decline</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {friendRequests.isLoading && <Typography>loading...</Typography>}
                        {friendRequests.isError && <Typography>error</Typography>}
                        {friendRequests.data && friendRequests.data.data.length == 0 && (<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>-</TableCell>
                        </TableRow>)}
                        {
                            friendRequests.data && friendRequests.data.data.map((a,i) => (
                                <TableRow
                                    key={a.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {i+1}
                                    </TableCell>
                                    <TableCell>
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                        >
                                            <Avatar
                                                src={a.sender.profile.profile_picture.small}
                                                sx={{ width: 24, height: 24 }}
                                            />
                                            <Link underline="hover" component={LinkRouter} to={`/user/${a.sender.id}`}>{a.sender.profile.name}</Link>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>{a.time_creation}</TableCell>
                                    <FriendRequestTableRowButton id={a.id} />
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>

    );
}

