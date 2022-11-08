import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./redux/store";
import { router } from "./routes/routes";
import { injectStore } from "./api/instance";

//https://redux.js.org/faq/code-structure#how-can-i-use-the-redux-store-in-non-component-files
injectStore(store)
const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: twentyFourHoursInMs,
    },
  },
});


// refetchOnWindowFocus:  automatically requests fresh data in the background if user leaves the app and returns to stale data.
// refetchOnmount:        if true, refetch on mount if the data is stale.
// refetchOnReconnect:    if true, refetch on reconnect if the data is stale.
// retry:                 if true, failed queries will retry infinitely.
// staleTime:             the time in milliseconds after data is considered stale. Defaults to 0.


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
