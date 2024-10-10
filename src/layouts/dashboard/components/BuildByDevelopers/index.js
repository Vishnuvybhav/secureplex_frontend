import React, { useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import axios from "axios";
import axiosInstance from "AxiosInstance.js"; 


// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { Alert } from '@mui/material';
// Images
import wavesWhite from "assets/images/shapes/waves-white.svg";
import rocketWhite from "assets/images/illustrations/rocket-white.png";

function BuildByDevelopers() {

  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    tenant_admin: "",
  });

  const [message, setMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to your API endpoint
      console.log(formData.domain, "formData",formData.name, formData.tenant_admin);
      const response = await axiosInstance.post("/tenant/", formData);
      console.log("response", response);  
      // Handle success response
      setMessage("Tenant added successfully!");
    } catch (error) {
      // Handle error              
      console.log("message", error);
      setMessage("Error adding tenant. Please try again.");
    }
  };


  return (
    <Card>
      <SoftBox>
      {message && (
                  <Alert mt={2} severity="success">
                    {message}
                  </Alert>
                )}
        <Grid >
          <Grid >
            <SoftBox>
              <SoftTypography mb={2} mt={3} ml={3} variant="h6" fontWeight="bold" gutterBottom>
                Add Tenant Details
              </SoftTypography>
              <SoftBox mb={4} ml={3} mr={3}>
              <form onSubmit={handleSubmit}>
                <SoftBox mb={3}>
                <SoftInput
                    name="name"
                    placeholder="Name"
                    icon={{ component: <Icon>person</Icon>, direction: "left" }}
                    size="medium"
                    onChange={handleInputChange} // Track changes
                    value={formData.name}
                    required
                  />
                </SoftBox>
                <SoftBox mb={3}>
                <SoftInput
                    name="domain"
                    placeholder="Domain"
                    icon={{ component: <Icon>public</Icon>, direction: "left" }}
                    size="medium"
                    onChange={handleInputChange} // Track changes
                    value={formData.domain}
                    required
                  />
                </SoftBox>
                <SoftBox mb={3}>
                <SoftInput
                    name="tenant_admin"
                    placeholder="Admin Email"
                    type="email"
                    icon={{ component: <Icon>email</Icon>, direction: "left" }}
                    size="medium"
                    onChange={handleInputChange} // Track changes
                    value={formData.admin_email}
                    required
                  />
                </SoftBox>
                <SoftButton type="submit" variant="gradient" color="success">
                  Create
                </SoftButton>
              </form>
              </SoftBox>
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
    </Card>
  );
}

export default BuildByDevelopers;
