import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'


export default function Home() {

  // const fetchPostList = () => {
  //   fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res =>res.json())
  // }
  
  // const { isLoading, isError, data, error } = useQuery(['posts'], fetchPostList)

  // if(isLoading){
  //   return <span>Loading...</span>
  // }

  // if(isError){
  //   return <span>Error: {error.message}</span>
  // }

  return (
    <React.Fragment>
      homepage
    </React.Fragment>
  );
}