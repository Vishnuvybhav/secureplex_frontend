import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Alert } from '@mui/material';
import axiosInstance from "AxiosInstance.js"; 

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

function WsusConnector() {
  const [selectedGateway, setSelectedGateway] = useState(""); // State for selected gateway
  const [gateways, setGateways] = useState([]); // State to hold the fetched gateways
  const [formData, setFormData] = useState({
    ip_address: "",
    hostname: "",
    location: "",
    sync_schedule: "", // This will now hold both date and time
    secret_id: "",
    password: ""
  }); // State to hold form input values
  const [error, setError] = useState(null); // State to handle any errors
  const [success, setSuccess] = useState(null); // State to show success message

  // Fetch gateways from the backend
  useEffect(() => {
    const fetchGateways = async () => {
      try {
        const response = await axiosInstance.get("/gateway");
        if (response.data.status) {
          setGateways(response.data.data); // Set the gateways data in state
        } else {
          setError("Failed to fetch gateways");
        }
      } catch (error) {
        console.error("Error fetching gateways:", error);
        setError("Error fetching gateways");
      }
    };

    fetchGateways();
  }, []);

  // Automatically clear error/success messages after 2 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 2000); // Clear after 2 seconds
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [error, success]);

  const handleGatewayChange = (event) => {
    setSelectedGateway(event.target.value); // Set the selected gateway
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload on form submit

    // Prepare the data to be sent in the POST request
    const postData = {
      ...formData,
      gateway: selectedGateway, // Include the selected gateway in the formData
    };

    try {
      // Make the POST request to create a WSUS connection
      const response = await axiosInstance.post("/wsusconnections/", postData);
      
      // On successful response, show success message and reset the form
      setSuccess("WSUS connection successfully added!");
      setError(null); // Clear any previous errors
      setFormData({
        ip_address: "",
        hostname: "",
        location: "",
        sync_schedule: "",
        password: ""
      }); // Reset form data
      setSelectedGateway(""); // Reset gateway selection

    } catch (error) {
      // If there is an error, extract the error message from the response
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); // Display the error message from the response
      } else if (error.message) {
        setError(error.message); // General error message if no response message is found
      } else {
        setError("An error occurred while creating the WSUS connection."); // Fallback error message
      }
      setSuccess(null); // Clear any previous success messages
    }
  };

  return (
    <Card>
      <SoftBox>
        {/* Display error or success message */}
        {error && (
          <Alert mt={2} severity="error">
            {error}
          </Alert>
        )}
        {success && (
          <Alert mt={2} severity="success">
            {success}
          </Alert>
        )}
        <Grid>
          <Grid>
            <SoftBox>
              <SoftTypography mb={2} mt={3} ml={3} variant="h6" fontWeight="bold" gutterBottom>
                Create Wsus Connector
              </SoftTypography>
              <SoftBox mb={4} ml={3} mr={3}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    {/* First Row: IP Address and Hostname */}
                    <Grid item xs={12} md={6}>
                      <SoftInput
                        name="ip_address"
                        placeholder="IP Address"
                        icon={{ component: <Icon>person</Icon>, direction: "left" }}
                        size="medium"
                        value={formData.ip_address}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SoftInput
                        name="hostname"
                        placeholder="Hostname"
                        icon={{ component: <Icon>public</Icon>, direction: "left" }}
                        size="medium"
                        value={formData.hostname}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} mt={2}>
                    {/* Second Row: Location and Sync Schedule */}
                    <Grid item xs={12} md={6}>
                      <SoftInput
                        name="location"
                        placeholder="Location"
                        type="text"
                        icon={{ component: <Icon>location_on</Icon>, direction: "left" }}
                        size="medium"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SoftInput
                        name="sync_schedule"
                        placeholder="Sync Schedule"
                        type="datetime-local" // This handles both date and time
                        icon={{ component: <Icon>schedule</Icon>, direction: "left" }}
                        size="medium"
                        value={formData.sync_schedule}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} mt={2}>
                    {/* Third Row: Secret ID and Password */}
                    <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <Select
                          value={selectedGateway}
                          onChange={handleGatewayChange}
                          input={<OutlinedInput startAdornment={<Icon>arrow_forward</Icon>} />}
                          displayEmpty
                          required
                        >
                          <MenuItem value="">
                            <span>Select Gateway</span>
                          </MenuItem>
                          {/* Map gateways fetched from the backend */}
                          {gateways.map((gateway) => (
                            <MenuItem key={gateway.id} value={gateway.id}>
                              {gateway.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SoftInput
                        name="password"
                        placeholder="Password"
                        type="password"
                        icon={{ component: <Icon>password</Icon>, direction: "left" }}
                        size="medium"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>
                  </Grid>

                  <SoftBox mt={3}>
                    <SoftButton type="submit" variant="gradient" color="success">
                      Connect
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

export default WsusConnector;
