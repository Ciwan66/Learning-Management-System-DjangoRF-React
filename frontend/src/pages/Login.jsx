import React from "react";
import MyButton from "../components/mui/MyButton";
import MyPassField from "../components/mui/MyPassField";
import MyTextField from "../components/mui/MyTextField";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
function Login() {
  const {loginUser} = useContext(AuthContext)
  const { handleSubmit, control } = useForm();
  const SubmitForm = (data) => {
    console.log(data.email);
    loginUser(data.email,data.password);
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
            backgroundColor:'#fff',
            boxShadow:3,
            height: "500px",
            width: "400px",
            display: "flex",
            flexDirection: "column",
            padding: 3,
          }}
        >
          <Box sx={{display:'flex', height:"150px"}}>
          <Typography
              variant="h6"

              sx={{ display: { xs: "none", sm: "block", fontWeight: "600",fontSize:'40px',textAlign:'center'} }}
            >
              Log in to your Udemy account
            </Typography>
          </Box>
          <Box sx={{mb:3}}>
            {" "}
            <MyTextField label="Email" name="email" control={control} />
          </Box>
          <Box sx={{mb:3}}>
            {" "}
            <MyPassField label="Password" name="password" control={control} />
          </Box>
          <Box sx={{height:'50px'}}>
            {" "}
            <MyButton label="Login" type="submit" />
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default Login;
