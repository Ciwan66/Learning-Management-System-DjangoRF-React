import React from "react";
import { Box } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";

function Home() {
  const { user } = useContext(AuthContext);
  return (
    <Box
      sx={{
        backgroundColor: "red",
        width: "72%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {user ? (
        <Box sx={{ p: "32px", display: "flex" }}>
          <Avatar sx={{ bgcolor: deepPurple[500], width: 64, height: 64 }}>
            JH
          </Avatar>
          <Typography sx={{ ml: 3, fontSize: "24px", fontWeight: "bold" }}>
            Welcome, {user.first_name}
          </Typography>
        </Box>
      ) : null}
      <Box sx={{ mb: 6 }}>
        <img
          alt="banner"
          style={{ width: "100%" }}
          src="https://img-b.udemycdn.com/notices/web_carousel_slide/image/db24b94e-d190-4d5a-b1dd-958f702cc8f5.jpg"
        />
      </Box>
      <Box sx={{ backgroundColor: "blue" }}>
        <Box sx={{ backgroundColor: "green" }}>
          <Box
            sx={{ display: "flex", width: "100%", backgroundColor: "orange" ,justifyContent:'space-between'}}
          >
            <Box sx={{ml:5}}>
              {" "}
              <Typography sx={{ fontSize: "36px", fontWeight: "600" }}>
                Let's start learning
              </Typography>
            </Box>
            <Box sx={{ mr:3 }}>
              {" "}
              <Typography sx={{ fontSize: "24px", fontWeight: "600" }}>
                My learnings
              </Typography>
            </Box>
          </Box>
          <Box></Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
