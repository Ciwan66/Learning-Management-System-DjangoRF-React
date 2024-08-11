import React from "react";
import dayjs from "dayjs";
// mui icons
import LanguageIcon from "@mui/icons-material/Language";
import UpdateIcon from "@mui/icons-material/Update";
import StarIcon from "@mui/icons-material/Star";
// mui
import { Box, Typography, Rating } from "@mui/material";

function CourseOverview(props) {
  const { course } = props;
  console.log(course);
  console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
  return (
    <Box sx={{ ml: 4, mt: 2 }}>
      <Box>
        {" "}
        <Typography variant="body1" sx={{ fontWeight: 400, fontSize: "28px" }}>
          {course.title}
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "300px",
        }}
      >
        <Box>
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="body1"
              color="primary"
              sx={{ fontWeight: 600, fontSize: "16px" }}
            >
              {course.average_rating}
            </Typography>
            <StarIcon fontSize="small" sx={{ color: "#e1a902" }} />
          </Box>
          <Box>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: 1,
                color: "#6a6f73",
              }}
            >
              {course.num_ratings} ratings
            </Typography>
          </Box>
        </Box>
        <Box>
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="body1"
              color="primary"
              sx={{ fontWeight: 600, fontSize: "16px" }}
            >
              {"224,222"}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: 1,
                color: "#6a6f73",
              }}
            >
              {"Students"}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="body1"
              color="primary"
              sx={{ fontWeight: 600, fontSize: "16px" }}
            >
              {"20 hours"}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: 1,
                color: "#6a6f73",
              }}
            >
              {"Total"}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "flex", mt: 3 ,alignItems:"center" }}>
        {" "}
        <UpdateIcon fontSize="small" />
        <Typography
          variant="body1"
          sx={{
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: 1,
            ml:1,
            color: "#6a6f73",
          }}
        >
          Last Updated {dayjs(course.last_update).format("MMM YYYY")}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", mt: 2 ,alignItems:"center" }}>
        {" "}
        <LanguageIcon fontSize="small" />
        <Typography
          color="primary"
          variant="body1"
          sx={{ fontWeight: 400, mr: 0.5, ml: 1, fontSize: "14px" }}
        >
          English
        </Typography>
      </Box>
    </Box>
  );
}

export default CourseOverview;
