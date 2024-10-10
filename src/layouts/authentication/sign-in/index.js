import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "AxiosInstance.js"; // Import the axios instance
import { toast } from "react-toastify"; // Import toast

// Material UI components
import Switch from "@mui/material/Switch";
import SoftAlert from "components/SoftAlert";
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
      navigate("/dashboard");
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
        localStorage.setItem("accessToken", response.data.access);
        // localStorage.setItem("refreshToken", response.data.refresh);

        // Redirect to /redirect on successful login
        navigate("/redirect");
      } else {
        // Handle other status codes (e.g., 401 Unauthorized)
        // toast.error("Invalid email or password.");
        setError("Invalid email or password.");
      }
    } catch (error) {
      // Set the error message on failure
      // toast.error("Invalid email or password.");
      setError("Invalid email or password.");
    }
  };

  return (
    <CoverLayout title="Welcome back" image={curved9}>
      <SoftBox component="form" role="form" onSubmit={handleSubmit}>
        {/* {error && <SoftAlert severity="error" color="error" dismissible="true">{error}</SoftAlert>} */}
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
          {/* <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SoftTypography> */}
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton type="submit" variant="gradient" color="info" fullWidth>
            Sign In
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          {/* <SoftTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SoftTypography>
          </SoftTypography> */}
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
export { SignIn };
