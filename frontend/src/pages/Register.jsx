import React from "react";
import MyButton from "../components/mui/MyButton";
import MyPassField from "../components/mui/MyPassField";
import MyTextField from "../components/mui/MyTextField";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
function Register() {
  const { handleSubmit, control } = useForm();
  const {registerUser} = useContext(AuthContext)
  const SubmitForm = (data) => {
    const is_student = true
    const is_teacher = false
    registerUser(data.first_name, data.last_name, data.email,is_student,is_teacher,data.password)
  };
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit(SubmitForm)}>
        <Box
          sx={{
            backgroundColor: "#fff",
            boxShadow: 3,
            height: "500px",
            width: "400px",
            display: "flex",
            flexDirection: "column",
            padding: 3,
          }}
        >
          <Box sx={{ display: "flex", height: "150px" }}>
            <Typography
              variant="h6"
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                  fontWeight: "600",
                  fontSize: "40px",
                  textAlign: "center",
                },
              }}
            >
              Sign up and start learning
            </Typography>
          </Box>
          <Box sx={{ mb: 3, display: "flex",justifyContent:'space-between'}}>
            {" "}
            <Box sx={{width:"48%"}}>
              <MyTextField
                label="First Name"
                name="first_name"
                control={control}
              />
            </Box>
            <Box sx={{width:"50%"}}>
              <MyTextField
                label="Last Name"
                name="last_name"
                control={control}
              />
            </Box>
          </Box>
          <Box sx={{ mb: 3 }}>
            {" "}
            <MyTextField label="Email" name="email" control={control} />
          </Box>
          <Box sx={{ mb: 3 }}>
            {" "}
            <MyPassField label="Password" name="password" control={control} />
          </Box>
          <Box sx={{ height: "50px" }}>
            {" "}
            <MyButton label="Login" type="submit"  color="success" />
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default Register;
