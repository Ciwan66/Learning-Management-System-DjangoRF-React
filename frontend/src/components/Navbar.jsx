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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
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
      <MenuItem
        onClick={handleMenuClose}
        component={Link}
        to="/student/profile"
      >
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
        <p>Login</p>
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
        <p>Sign Up</p>
      </MenuItem>
    </Menu>
  );
  const handleLogout = () => {
    logoutUser();
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            sx={{
              color: "black",
              backgroundColor: "#FFF",
              boxShadow: 2,
              height: "70px",
              display: "flex",
              justifyContent: "center",
              outline: "rgp(255,0,0) dashed 1px",
            }}
          >
            <Toolbar>
              <Box sx={{ width: "95px" }}>
                <Typography
                  variant="h5"
                  noWrap
                  component={Link}
                  to="/"
                  sx={{
                    display: {
                      fontSize: "28px",

                      xs: "none",
                      sm: "block",
                      fontWeight: "bold",
                      boxShadow: "none",
                      textDecoration: "none",
                      color: "black",
                    },
                  }}
                >
                  udemy
                </Typography>
              </Box>

              <Box sx={{ ml: "14px" }}>
                {" "}
                <Typography
                  noWrap
                  component="div"
                  sx={{
                    display: {
                      fontWeight: "200",
                      fontSize: "14px",
                      color: "#2d2f31",
                    },
                  }}
                >
                  Categories
                </Typography>
              </Box>

              <Box
                sx={{
                  width: "1240px",
                  height: "60px",
                  display: "inline-grid",
                  alignItems: "center",
                }}
              >
                {" "}
                <Search
                  sx={{
                    border: "1px solid black",
                    borderRadius: "25px",
                    height: "45px",
                    display: "flex",
                  }}
                >
                  <SearchIconWrapper>
                    <SearchIcon sx={{ color: "#2d2f31" }} />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search for anything"
                    inputProps={{ "aria-label": "search" }}
                    sx={{ fontSize: "14px" }}
                  />
                </Search>
              </Box>

              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  width: "30%",
                  justifyContent: "space-between",
                }}
              >
                {" "}
                <Box sx={{}}>
                  {" "}
                  <Typography
                    noWrap
                    component={Link}
                    to="/"
                    underline="none"
                    sx={{
                      display: {
                        fontWeight: "200",
                        fontSize: "13px",
                        textDecoration: "none",
                        boxShadow: "none",
                        color: "#2d2f31",
                      },
                    }}
                  >
                    Teach on Udemy
                  </Typography>
                </Box>
                <Box sx={{}}>
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    color="inherit"
                    component={Link}
                    to="/course/cart"
                  >
                    <LocalGroceryStoreIcon />
                  </IconButton>
                </Box>
                {user ? (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{}}>
                      <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        color="inherit"
                        component={Link}
                        to="/my-courses/wishlist"
                      >
                        <FavoriteBorderIcon />
                      </IconButton>
                    </Box>
                    <Box sx={{ mr: 3, ml: 5 }}>
                      <Button
                        variant="outlined"
                        onClick={handleLogout}
                        sx={{
                          height: "40px",
                          width: "80px",
                          fontSize: "14px",
                          borderRadius: "0px",
                        }}
                      >
                        Logout
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ mr: 1 }}>
                      <Button
                        variant="outlined"
                        sx={{
                          height: "40px",
                          width: "80px",
                          fontSize: "14px",
                          borderRadius: "0px",
                          fontWeight: "600",
                        }}
                        component={Link}
                        to="/login"
                      >
                        Log in
                      </Button>
                    </Box>
                    <Box>
                      <Button
                        variant="contained"
                        sx={{
                          height: "40px",
                          width: "80px",
                          fontSize: "13px",
                          borderRadius: "0px",
                          fontWeight: "600",
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
                  sx={{ border: 1, borderRadius: 0, p: 0.9 }}
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
      <Box sx={{}}>{children}</Box>
    </>
  );
}
