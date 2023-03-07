import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";


import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";





import { notification_api } from "../../api/Api";
import UsableSkeleton from "../../components/SuspenseFallback/UsableSkeleton";
import { setSnackbar } from "../../hooks/slices/snackbarSlice";
import NotificationMenuItem from "./NotificationMenuItem";


export default function NotificationMenuList(props) {

    const {
        handleClose
    } = props;

    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const { ref, inView } = useInView();



    const notificationInfiniteList = useInfiniteQuery(
        ["notifications"],
        async ({ pageParam = 1 }) => {

            const res = await notification_api.get_list(`?page=${pageParam}`);
            // const res = await AppApi.post().get_list(`?page=${pageParam}`);
            return res.data;
        },
        {
            getPreviousPageParam: (firstPage) => firstPage.previous ?? undefined,
            getNextPageParam: (lastPage) => lastPage.next ?? undefined,
            keepPreviousData: true,
            onError: (error, variables, context) => {
                dispatch(
                    setSnackbar({
                        type: "error",
                        string: "Something went wrong !",
                        detail: error.message,
                    })
                );
            },
        }
    );

    React.useEffect(() => {
        if (inView) {
            notificationInfiniteList.fetchNextPage();
        }
    }, [inView]);


    if(notificationInfiniteList.isLoading){
        return(
            <Typography>loading....</Typography>
        )
    }

    if(notificationInfiniteList.isError){
        return(
            <Typography>Something wrong</Typography>
        )
    }


    return (
        <React.Fragment>

            <Typography variant="h6" sx={{ px: '10px' }}>
                Notification
            </Typography>

            <Divider />

            {notificationInfiniteList.isLoading &&
                <Box sx={{ m: '10px' }}>
                    <UsableSkeleton />
                </Box>
            }

            
            {notificationInfiniteList.data.pages.map((a) => (
                <>
                    {/* {a.data.data.results.length == 0 && (<Typography>no posts found.</Typography>)} */}
                    {a.results.map((notification) => (
                        <NotificationMenuItem key={notification.id} data={notification} handleClose={handleClose} />

                    ))}
                </>
            ))}

            <Box ref={ref} sx={{textAlign:'center'}}>
                {notificationInfiniteList.isFetchingNextPage ? (
                    <UsableSkeleton />
                ) : notificationInfiniteList.hasNextPage ? (
                    "Load Newer"
                ) : (
                    "Nothing more to load"
                )}
            </Box>

        </React.Fragment>
    )
}