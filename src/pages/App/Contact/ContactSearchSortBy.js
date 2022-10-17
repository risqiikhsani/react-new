import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Stack } from "@mui/system";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

export default function ContactSearchSortBy() {
  const [sortBy, setSortBy] = React.useState("");

  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      sx={{ width: "100%" }}
    >
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >

        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Users"
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>

      </Paper>

      <FormControl sx={{width:'300px'}}>
        <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortBy}
          label="Sort By"
          onChange={handleChange}
        >
          <MenuItem value="Newest Connected date">
            Alphabet Ascend
          </MenuItem>
          <MenuItem value="Oldest Connected date">
            Alphabet Descend
          </MenuItem>
          <MenuItem value="Newest Connected date">
            Connected Date (Newest)
          </MenuItem>
          <MenuItem value="Oldest Connected date">
            Connected Date (Oldest)
          </MenuItem>
          
        </Select>
      </FormControl>
    </Stack>
  );
}
