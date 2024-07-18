import { jwtDecode } from "jwt-decode";
import { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider =({ children })=> {
  const [authTokens, setauthTokens] = useState(() => 
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() => 
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    const response = await fetch("http://127.0.0.1:8000/api/users/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      console.log("Logged In");
      setauthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    } else {
      console.log(response.status);
      console.log("there was a server issue");
    }}

    const registerUser = async (
      first_name,
      last_name,
      email,
      is_student,
      is_teacher,
      password
    ) => {
      const response = await fetch(
        "http://127.0.0.1:8000/api/users/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            first_name,
            last_name,
            email,
            is_student,
            is_teacher,
            password
          ),
        }
      );

      if (response.status === 201) {
        console.log("User Registered");
        navigate("/login");
    } else {
        console.log(response.status);
        console.log("there was a server issue");
      }
    };
    const logoutUser = () => {
      setauthTokens(null);
      localStorage.removeItem("authTokens");
      setUser(null);
      navigate("/login");
    };
    const contextValues = {
      user,
      setUser,
      authTokens,
      setauthTokens,
      loginUser,
      registerUser,
      logoutUser,
    };
  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);




  return (
    <AuthContext.Provider value={contextValues}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
}
