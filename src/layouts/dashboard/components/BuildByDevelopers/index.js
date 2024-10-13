import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Button from "@mui/material/Button";
import axiosInstance from "AxiosInstance.js"; 

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { Alert } from '@mui/material';

function BuildByDevelopers() {

  const [formData, setFormData] = useState({
    name: "",
    tenant_domain: "",  // Make sure it's tenant_domain here
    tenant_admin: "",
    domain: "localhost",
  });

  const [message, setMessage] = useState(null);
  const [showAlert, setShowAlert] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log("formData", formData);
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData.domain, "formData", formData.name, formData.tenant_admin, formData.tenant_domain);
      const response = await axiosInstance.post("/tenant/create/", formData);
      console.log("response", response);
      setMessage("Tenant added successfully!");
    } catch (error) {
      console.log("message", error);
      setMessage("Error adding tenant. Please try again.");
    }
  };

  return (
    <Card>
      <SoftBox>
        {showAlert && message && (
          <Alert mt={2} severity="success">
            {message}
          </Alert>
        )}
        <Grid>
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
                    onChange={handleInputChange}
                    value={formData.name}
                    required
                  />
                </SoftBox>
                <SoftBox mb={3}>
                  <SoftInput
                    name="tenant_domain"  // Corrected name attribute here
                    placeholder="Domain"
                    icon={{ component: <Icon>public</Icon>, direction: "left" }}
                    size="medium"
                    onChange={handleInputChange}
                    value={formData.tenant_domain}  // Corrected value binding
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
                    onChange={handleInputChange}
                    value={formData.tenant_admin}
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
      </SoftBox>
    </Card>
  );
}

export default BuildByDevelopers;
