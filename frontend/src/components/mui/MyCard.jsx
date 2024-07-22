import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
export default function MyCard(props) {
  const { id, title, img, average_rating, num_ratings, price, author } = props;
  return (
    <Card color="primary" variant="variant" sx={{ maxWidth: 240 }}>
      <CardActionArea component={Link} to={`/course/detail/${id}/`}>
        <CardMedia
          component="img"
          height="160"
          image="https://mui.com/static/images/cards/paella.jpg"
          alt="altimage"
          sx={{ mb: 1 }}
        />
        <CardContent sx={{ p: 0 }}>
          <Typography
            gutterBottom
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
            {title}
          </Typography>
          <Typography
            variant="body2"
            noWrap
            color="text.secondary"
            sx={{ mb: 1, mt: 1, lineHeight: 1 }}
          >
            {author}
          </Typography>
          <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ fontWeight: 600, mr: 0.5 }}
            >
              {average_rating}
            </Typography>
            <Rating
              name="read-only"
              value={average_rating}
              readOnly
              sx={{ fontSize: "16px" }}
            />

            <Typography
              variant="body2"
              color="text.primary"
              sx={{ fontWeight: 600, ml: 0.5 }}
            >
              {num_ratings}
            </Typography>
          </Box>
          <Typography color="text.primary" sx={{ fontWeight: 600 }}>
            ${price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
