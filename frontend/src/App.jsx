import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import "./App.css";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@emotion/react";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from './utils/PrivateRoute'
import StudentPrivateRoute from './utils/StudentPrivateRoute'
import TeacherPrivateRoute from './utils/TeacherPrivateRoute'
import CourseDetail from "./pages/CourseDetail";
function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#2d2f31',

      },
      secondary: {
        main: '#a435f0',
      },
    },
    typography: {
      "fontFamily": "arial",
      text:{
        primary: "#2D2F31"
      },
      button: {
        textTransform: 'none',
        fontWeight:700,
        fontSize:'16px',
      }
      
 
     }
  });
  return (
    <>
    <ThemeProvider theme={theme}>
    <AuthProvider>

      <Navbar>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/course/detail/:course_id" element={<CourseDetail/>} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/student" element={<StudentPrivateRoute/>}>
          <Route index element={<StudentDashboard />} />

          </Route>

          <Route path="/teacher" element={""}>
            <Route index element={<TeacherDashboard />} />
          </Route>
        </Routes>
      </Navbar>
      </AuthProvider>

      </ThemeProvider>
    </>
  );
}

export default App;
