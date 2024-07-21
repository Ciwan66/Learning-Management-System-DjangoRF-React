import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MyCard from "../components/mui/MyCard";
import useAxios from "../utils/useAxios";
import apiInstance from "../utils/axios";

function Home() {
  const axiosInstance = useAxios();
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 5, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const [courses, setCourses] = useState([]);
  const GetData = async () => {
    try {
      const response = await apiInstance.get("/course/list/");
      console.log(response);
      setCourses(response.data);
    } catch(error){
      console.error("Error fetching data:", error)
    }

  };
  useEffect(() => {
    GetData();
  }, []);
  const { user } = useContext(AuthContext);
  return (
    <Box sx={{display: "flex", justifyContent: "center"}}>

    <Box
      sx={{
        
        width: "72%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        mt:3
      }}
    >
      {user ? (
        <Box sx={{ p: "32px", display: "flex" }}>
          <Avatar sx={{ bgcolor: deepPurple[500], width: 64, height: 64,mt:0.2 }}>
            JH
          </Avatar>
          <Typography sx={{ ml: 3, fontSize: "24px", fontWeight: "bold" }}>
          Welcome back,  {user.first_name}
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
      <Box sx={{}}>
        <Box sx={{}}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ mb: 2 ,pl:2}}>
              {" "}
              <Typography sx={{ fontSize: "32px", fontWeight: "600" }}>
                Learners are viewing
              </Typography>
            </Box>
            {/* <Box sx={{ mr: 3 }}>
              {" "}
              <Typography sx={{ fontSize: "24px", fontWeight: "600" }}>
                My learnings
              </Typography>
            </Box> */}
          </Box>
          <Box sx={{p:2}}>
            <Carousel responsive={responsive}>
              {courses?.map((c, index) => (
                <MyCard
                  title={c.title}
                  author={`${c.author.first_name} ${c.author.last_name}`}
                  img={c.img}
                  id={c.id}
                  average_rating={c.average_rating}
                  num_ratings={c.num_ratings}
                  price={c.price}
                  key = {index}
                />
              ))}
            </Carousel>
          </Box>
        </Box>
      </Box>
    </Box>
    </Box>

  );
}

export default Home;
