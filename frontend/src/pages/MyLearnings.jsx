import React from "react";
// RRD
import { useLocation } from "react-router-dom";
// MUI
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

function MyLearnings() {
  const [value, setValue] = React.useState('all_courses');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const location = useLocation();
  const path = location.pathname;
  const wishlist = <div>Wishlist</div>;
  const learning = <div>Learning</div>;
  const content = (path) => {
    if (path == "/my-courses/wishlist") {
      return wishlist;
    } else {
      return learning;
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        background: "linear-gradient(to bottom, #2d2f31 168px, white 50px  )",
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", md: "53%" },
          mt: "42px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box>
          {" "}
          <Typography
            gutterBottom
            sx={{
              fontWeight: "600",
              fontSize: "42px",
              color: "white",
              fontFamily: "roboto",
            }}
          >
            {"My learning "}
          </Typography>
        </Box>
        <Box>
          <Tabs
            value={value}
            TabIndicatorProps={{
              style: { background: "white", height: "5px" },
            }}
            onChange={handleChange}
          >
            <Tab
              label="All Courses"
              sx={{
                color: "white",
                "&.Mui-selected": {
                  color: "white",
                },
              }}
              value="all_courses"
            />
            <Tab
              label="Wishlist"
              sx={{
                color: "white",
                "&.Mui-selected": {
                  color: "white",
                },
              }}
              value="wishlist"
            />
          </Tabs>
        </Box>
        <Box>
          {content(path)}
          {path}
        </Box>
      </Box>
    </Box>
  );
}

export default MyLearnings;
