import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";

export default function MyCard() {
  return (
    <Card color="primary" variant="variant" sx={{ maxWidth: 260 }}>
      <CardActionArea >
        <CardMedia
          component="img"
          height="160"
          image="https://mui.com/static/images/cards/paella.jpg"
          alt="altimage"
          sx={{mb:1}}        />
        <CardContent sx={{ p: 0 }}>
          <Typography
            gutterBottom
            sx={{fontWeight: '700', p: 0, lineHeight: 1 }}
          >
            100 Days of Code: The Complete Python Pro Bootcamp
          </Typography>
          <Typography variant="body2" noWrap color="text.secondary" sx={{ mb: 1 ,mt:1,lineHeight: 1 }}>
            Dr. Angela Yu, Developer and Lead Instructor{" "}
          </Typography>
          <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
          <StarIcon sx={{ color: "gold", fontSize: 16 }} />
            <StarIcon sx={{ color: "gold", fontSize: 16 }} />
            <StarIcon sx={{ color: "gold", fontSize: 16 }} />
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ fontWeight: 600, mr: 0.5 }}
            >
              {"(309,808) "}
            </Typography>
         
          </Box>
          <Typography
            variant="h6"
            color="text.primary"
            sx={{ fontWeight: 600 }}
          >
            $10
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
