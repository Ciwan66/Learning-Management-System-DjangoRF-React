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
import Cart from "./pages/Cart";
import MyLearnings from "./pages/MyLearnings";
import { Box } from "@mui/material";
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
        primary: "red"
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
          <Route path='*' element={(<Box>404 Error</Box>)} />
          <Route path='my-courses/learning' element={<MyLearnings/>}/>
          <Route path='my-courses/wishlist' element={<MyLearnings/>}/>


          <Route path="/course/detail/:course_id" element={<CourseDetail/>} />
          <Route path="/course/cart" element={<Cart/>} />



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
