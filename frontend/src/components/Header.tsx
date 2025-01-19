import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./Logo";
import NavigationLink from "./NavigationLink";
import { useAppDispatch, useAppSelector } from "../store/exporter";
import axios from "axios";
import { userActions } from "../store/store";
import { toast } from "sonner";
import { Box, LinearProgress, Menu, MenuItem, Typography, useMediaQuery } from "@mui/material";
import { NavLink } from "react-router-dom";
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import { useState } from "react";
import { useTheme } from '@mui/material/styles';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const Header = () => {
  let isLoggedIn = useAppSelector(state => state.isLoggedIn)
  let dispatch = useAppDispatch()
  let theme = useTheme()
  const isScreenLargerThanMd = useMediaQuery(theme.breakpoints.up('sm'));
  let isLoading = useAppSelector(state => state.isLoading)

  let logoutHandler = async () => {
    try {
      dispatch(userActions.setIsLoading(true))
      let response = await axios.get('https://mern-gpt-2.onrender.com/user/logout', { withCredentials: true })
      
      if (response.status === 200) {
        dispatch(userActions.logout())
        toast.success("Logout Successful.")
        dispatch(userActions.setIsLoading(false))
      } else {
        toast.error("Some error occured! Failed to logout")
        dispatch(userActions.setIsLoading(false))
        console.log(response.data)
      }
    } catch (err) {
      toast.error("Some error occured! Failed to logout")
      throw err
    }
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const [navbar, setnavbar] = useState(null);

  const handleMenuOpen = (event: any) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event: any) => {
    event.stopPropagation();
    setAnchorEl(null);
  };
  const handleNavbarMenu = (event: any) => {
    event.stopPropagation();
    setnavbar(event.currentTarget);
  }

  const handleNavbarClose = (event: any) => {
    event.stopPropagation();
    setnavbar(null);
  }
  
  return (
    <>
    {isLoading && <LinearProgress />}
    <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none", height:"9vh" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Logo />
        {isLoggedIn &&
          <>
            {
              isScreenLargerThanMd ? <Box sx={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                  <NavLink to='/chat' className={({ isActive }) => isActive ? 'active' : ''}>
                    <Typography sx={{ fontSize: "20px", fontWeight: "600" }}>
                      Chat
                    </Typography>
                  </NavLink>
                  <NavLink to='/image' className={({ isActive }) => isActive ? 'active' : ''}>
                    <Typography sx={{ fontSize: "20px", fontWeight: "600" }}>
                      Generate Image
                    </Typography>
                  </NavLink>
                </Box>
                  :
                  <Box sx={{ marginTop: "12px", marginLeft:"auto" }}>
                    <MenuOpenRoundedIcon onClick={handleMenuOpen} fontSize="large" />
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      disableScrollLock={true}
                      >
                      <MenuItem onClick={handleMenuClose}>
                        <NavLink to="/chat" style={{ textDecoration: 'none', color: 'black' }}>
                          Chat
                        </NavLink>
                      </MenuItem>
                      <MenuItem onClick={handleMenuClose}>
                        <NavLink to="/image" style={{ textDecoration: 'none', color: 'black' }}>
                          Generate Image
                        </NavLink>
                      </MenuItem>
                      <MenuItem onClick={handleMenuClose}>
                        <NavLink to="/" onClick={logoutHandler} style={{ textDecoration: 'none', color: 'red' }}>
                          <Box sx={{display:"flex", alignItems:"center", width:"120px"}}>
                            <span>Logout</span> <LogoutRoundedIcon fontSize="large" sx={{marginLeft:"auto"}} />
                          </Box>
                        </NavLink>
                      </MenuItem>
                    </Menu>
                  </Box> 
}
          </>
        }
        <Box>
          {isLoggedIn ? (
            <>
              {isScreenLargerThanMd && 
              <NavigationLink
              to="/"
              text="logout"
              onClick={logoutHandler}
              />
            }
            </>
          ) : (
            isScreenLargerThanMd ?
            <>
                <NavigationLink
                  to="/login"
                  text="Login"
                  />
                <NavigationLink
                  to="/signup"
                  text="Signup"
                  />
              </>
              :
              <Box>
                <MenuOpenRoundedIcon onClick={handleNavbarMenu} fontSize="large" />
                <Menu
                  anchorEl={navbar}
                  open={Boolean(navbar)}
                  onClose={handleNavbarClose}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  disableScrollLock={true}
                  >
                  <MenuItem onClick={handleNavbarClose}>
                    <NavLink to="/login" style={{ textDecoration: 'none', color: 'black' }}>
                      Login
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleNavbarClose}>
                    <NavLink to="/signup" style={{ textDecoration: 'none', color: 'black' }}>
                      Signup
                    </NavLink>
                  </MenuItem>
                </Menu>
              </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
          </>
  );
};

export default Header;
