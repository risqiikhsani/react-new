import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { memo } from 'react';
import { Link as LinkRouter } from "react-router-dom";


import { Avatar, Link, Stack } from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function ContactTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Nickname</TableCell>
            <TableCell align="right">Following</TableCell>
            <TableCell align="right">Pinned</TableCell>
            <TableCell align="right">Notify</TableCell>
            <TableCell align="right">Connected Date</TableCell>
            <TableCell align="right">Contact Groups</TableCell>
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
                <TableCell align="right">{a.relationship.nickname}</TableCell>
                <TableCell align="right">{a.relationship.follow && (<CheckCircleIcon color='success'/>)}</TableCell>
                <TableCell align="right">{a.relationship.pin && (<CheckCircleIcon color='success'/>)}</TableCell>
                <TableCell align="right">{a.relationship.notification && (<CheckCircleIcon color='success'/>)}</TableCell>
                <TableCell align="right">-</TableCell>
                <TableCell align="right">-</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default memo(ContactTable)