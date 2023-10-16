import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Route, Routes, useNavigate } from "react-router-dom";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { styled, alpha } from '@mui/material/styles';
import { Avatar, InputBase } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

import SchoolIcon from '@mui/icons-material/School';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Quiz from './Quiz';
import Result from './Result/Result';
import QuizShow from './QuizShow';


const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  // screen: any;
}
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function User(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [pagesArr, setPagesArr] = React.useState([
    {
      name: "Quiz",
      route: "quiz",
      icon: <SchoolIcon />,
    },
    {
      name: "Quiz Show",
      route: "quizshow",
      icon: <SchoolIcon />,
    },
   
  ]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigate = useNavigate();

  const openPage = (route: any) => {
    navigate(`/user/${route}`);
  };

  const drawer = (
    <div>
      <h1 style={{ fontSize: "50px", textAlign: "center" }}>LMS</h1>
      {/* <Toolbar /> */}
      <List style={{
        backgroundColor: "white"
      }}>
        {pagesArr.map((x, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => openPage(x.route)}>
              <ListItemIcon>{x.icon ? x.icon : <MailIcon />}</ListItemIcon>
              <ListItemText primary={x.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', boxShadow: "none" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          boxShadow: "none",

        }}
      >
        <Toolbar style={{
          backgroundColor: "#d3d3d3",
          boxShadow: "none"
        }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography style={{ display: 'flex' }} variant="h6" noWrap component="div" >
            <Search style={{ width: '1000px', height: '50px', marginTop: '5px' }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>

            <MenuItem>
              <Badge badgeContent={4} color="primary">
                <MailIcon color="primary" />
              </Badge>
            </MenuItem>
            <MenuItem>
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </MenuItem>
            <Divider orientation="vertical" flexItem />
            <MenuItem>
            <IconButton sx={{ px: 1 }}>
                <Avatar alt="Remy Sharp" src="https://tse1.mm.bing.net/th?id=OIP.aPrAXebVFheO1nA-8qU47gHaJA&pid=Api&rs=1&c=1&qlt=95&w=87&h=106" />
              </IconButton>
              <p>Profile</p>
            </MenuItem>
            <MenuItem>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <LogoutIcon />
              </IconButton>
              <p>Logout</p>
            </MenuItem>
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth }, flexShrink: { sm: 0 }, height: "100vh",
          backgroundColor: "#d3d3d3",
        }}
        aria-label="mailbox folders"

      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          style={{
            height: "100vh",
            backgroundColor: "#d3d3d3",
          }}
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          style={{
            backgroundColor: "#d3d3d3"
          }}
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        style={{
          backgroundColor: "#d3d3d3"
        }}
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Routes>
          <Route path="quiz" element={<Quiz/>} />
          <Route path="quiz/:id" element={<QuizShow/>} />
          <Route path="quizshow" element={<QuizShow/>} />
          {/* <Route path="result" element={<Result/>} /> */}
          {/* <Route path="instituteform" element={<InstituteForm/>} /> */}
          {/* <Route path="post" element={<PostScreen />} /> */}
          {/* <Route path="singlePost/:id" element={<Singlepost />} /> */}
        </Routes>
      </Box>
    </Box >
  );
}