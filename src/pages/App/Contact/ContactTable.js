import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { memo } from 'react';
import { Link as LinkRouter } from "react-router-dom";


import { Avatar, Link, Stack, Typography } from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useQuery } from '@tanstack/react-query';
import { connection_api } from '../../../api/Api';
import ContactTableRowMenu from './ContactTableRowMenu';

import PushPinIcon from '@mui/icons-material/PushPin';
import { orange } from "@mui/material/colors";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import HowToRegIcon from '@mui/icons-material/HowToReg';

export default function ContactTable(props) {


  const connections = useQuery(
    ["connections"],
    () => {
      return connection_api.get_list();
    },
    {
      keepPreviousData: true,
    }
  );


  return (
    <React.Fragment>
      {connections.data && <Typography fontSize={25} sx={{ m: '10px' }}>Count = {connections.data.data.length}</Typography>}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>no</TableCell>
              <TableCell >Name</TableCell>
              <TableCell>Nickname</TableCell>

              <TableCell align="center">Pinned</TableCell>
              <TableCell align="center">Notify</TableCell>
              <TableCell align="center">Following</TableCell>
              <TableCell>Connected Date</TableCell>
              <TableCell>Contact Groups</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {connections.isLoading && <Typography>loading...</Typography>}
            {connections.isError && <Typography>error</Typography>}
            {connections.data && connections.data.data.length == 0 && (<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>-</TableCell>
            </TableRow>)}

            {
              connections.data && connections.data.data.map((a,i) => (
                <TableRow
                  key={a.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{i+1}</TableCell>
                  <TableCell>
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
                  
                  <TableCell >{a.relationship.nickname}<p>&#128540;</p></TableCell>
                  <TableCell align="center">{a.relationship.pin && (<PushPinIcon sx={{ color: orange[800],ml:'5px' }} fontSize="small"/>)}</TableCell>
                  <TableCell align="center">{a.relationship.notification && (<NotificationsActiveIcon sx={{ color: orange[800],ml:'5px' }} fontSize="small"/>)}</TableCell>
                  <TableCell align="center">{a.relationship.follow && (<HowToRegIcon sx={{ color: orange[800] ,ml:'5px'}} fontSize="small"/>)}</TableCell>
                  <TableCell >{a.relationship.time_creation}</TableCell>
                  <TableCell >-</TableCell>
                  <TableCell ><ContactTableRowMenu
                    user_id={a.user.id}
                    user_name={a.user.profile.name}
                    pin={a.relationship.pin}
                    notification={a.relationship.notification}
                    follow={a.relationship.follow}
                    nickname={a.relationship.nickname}
                    is_connected={true}
                  /></TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

