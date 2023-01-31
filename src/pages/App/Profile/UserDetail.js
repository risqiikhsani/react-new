import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import AppApi from "../../../api/AppApi";
import Profile from "./Profile";

export default function UserDetail(props){
    const navigate = useNavigate();
    let { userId } = useParams();
    const authenticated_user_id = useSelector((state) => state.user.id);
    if(userId==undefined){
        userId = authenticated_user_id
    }

    
    const userDetail = useQuery(
        ["user-detail",{id:userId}],
        () => {
          return AppApi.fetchUserDetail(userId);
        },
        {
          keepPreviousData: true,
          onSuccess:(data, variables, context) =>{
            console.log(data)
          },
        }
      );
    
    
      if (userDetail.isLoading)
        return (
          <React.Fragment>
            <Container maxWidth="sm">
              <p>Loading....</p>
            </Container>
          </React.Fragment>
        );
    
      if (userDetail.error)
        return (
          <React.Fragment>
            <Container maxWidth="sm">
              {/* {console.log(userDetail.error)} */}
              <p>Something went wrong!</p>
            </Container>
          </React.Fragment>
        );


    return(
        <React.Fragment>
            <Container maxWidth="sm">
                <Profile data={userDetail.data.data}/>
            </Container>
        </React.Fragment>
    )
}