import { Button, TableCell } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { request_api } from "../../../api/Api";
import { setSnackbar } from "../../../hooks/slices/snackbarSlice";

function FriendRequestTableRowButton(props) {
    const queryClient = useQueryClient()
    const dispatch = useDispatch()

    const acceptRequest = useQuery(
        ["accept-user-request"],
        () => {
            return request_api.accept_user(props.id)
        },
        {
            refetchOnWindowFocus: false,
            enabled: false,
            onError: (error, variables, context) => {
                dispatch(
                    setSnackbar({
                        type: "error",
                        string: "Something went wrong !",
                        detail: error.message,
                    })
                );
            },
            onSuccess: (data, variable, context) => {
                dispatch(setSnackbar({ type: "success", string: "Request Accepted" }));
                queryClient.invalidateQueries("friend-requests")
            },
        })

    const acceptClickButton = () => {
        acceptRequest.refetch()
    }

    const declineRequest = useQuery(
        ["decline-user-request"],
        () => {
            return request_api.decline_user(props.id)
        },
        {
            refetchOnWindowFocus: false,
            enabled: false,
            onError: (error, variables, context) => {
                dispatch(
                    setSnackbar({
                        type: "error",
                        string: "Something went wrong !",
                        detail: error.message,
                    })
                );
            },
            onSuccess: (data, variable, context) => {
                dispatch(setSnackbar({ type: "success", string: "Request Declined" }));
                queryClient.invalidateQueries("friend-requests")
            },
        })

    const declineClickButton = () => {
        declineRequest.refetch()
    }


    return (
        <React.Fragment>
            <TableCell align="right"><Button onClick={acceptClickButton} variant='contained' size='small'>Accept</Button></TableCell>
            <TableCell align="right"><Button onClick={declineClickButton} variant='contained' size='small' color="error">Decline</Button></TableCell>
        </React.Fragment>
    )
}

export default memo(FriendRequestTableRowButton)