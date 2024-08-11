import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

// Components
import useAxios from "../utils/useAxios";
import VideoPlayer from "../components/VideoPlayer";
import MyContentAccordian from "../components/MyContentAccordian";
import CourseOverview from "../components/CourseOverview";
import CourseReviews from "../components/CourseReviews";
// MUi
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";

// 3rd Party
import ReactPlayer from "react-player/lazy";

function Course() {
  let { course_id, lecture_id } = useParams();
  const [lectureId, setLectureId] = useState();
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();
  const location = useLocation();
  let navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState("");
  const [content, setContent] = useState();

  const path = location.pathname;
  const hash = location.hash; // '#overview'

  const [value, setValue] = React.useState(`${path}${hash}`);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
    handleHashChange();

  };
  const handleLectureChnage = (lecture) => {
    setLectureId(lecture);
    setValue(`/course/${course_id}/watch/lecture/${lecture}#overview`);
    let vid = "";
    course.sections.map((section) =>
      section.lectures.map((lecture) => {
        if (lecture.id === lecture_id) {
          vid = lecture.video;
          return true;
        }
        return false;
      })
    );
    setVideoUrl(vid);
    navigate(`/course/${course_id}/watch/lecture/${lecture}#overview`);
    handleHashChange();
  };
  const GetData = async () => {
    try {
      const response = await axiosInstance.get(`/course/detail/${course_id}/`);
      console.log(response.data);
      setCourse(response.data);
      setContent(<CourseOverview course={response.data} />);

      let vid = response.data.sections[0].lectures[0].video;
      console.log("its vid");
      console.log(vid);
      setVideoUrl(vid);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLectureId(lecture_id);
  }, [lecture_id]);
  const handleHashChange = () => {
    const hash = window.location.hash;
    console.log("HASHHHHHHHHHHH");
    if (hash.includes("#reviews")) {
      setContent(<CourseReviews courseId={course_id} />);
    } else {
      setContent(<CourseOverview course={course} />);
    }
  };

  useEffect(() => {
    GetData();
    handleHashChange();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, mt: 0.2, height: "250vh" }}>
      {loading ? (
        <Box>Loading...</Box>
      ) : (
        <Grid container>
          <Grid item md={9} xs={12} sx={{ height: "100vh" }}>
            <Box>
              <VideoPlayer videoUrl={videoUrl} />
            </Box>

            <Box>
              <Box sx={{ml:2}}>
                {" "}
                <Box>
                  <Tabs
                    value={value}
                    TabIndicatorProps={{
                      style: { background: "white", height: "0px" },
                    }}
                    onChange={handleTabChange}
                  >
                    <Tab
                      label="Overview"
                      sx={{
                        color: "secondary",
                        "&.Mui-selected": {
                          color: "black",
                        },
                        borderBottom: "none",
                        "&.Mui-selected": {
                          borderBottom: "1px solid #2d2f31",
                        },
                      }}
                      value={`/course/${course_id}/watch/lecture/${lectureId}#overview`}
                    />
                    <Tab
                      label="Reviews"
                      indicatorColor="red"
                      sx={{
                        color: "secondary",
                        "&.Mui-selected": {
                          color: "black",
                        },
                        borderBottom: "none",
                        "&.Mui-selected": {
                          borderBottom: "1px solid #2d2f31",
                        },
                      }}
                      value={`/course/${course_id}/watch/lecture/${lectureId}#reviews`}
                    />
                  </Tabs>
                </Box>
              </Box>
              <Divider variant="middle" sx={{ mt: 0 }} />

              <Box>{content}</Box>
              <Divider sx={{ mt: 2 }} />

            </Box>
          </Grid>
          <Grid item md={3} xs={8} sx={{ borderLeft: "2px solid #ddd" }}>
            <Box
              sx={{
                position: "sticky",
                top: 50,
              }}
            >
              <Box
                sx={{
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  pl: 2,
                  fontWeight: "700",
                }}
              >
                Course content
              </Box>
              <Box
                sx={{
                  // Set a fixed height for the box
                  overflowY: "auto", // Enable vertical scrolling
                  overflowX: "hidden", // Hide horizontal scrolling if not needed
                  border: "1px solid #ddd", // Optional: Add a border for better visibility
                  // Optional: Add padding
                }}
              >
                {course.sections.map((s, index) => (
                  <MyContentAccordian
                    index={index}
                    key={index}
                    section={s}
                    handleLectureChnage={handleLectureChnage}
                  />
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default Course;
