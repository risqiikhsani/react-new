import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";

import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, FormGroup, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import PeopleIcon from "@mui/icons-material/People";
import { Stack } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import LanguageIcon from "@mui/icons-material/Language";
import PanoramaWideAngleIcon from '@mui/icons-material/PanoramaWideAngle';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { setBackground, setDarkTheme } from "../../hooks/slices/themeSlice";



const fontDrawerColor = "#9A9FA7";
const iconDrawerColor = "#F9FAFC";


const backgroundTheme = [
  {
    id: 1,
    background: 'linear-gradient(to left, #74ebd5, #acb6e5)',
    name: 'Default Light',
  },
  {
    id: 2,
    background: 'linear-gradient(to left, #0f2027, #203a43, #2c5364)',
    name: 'Default Dark',
  },
  {
    id: 3,
    background: 'linear-gradient(to right, #40e0d0, #ff8c00, #ff0080)',
    name: 'Wedding Day',
  },
  {
    id: 4,
    background: 'linear-gradient(to right, #fc5c7d, #6a82fb)',
    name: 'Sublime Light',
  },
  {
    id: 5,
    background: 'linear-gradient(to left, #00b09b, #96c93d)',
    name: 'Ohhappiness',
  },
  {
    id: 6,
    background: 'linear-gradient(to left, #cac531, #f3f9a7)',
    name: 'Sulphur',
  },
  {
    id: 7,
    background: 'linear-gradient(to left, #800080, #ffc0cb)',
    name: 'Pink Flavour',
  },
  {
    id: 8,
    background: 'linear-gradient(to left, #00f260, #0575e6)',
    name: 'Rainbow Blue',
  },
  {
    id: 9,
    background: 'linear-gradient(to left, #667db6, #0082c8, #0082c8, #667db6)',
    name: 'Hydrogen',
  },
]



const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "orange" : "orange",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark" ? { iconDrawerColor } : { iconDrawerColor },
    borderRadius: 20 / 2,
  },
}));

export default function RightDrawer(props) {
  const dispatch = useDispatch();

  const [age, setAge] = React.useState(10);

  const defaultbg = useSelector((state) => state.theme.background)
  const isDarkTheme = useSelector((state) => state.theme.darkTheme)

  const [bgvalue, setBgvalue] = React.useState(null)
  const [dt,setDt] = React.useState(null)

  React.useEffect(() => {
    backgroundTheme.map((a) => {
      if(a.background === defaultbg){
        setBgvalue(a.id)
      }
    })
    setDt(isDarkTheme)
  },[])

  const handleDarkThemeChange = () => {
    setDt(!dt)
    dispatch(setDarkTheme(!dt))
  }

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleBackgroundChange = (id,color) => {
    setBgvalue(id)
    dispatch(setBackground(color))
  }

  return (
    <React.Fragment>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography
          variant="body1"
          gutterBottom
          align="center"
          sx={{ color: fontDrawerColor }}
        >
          Setting
        </Typography>
      </Toolbar>

      <Divider sx={{ bgcolor: "#ECECEC" }} variant="middle" />

      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={4}
      >
        <FormGroup sx={{ mx: "20px", color: fontDrawerColor }}>
          <FormControlLabel
            control={<MaterialUISwitch sx={{ m: 1 }} checked={dt} onChange={handleDarkThemeChange} />}
            label="switch Theme"
          />
        </FormGroup>

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={0.5}
        >
          <PanoramaWideAngleIcon color="primary" />
          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth size="small">
              <InputLabel
                sx={{ color: fontDrawerColor }}
                id="demo-simple-select-label"
              >
                Wallpaper Theme
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={bgvalue}
                label="Wallpaper Theme"
                onChange={handleChange}
                sx={{ color: fontDrawerColor }}
              >
                {
                  backgroundTheme.map((a) => (
                    <MenuItem
                      key={a.id}
                      onClick={() => handleBackgroundChange(a.id,a.background)}
                      value={a.id}>
                      <Paper sx={{ textAlign: "center", width: '100%', background: a.background }}>
                        {a.name}
                      </Paper>
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Box>
        </Stack>

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={0.5}
        >
          <LanguageIcon color="primary" />
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth size="small">
              <InputLabel
                sx={{ color: fontDrawerColor }}
                id="demo-simple-select-label"
              >
                Language
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Language"
                onChange={handleChange}
                sx={{ color: fontDrawerColor }}
              >
                <MenuItem value={10}>English</MenuItem>
                <MenuItem value={20}>Chinese</MenuItem>
                <MenuItem value={30}>Spain</MenuItem>
                <MenuItem value={40}>Dutch</MenuItem>
                <MenuItem value={50}>Arabic</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>
      </Stack>
    </React.Fragment>
  );
}
