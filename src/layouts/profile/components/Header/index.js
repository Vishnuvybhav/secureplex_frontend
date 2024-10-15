import React, { useState, useEffect } from "react";
import axiosInstance from "AxiosInstance.js"; // Use axiosInstance for API requests

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import SoftInput from "components/SoftInput";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Soft UI Dashboard React icons
import Cube from "examples/Icons/Cube";
import Document from "examples/Icons/Document";

// Soft UI Dashboard React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import curved0 from "assets/images/curved-images/curved0.jpg";

function Header() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(1); // Set initial value to something other than 0
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    phone: "",
    email: "",
    gender: "",
    role: "",
    country_code: "",
  });

  // Retrieve user details from localStorage on component mount
  useEffect(() => {
    const userName = localStorage.getItem("userName") || "N/A";
    const userEmail = localStorage.getItem("userEmail") || "N/A";
    const userPhone = localStorage.getItem("userPhone") || "N/A";
    const userGender = localStorage.getItem("userGender") || "N/A";
    const userRole = localStorage.getItem("userRole") || "N/A";

    setUserDetails({
      fullName: userName,
      phone: userPhone,
      email: userEmail,
      gender: userGender,
      role: userRole,
    });
  }, []);

  useEffect(() => {
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    window.addEventListener("resize", handleTabsOrientation);
    handleTabsOrientation();

    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 0) {
      setDialogOpen(true); // Open the dialog when "Edit Profile" is clicked
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // Handle form submission with a PATCH request using axiosInstance
  const handleFormSubmit = async () => {
    const userId = localStorage.getItem("userId"); // Assume user ID is stored in localStorage
    const updatedData = {
      name: userDetails.fullName,
      phone: userDetails.phone,
      country_code: userDetails.country_code,
    };

    try {
      console.log("User data to be sent:", updatedData);
      const response = await axiosInstance.patch(`/user/profile/${userId}/`, updatedData);
      console.log("User updated successfully!", response.data);
      localStorage.setItem("userName", response.data.data[0].name);
      localStorage.setItem("userPhone", response.data.data[0].phone);
      // Handle success, maybe show a success message
      setDialogOpen(false);
    } catch (error) {
      // Handle error, show an error message
      console.error("Failed to update user details", error);
    }
  };

  return (
    <SoftBox position="relative">
      <DashboardNavbar absolute light />
      <SoftBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="10.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${curved0})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            {/* Optionally, you can add an avatar here if needed */}
          </Grid>
          <Grid item>
            <SoftBox height="100%" mt={0.5} lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium">
                {userDetails.fullName}
              </SoftTypography>
              <SoftTypography variant="button" color="text" fontWeight="medium">
                {userDetails.role}
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs
                orientation={tabsOrientation}
                value={tabValue}
                onChange={handleSetTabValue}
                sx={{ background: "transparent" }}
              >
                <Tab label="Edit Profile" icon={<Cube />} />
                <Tab label="Change Password" icon={<Document />} />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
      </Card>

      {/* Edit Profile Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <SoftBox mb={3} mr={3} mt={1}>
            <SoftInput
              name="name"
              placeholder="Name"
              icon={{ component: <Icon>person</Icon>, direction: "left" }}
              size="medium"
              value={userDetails.fullName}
              onChange={(e) => setUserDetails({ ...userDetails, fullName: e.target.value })}
              required
            />
          </SoftBox>
          <SoftBox mr={3}>
            <PhoneInput
              country={userDetails?.country_code || "us"}
              value={userDetails?.phone || ""}
              onChange={(phone, countryData) =>
                setUserDetails({
                  ...userDetails,
                  phone,
                  country_code: countryData.countryCode,
                })
              }
              inputStyle={{ width: "100%" }}
            />
          </SoftBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </SoftBox>
  );
}

export default Header;
