import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { BeatLoader,RingLoader,ScaleLoader } from "react-spinners";
import { Backdrop } from "@mui/material";

// const override: CSSProperties = {
//   display: "block",
//   mx: "50vh",
//   my: "50vh",
//   borderColor: "red",
// };

export default function ScaleLoaderSpinner() {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 3 }}
      open={true}
    >
      <ScaleLoader color="red" loading={true} size={100} />
    </Backdrop>
  );
}
