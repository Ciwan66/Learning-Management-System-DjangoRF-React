import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// Components
import useAxios from "../utils/useAxios";
import MyContentAccordian from "../components/MyContentAccordian";
// MUi
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// 3rd Party
import ReactPlayer from "react-player/lazy";
function Course() {
  let { course_id } = useParams();
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  const GetData = async () => {
    try {
      const response = await axiosInstance.get(`/course/detail/${course_id}/`);
      console.log(response.data);
      setCourse(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    GetData();
  }, []);
  return (
    <Box sx={{ flexGrow: 1, mt: 0.2 }}>
      {loading ? (
        <Box>Loading...</Box>
      ) : (
        <Grid container>
          <Grid item md={8.5} xs={12} sx={{ backgroundColor: "red" }}>
            <ReactPlayer
              width="100%"
              height="625px"
              url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
            />
          </Grid>
          <Grid item md={3.5} xs={8} sx={{ backgroundColor: "blue" }}>
            
            <MyContentAccordian/>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default Course;
