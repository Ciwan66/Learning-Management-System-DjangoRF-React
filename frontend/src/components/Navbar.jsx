import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar({ children }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { user, logoutUser } = useContext(AuthContext);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} component={Link} to="/student">
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const handleLogout=()=>{
    logoutUser()
  }

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ flexGrow: 1, height: "70px" }}>
          <AppBar
            position="static"
            sx={{
              color: "black",
              backgroundColor: "#FFF",
              boxShadow:
                "0 2px 4px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.08)",
              height: "75px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Toolbar>
              <Typography
                variant="h5"
                noWrap
                component={Link}
                to="/"
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                    fontWeight: "bold",
                    boxShadow: "none",
                    textDecoration: "none",
                    color: "black",
                  },
                }}
              >
                Udemy
              </Typography>

              <Box sx={{ ml: 2 }}>
                {" "}
                <Typography
                  noWrap
                  component="div"
                  sx={{
                    display: {
                      fontWeight: "200",
                      fontSize: "15px",
                      color: "#2d2f31",
                    },
                  }}
                >
                  Categories
                </Typography>
              </Box>

              <Box
                sx={{
                  width: "1050px",
                  height: "60px",
                  display: "inline-grid",
                  alignItems: "center",
                }}
              >
                {" "}
                <Search
                  sx={{
                    border: "1px solid black",
                    borderRadius: "20px",
                    height: "45px",
                    display: "flex",
                  }}
                >
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search for anything"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "30%",
                  justifyContent: "space-around",
                }}
              >
                {" "}
                <Box sx={{ ml: 2 }}>
                  {" "}
                  <Typography
                    noWrap
                    component={Link}
                    to="/"
                    underline="none"
                    sx={{
                      display: {
                        fontWeight: "200",
                        fontSize: "15px",
                        textDecoration: "none",
                        boxShadow: "none",
                        color: "#2d2f31",
                      },
                    }}
                  >
                    Teach on Udemy
                  </Typography>
                </Box>
                <Box sx={{ m: 3 }}>
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <LocalGroceryStoreIcon />
                  </IconButton>
                </Box>
                {user ? (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ mr: 3 }}>
                      <Button
                        variant="outlined"
                        onClick={
                          handleLogout
                        }
                        sx={{
                          height: "45px",
                          width: "100px",
                          fontSize: "18px",
                        }}
                      >
                        Logout
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ mr: 3 }}>
                      <Button
                        variant="outlined"
                        sx={{
                          height: "45px",
                          width: "100px",
                          fontSize: "16px",
                        }}
                        component={Link}
                        to="/login"
                      >
                        Login
                      </Button>
                    </Box>
                    <Box>
                      <Button
                        variant="contained"
                        sx={{
                          height: "45px",
                          width: "100px",
                          fontSize: "14px",
                        }}
                        component={Link}
                        to="/register"
                      >
                        Sign up
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>{children}</Box>
    </>
  );
}
