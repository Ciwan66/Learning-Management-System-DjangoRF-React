import React from "react";
import { useState, useEffect } from "react";

// RRD
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Axios
import useAxios from "../utils/useAxios";
// MUI
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import { useCart } from "../context/CartContext";

//components
import MyCard from "../components/mui/MyCard";
function MyLearnings() {
  const axiosInstance = useAxios();
  const location = useLocation();
  const path = location.pathname;
  const [value, setValue] = React.useState(path);
  const [loading, setloading] = useState(true);
  let navigate = useNavigate();
  const {removeCourseFromWishlist} = useCart()
  const [data, SetData] = useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };
  const GetData = async () => {
    try {
      const response = await axiosInstance.get("cart/test2");
      console.log(response.data);
      SetData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setloading(false);
    }
  };
  const handleRemoveCourseFromWishlist= async (item_id)=>{
    await removeCourseFromWishlist(item_id)
    GetData();
  }
  useEffect(() => {
    GetData();
  }, []);
  const wishlist = (
    <Box>
      {loading ? (
        <Box>loading</Box>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2.0 }}>
          {" "}
          {data.items?.map((item, index) => (
                    <Box
                    key={index}
                    position="relative"
                    display="inline-block"
                    maxWidth={240}
                    sx={{ mb: 4 }} // Margin-bottom to create space below each card
                  >
                    {/* IconButton positioned above the card */}
                    <Box
                      position="absolute"
                      top={8} // Adjust top to fit your design
                      right={8} // Adjust right to fit your design
                      zIndex={1} // Ensure the button is on top
                    >
                      <IconButton aria-label="fav" onClick={()=>{handleRemoveCourseFromWishlist(item.id)}}>
                        <FavoriteSharpIcon />
                      </IconButton>
                    </Box>
        
                    {/* MyCard component */}
                    <Box>
                      <MyCard
                        title={item.course.title}
                        author={`${item.course.author.first_name} ${item.course.author.last_name}`}
                        img={item.course.img}
                        id={item.course.id}
                        average_rating={item.course.average_rating}
                        num_ratings={item.course.num_ratings}
                        price={item.course.price}
                        maxWidth={240}
                      />
                    </Box>
                  </Box>
          ))}
        </Box>
      )}
    </Box>
  );
  const learning = (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2.0 }}>
      {" "}
      <MyCard
        title="PHP MySQL and JavaScript"
        author="Jowan Mahmoud"
        img="a"
        id="1"
        average_rating="4"
        num_ratings="201"
        price="120"
        key="1"
        maxWidth={230}
      />
    </Box>
  );
  const content = (path) => {
    if (path == "/my-courses/learning") {
      return learning;
    } else {
      return wishlist;
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
              value="/my-courses/learning"
            />
            <Tab
              label="Wishlist"
              sx={{
                color: "white",
                "&.Mui-selected": {
                  color: "white",
                },
              }}
              value="/my-courses/wishlist"
            />
          </Tabs>
        </Box>
        <Box sx={{ mt: 15 }}>
          {loading ? <Box>Loading</Box> : content(path)}
        </Box>
      </Box>
    </Box>
  );
}

export default MyLearnings;
