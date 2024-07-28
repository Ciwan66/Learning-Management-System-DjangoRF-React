import React from "react";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
function MyVerticalCard({ course ,removeCourse }) {
  return (
    <Card
      sx={{
        boxShadow: 0,
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Box component={Link} to={`/course/detail/${course.id}`} sx={{ display: "flex" ,textDecoration: 'none'}}>
        <Box>
          <CardMedia
            component="img"
            height="88"
            image="https://mui.com/static/images/cards/paella.jpg"
            alt="altimage"
            sx={{
              mr: 3,
              width: "140px",
              border: "1px solid #d1d7dc",
            }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            gutterBottom
            color='primary'
            sx={{
              fontWeight: "600",
              p: 0,
              lineHeight: 1.2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {course.title}
          </Typography>
          <Typography
            variant="body2"
            noWrap
            color="text.secondary"
            sx={{ mb: 1, lineHeight: 1, color: "#2d2f31ad" }}
          >
            by {course.author.first_name} {course.author.last_name}
          </Typography>
          <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ fontWeight: 600, mr: 0.5, color: "#2d2f31" }}
            >
              {course.average_rating}
            </Typography>
            <Rating
              name="read-only"
              value={course.average_rating}
              readOnly
              sx={{ fontSize: "16px" }}
            />

            <Typography
              variant="body2"
              color="text.primary"
              sx={{
                fontWeight: 600,
                ml: 0.5,
                fontSize: "14px",
                color: "#2d2f31ad",
              }}
            >
              {course.num_ratings} ratings
            </Typography>
          </Box>
          <Typography
            color="text.primary"
            sx={{
              fontWeight: 400,
              fontSize: "12px",
              color: "#2d2f31ad",
            }}
          >
            42 total hours 287 lectures Beginner
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            mr: 3,
            pt: 0,
          }}
        >
          {" "}
          <Button
            onClick={() => {removeCourse(course.id)}}
            disableRipple
            disableElevation
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              color: "#5022c3",
              mb: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: "13px",
                lineHeight: 1,
              }}
            >
              Remove
            </Box>
          </Button>
          <Button
            onClick={() => {}}
            disableRipple
            disableElevation
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              color: "#5022c3",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: "13px",
                lineHeight: 1,
              }}
            >
              Move to Wishlist
            </Box>
          </Button>
        </Box>
        <Box component={Link} to={`/course/detail/${course.id}`} sx={{textDecoration: 'none'}}>
        {" "}
          <Typography
            color="text.primary"
            sx={{
              fontWeight: 700,
              fontSize: "16px",
              color: "#a435f0",
            }}
          >
            ${course.price}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default MyVerticalCard;
