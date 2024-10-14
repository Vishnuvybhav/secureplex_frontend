import React, { useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import axiosInstance from "AxiosInstance.js"; // Import your axios instance
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { Alert } from "@mui/material";

function CreateGateway() {
  // State to hold form data
  const [gatewayName, setGatewayName] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null); // State to handle success/error message
  const [alertType, setAlertType] = useState("success");

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the page from reloading on form submit

    // Create a FormData object and append the form fields
    const formData = new FormData();
    formData.append("name", gatewayName);
    formData.append("location", location);
    formData.append("password", password);

    try {
      // Make the POST request using axiosInstance with FormData
      console.log("Creating gateway with FormData:", gatewayName, location, password);
      const response = await axiosInstance.post("/gateway/create/", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for FormData
        },
      });
      console.log("Gateway created:", response.data);
      // Handle successful response
      setMessage("Gateway created successfully!");
      setAlertType("success");

      // Clear the form fields after submission
      setGatewayName("");
      setLocation("");
      setPassword("");
    } catch (error) {
      // Handle error response
      setMessage("Error creating gateway. Please try again.");
      setAlertType("error");
      console.error("Error creating gateway:", error);
    }
  };

  return (
    <Card>
      <SoftBox>
        {/* Display success or error messages */}
        {message && (
          <Alert mt={2} severity={alertType}>
            {message}
          </Alert>
        )}
        <Grid>
          <Grid>
            <SoftBox>
              <SoftBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
                mt={3}
                ml={3}
              >
                <SoftTypography variant="h6" fontWeight="bold" gutterBottom>
                  Create Gateway
                </SoftTypography>
              </SoftBox>
              <SoftBox mb={4} ml={3} mr={3}>
                <form onSubmit={handleSubmit}>
                  {/* First Row: Gateway Name */}
                  <Grid item xs={12} md={6} mt={2}>
                    <SoftInput
                      name="gatewayName"
                      placeholder="Gateway Name"
                      type="text"
                      icon={{ component: <Icon>public</Icon>, direction: "left" }}
                      size="medium"
                      value={gatewayName} // Bind value to state
                      onChange={(e) => setGatewayName(e.target.value)} // Update state on change
                      required
                    />
                  </Grid>
                  {/* Second Row: Location */}
                  <Grid item xs={12} mt={3} md={6}>
                    <SoftInput
                      name="location"
                      placeholder="Location"
                      type="text"
                      icon={{ component: <Icon>location_on</Icon>, direction: "left" }}
                      size="medium"
                      value={location} // Bind value to state
                      onChange={(e) => setLocation(e.target.value)} // Update state on change
                      required
                    />
                  </Grid>
                  {/* Third Row: Password */}
                  <Grid item xs={12} mt={3} md={6}>
                    <SoftInput
                      name="password"
                      placeholder="Password"
                      type="password"
                      icon={{ component: <Icon>password</Icon>, direction: "left" }}
                      size="medium"
                      value={password} // Bind value to state
                      onChange={(e) => setPassword(e.target.value)} // Update state on change
                      required
                    />
                  </Grid>
                  {/* Submit Button */}
                  <SoftBox mt={3}>
                    <SoftButton type="submit" variant="gradient" color="success">
                      Create Gateway
                    </SoftButton>
                  </SoftBox>
                </form>
              </SoftBox>
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
    </Card>
  );
}

export default CreateGateway;
