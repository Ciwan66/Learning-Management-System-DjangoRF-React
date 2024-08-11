import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import "./App.css";
import TeacherCourseAdd from "./pages/TeacherCourseAdd";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import StudentPrivateRoute from "./utils/StudentPrivateRoute";
import Course from "./pages/Course";
import CourseDetail from "./pages/CourseDetail";
import StudentProfilePage from "./pages/StudentProfilePage";
import Cart from "./pages/Cart";
import MyLearnings from "./pages/MyLearnings";
import CourseReviews from "./components/CourseReviews";
import CourseOverview from "./components/CourseOverview";
import Sidebar from "./components/Sidebar";
import { Box } from "@mui/material";
function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#2d2f31",
      },
      secondary: {
        main: "#a435f0",
      },
    },
    typography: {
      fontFamily: "arial",
      text: {
        primary: "red",
      },
      button: {
        textTransform: "none",
        fontWeight: 700,
        fontSize: "16px",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <Navbar>
                  <Home />{" "}
                </Navbar>
              }
            />
            <Route path="*" element={<Box>404 Error</Box>} />

            <Route
              path="/my-courses/learning"
              element={<Navbar><StudentPrivateRoute Component={MyLearnings} /></Navbar>}
            />
            <Route
              path="/my-courses/wishlist"
              element={<Navbar><StudentPrivateRoute Component={MyLearnings} /></Navbar>}
            />

            <Route
              path="/course/:course_id/watch/lecture/:lecture_id/"
              element={<Navbar><StudentPrivateRoute Component={Course} /></Navbar>}
            />

            <Route
              path="/course/detail/:course_id"
              element={<Navbar><CourseDetail /></Navbar>}
            />
            <Route path="/course/cart" element={<Navbar><Cart /></Navbar>} />

            <Route path="/login" element={<Navbar><Login /></Navbar>} />
            <Route path="/register" element={<Navbar><Register /></Navbar>} />

            <Route
              path="/student/dashboard"
              element={<StudentPrivateRoute Component={<Navbar><StudentDashboard/></Navbar>} />}
            />
            <Route
              path="/student/profile"
              element={<StudentPrivateRoute Component={<Navbar><StudentProfilePage/></Navbar>} />}
            />

            <Route path="/teacher" element={<Sidebar/>}>
              <Route index element={<TeacherDashboard />} />
              <Route path="dashboard" element={<TeacherDashboard />} />
              <Route path="courses" element={<TeacherCourseAdd />} />
            </Route>
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
