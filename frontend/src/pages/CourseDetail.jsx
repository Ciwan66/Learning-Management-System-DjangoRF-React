import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Rating } from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import LanguageIcon from "@mui/icons-material/Language";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import MyAccordian from "../components/mui/MyAccordian";
import { Collapse } from "@mui/material";
import { useState, useEffect } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import dayjs from "dayjs";
import CheckIcon from '@mui/icons-material/Check';
import apiInstance from "../utils/axios";
function CourseDetail() {
  let { course_id } = useParams();
  const [collapsed, setCollapsed] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const contentStyle = {
    width: "66%",
    display: "flex",
    flexDirection: "column",
  };
  const GetData = async () => {
    try {
      const response = await apiInstance.get(`/course/detail/${course_id}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetchinh data", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    GetData();
  }, []);
  return (
    <>
      {loading ? (
        <p>Welcome back!</p>
      ) : (
        <Box
          sx={{
            position: "relative",
            height: "100vh",
            width: "100vw",
            color: "#2d2f31",
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              position: "absolute",
              top: "35px",
              left: "1148px",
              display: "flex",
              flexDirection: "column",
              boxShadow: 4,
              alignItems: "center",
              width: "340px",
              pb: 4,
            }}
          >
            <CardMedia
              component="img"
              height="189"
              image="https://mui.com/static/images/cards/paella.jpg"
              alt="altimage"
              sx={{ p: 0.1, width: "99%" }}
            />
            <Box
              sx={{
                width: "86%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "32px",
                    mt: 3,
                    lineHeight: 1,
                  }}
                >
                  ${data.price}{" "}
                </Typography>{" "}
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 2, borderRadius: "0px", height: "48px" }}
                >
                  Add to cart
                </Button>
                <Button
                  variant="outlined"
                  sx={{ mt: 1, borderRadius: "0px", height: "48px" }}
                >
                  Buy now
                </Button>
              </Box>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "12px",
                  mt: 2,
                  lineHeight: 1,
                }}
              >
                {"30-Day Money-Back Guarantee "}
              </Typography>{" "}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  mt: 3,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "16px",
                    mt: 2,
                    lineHeight: 1,
                  }}
                >
                  {"This course includes: "}
                </Typography>{" "}
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <LanguageIcon fontSize="small" />
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "13px",
                      lineHeight: 1,
                      ml: 2,
                    }}
                  >
                    {"12.5 hours on-demand video "}
                  </Typography>{" "}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <LanguageIcon fontSize="small" />
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 400,
                      fontSize: "13px",
                      lineHeight: 1,
                      ml: 2,
                    }}
                  >
                    {"Access on mobile and TV "}
                  </Typography>{" "}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <LanguageIcon fontSize="small" />
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: "13px",
                      lineHeight: 1,
                      ml: 2,
                    }}
                  >
                    {"Full lifetime access "}
                  </Typography>{" "}
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
              overflowY: "auto",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#2d2f31",
                width: "100%",
                maxHeight: "475px",
                pb: 6,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "58.5%",
                  display: "flex",
                  flexDirection: "column",
                  color: "white",
                  pt: 4,
                }}
              >
                <Box
                  sx={{
                    width: "64.5%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "14px", color: "#c0c4fc", fontWeight: 600 }}
                  >
                    Category {"> "}
                    {data.category.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "32px",
                      mt: 4,
                      lineHeight: 1.2,
                    }}
                  >
                    {data.title}
                  </Typography>
                  <Typography sx={{ fontSize: "19px", mt: 2 }}>
                    {data.subtitle}
                  </Typography>
                  <Box sx={{ display: "flex", mt: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        fontSize: "14px",
                        mr: 0.5,
                        color: "goldenrod",
                        alignContent: "start",
                      }}
                    >
                      {data.average_rating}
                    </Typography>
                    <Rating
                      name="read-only"
                      value={data.average_rating}
                      readOnly
                      sx={{ fontSize: "15px", mt: 0.3 }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        mr: 0.1,
                        color: "#c0c4fc",
                        ml: 0.3,
                      }}
                    >
                      ({data.num_ratings} ratings)
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 500, mr: 0.5, ml: 1 }}
                    >
                      48,859 students
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", mt: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 500, mr: 0.5, fontSize: "14px" }}
                    >
                      Created by
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 500, ml: 0.1, color: "#c0c4fc" }}
                    >
                      {data.author.first_name} {data.author.last_name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", mt: 2, alignItems: "center" }}>
                    <UpdateIcon fontSize="small" />
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 400, fontSize: "15px", mr: 0.5, ml: 1 }}
                    >
                      Last updated {dayjs(data.last_update).format("MM/YYYY")}
                    </Typography>
                    <LanguageIcon fontSize="small" sx={{ ml: 3 }} />
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 400, mr: 0.5, ml: 1, fontSize: "14px" }}
                    >
                      English
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                width: "58.5%",
                display: "flex",
                flexDirection: "column",
                pt: 3,
              }}
            >
              <Box sx={{ display: "felx", width: "64.5%", mb: 30 }}>
                <Box
                  sx={{ border: "1px solid #d1d7dc", p: 2, display: "block",pl:3 }}
                >
                  <Typography
                    sx={{
                      fontSize: "24px",
                      fontWeight: 700,
                      lineHeight: 1,
                      pt: 2,
                    }}
                  >
                    {"What you'll learn"}
                  </Typography>{" "}
                  {data.objectives.map((o, index) => {
                    return (
                      <Box
                        key={index}
                        sx={{ display: "flex", alignItems: "center", mt: 2 }}
                      >
                        <CheckIcon fontSize="small" />
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: "13px",
                            lineHeight: 1,
                            ml: 2,
                          }}
                        >
                          {o}
                        </Typography>{" "}
                      </Box>
                    );
                  })}
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: "24px", mt: 4 }}>
                    Course content
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 3,
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: 400, fontSize: "14px", mt: 4 }}
                    >
                      {data.sections.length} sections •  lectures • 12h 26m total length
                    </Typography>
                    <Typography
                      sx={{ fontWeight: 400, fontSize: "14px", mt: 4 }}
                    >
                      Expand all sections
                    </Typography>
                  </Box>   {data.sections.map((s,index)=>{
                                   return   <MyAccordian section={s} />
                  })}
                  
                  <Box sx={{ position: "relative", width: "100%" }}>
                    <Collapse in={collapsed} collapsedSize={300}>
                      <Box>
                        <Typography
                          sx={{ fontWeight: 700, fontSize: "24px", mt: 4 }}
                        >
                          Requirements
                        </Typography>
                        <Box>
                          <ul style={{ paddingLeft: "20px" }}>
                            {}
                            <li>
                              {" "}
                              <Typography sx={{ fontSize: "14px", mb: 1.5 }}>
                                {data.requirements}
                              </Typography>{" "}
                            </li>
   
                          </ul>
                        </Box>
                      </Box>
                      <Box>
                        <Typography
                          sx={{ fontWeight: 700, fontSize: "24px", mt: 4 }}
                        >
                          Description
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                          <Typography sx={{ fontSize: "14px", mb: 1.5 }}>
                           {data.description}
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        <Typography
                          sx={{ fontWeight: 700, fontSize: "24px", mt: 4 }}
                        >
                          Who this course is for:
                        </Typography>
                        <Box>
                          <ul style={{ paddingLeft: "20px" }}>
                            <li>
                              {" "}
                              <Typography sx={{ fontSize: "14px", mb: 1.5 }}>
                                {data.target_audience}
                              </Typography>{" "}
                            </li>

                          </ul>
                        </Box>
                      </Box>
                    </Collapse>

                    {/* Add the blur effect when collapsed */}
                    {!collapsed && (
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "100%",
                          height: "50px",
                          background:
                            "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
                          zIndex: 1,
                        }}
                      />
                    )}
                  </Box>
                  <Button
                    onClick={() => {
                      setCollapsed(!collapsed);
                    }}
                    color="secondary"
                    disableRipple
                    disableElevation
                    sx={{
                      backgroundColor: "transparent",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                      mt: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "14px",
                      }}
                    >
                      {collapsed ? (
                        <>
                          Show less <ArrowDropUpIcon />
                        </>
                      ) : (
                        <>
                          Show more <ArrowDropDownIcon />
                        </>
                      )}
                    </Box>
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

export default CourseDetail;
