import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "AxiosInstance.js"; // Import the axios instance

// Material UI components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import { Alert } from '@mui/material';
// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // To redirect on successful login

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // If token exists, redirect to the dashboard
      navigate("/profile");
    }
  }, [navigate]);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginData = { email, password };

    try {
      const response = await axiosInstance.post("/auth/login/", loginData);
      console.log(response, "response");

      if (response.status === 200) {
        // Save the access and refresh tokens
        console.log(response.data, "user login data");
        
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("userId", response.data.data.id);
        localStorage.setItem("userName", response.data.data.name);
        localStorage.setItem("userEmail", response.data.data.email);
        localStorage.setItem("userPhone", response.data.data.phone);

        const userRole = response.data.data.role[0].name;
        localStorage.setItem("userRole", userRole);
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error:", error);
      // If the error response has a message field, set it as the error message
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); // Extract the message from the response
      } else {
        // Set a generic error message if the specific message is not available
        setError("Invalid email or password.");
      }
      console.error("Error:", error);
    }
  };

  return (
    <CoverLayout title="Welcome back" image={curved9}>
      <SoftBox component="form" role="form" onSubmit={handleSubmit}>
        {/* Display error message if any */}
        {error && <Alert severity="error">{error}</Alert>}

        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          {/* Add a switch for Remember Me if needed */}
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton type="submit" variant="gradient" color="info" fullWidth>
            Sign In
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
export { SignIn };
