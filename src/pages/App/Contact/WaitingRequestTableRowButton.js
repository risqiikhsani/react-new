import { Button, TableCell } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { request_api } from "../../../api/Api";
import { setSnackbar } from "../../../hooks/slices/snackbarSlice";

function WaitingRequestTableRowButton(props) {
    const {user_id} = props;
    const queryClient = useQueryClient()
    const dispatch = useDispatch()

    const cancelRequest = useQuery(
        ["cancel-request", { id: user_id }],
        () => {
          return request_api.cancel_sent_request(user_id);
        },
        {
          keepPreviousData: true,
          refetchOnWindowFocus: false,
          enabled: false,
          onSuccess: (data, variables, context) => {
            dispatch(setSnackbar({ type: "success", string: "Request Cancelled !" }));
            queryClient.invalidateQueries("waiting-requests");
          },
        }
      );
    
    
      const cancelRequestButton = (event) => {
        event.preventDefault();
        cancelRequest.refetch()
      }



    return (
        <React.Fragment>
            <TableCell align="right"><Button onClick={cancelRequestButton} variant='contained' size='small'>Cancel Request</Button></TableCell>
        </React.Fragment>
    )
}

export default memo(WaitingRequestTableRowButton)