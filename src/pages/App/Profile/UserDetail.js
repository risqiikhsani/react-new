import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { user_api } from "../../../api/Api";
import AppApi from "../../../api/AppApi";
import CreatePostDial from "../Global/CreatePostDial";
import EditProfileDial from "../Global/EditProfileDial";
import Profile from "./Profile";

export default function UserDetail(props) {
  const authenticated_user_id = useSelector((state) => state.user.id);
  const authenticated_user_name = useSelector((state) => state.user.name);
  const authenticated_user_public_username = useSelector((state) => state.user.public_username);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  let { userId } = useParams();

  if (userId == undefined) {
    userId = authenticated_user_id
  }



  const userDetail = useQuery(
    ["user-detail", { id: userId }],
    () => {
      return user_api.get_detail(userId);
    },
    {
      keepPreviousData: true,
      onSuccess: (data, variables, context) => {
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


  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Profile data={userDetail.data.data}
          mine={userDetail.data.data.id === authenticated_user_id}
        />

        {
          userDetail.data.data.id === authenticated_user_id && (
            <React.Fragment>
              <EditProfileDial data={userDetail.data.data}/>
              <CreatePostDial />
            </React.Fragment>
          )
        }



      </Container>
    </React.Fragment>
  )
}