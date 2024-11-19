import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import useAxios from "../utils/useAxios";
import TeacherVerticalCard from '../components/mui/TeacherVerticalCard'
function TeacherCourseAdd() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const  axiosInstance  = useAxios();
  const navigate = useNavigate()
  const GetData = async () => {
    try {
      const response = await axiosInstance.get("/course/teacher/courses");
      setData(response.data)
      console.log(response.data)

    } catch (error) {
      console.error(error);
    }finally{
        setLoading(false)
    }
  };

  useEffect(()=>{
    GetData()
  },[])
  const DeleteCourse = ()=>{
    console.log('deleted')
  }
  return (
    <Box sx={{ width: "75%" }}>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: { xs: "24px", md: "40px" },
          lineHeight: 1,
        }}
      >
        Courses
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 7 }}>
        <Box>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              borderRadius: "0px",
              height: "48px",
              width: "130px",
              mr: 5,
            }}
          >
            Search
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              borderRadius: "0px",
              height: "48px",
              width: "130px",
            }}
          >
            Fitler{" "}
          </Button>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={()=>{navigate('/teacher/courses/add')}}
          sx={{
            borderRadius: "0px",
            height: "48px",
            width: "130px",
          }}
        >
          New course
        </Button>
      </Box>
      <Box sx={{ mt: 4 }}>
        {/* CARD */}
          {loading?'loading...':
        <Box
        
        >
            {data.map((c , index)=>{
             return (<Box key={index} sx={{mt:3}}>
                    <TeacherVerticalCard course={c} DeleteCourse={DeleteCourse}/>
                </Box>)  
            })}


        </Box>
    }
        {/* CARD */}
      </Box>
    </Box>
  );
}

export default TeacherCourseAdd;
