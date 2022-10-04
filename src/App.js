import React from "react";
import Home from "./pages/Home";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Home/>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
