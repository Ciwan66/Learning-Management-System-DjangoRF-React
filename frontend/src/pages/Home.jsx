import React , {useEffect}from "react";
import { Box } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MyCard from "../components/mui/MyCard";
import useAxios from '../utils/useAxios'
function Home() {
  const axiosInstance = useAxios()
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

  const GetData = async ()=>{
    const response = await axiosInstance.get('/course/list/');
    console.log(response)
  }
  useEffect(()=>{
    GetData()
  },[])
  const { user } = useContext(AuthContext);
  return (
    <Box
      sx={{
        width: "69%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        pt: 3,
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
      <Box sx={{}}>
        <Box sx={{}}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{mb:2}}>
              {" "}
              <Typography sx={{ fontSize: "36px", fontWeight: "600" }}>
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
          <Box>
            <Carousel responsive={responsive}>
              <MyCard />
              <MyCard />
              <MyCard />
              <MyCard />
              <MyCard />
              <MyCard />
            </Carousel>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
