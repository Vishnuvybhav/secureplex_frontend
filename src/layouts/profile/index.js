import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Overview page components
import Header from "layouts/profile/components/Header";

function Overview() {
  // State to store user details
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    mobile: "",
    email: "",
    gender: "", // Default location if not available in localStorage
  });

  // Fetch user details from localStorage on component mount
  useEffect(() => {
    const userName = localStorage.getItem("userName") || "N/A";
    const userEmail = localStorage.getItem("userEmail") || "N/A";
    const userPhone = localStorage.getItem("userPhone") || "N/A";
    const userGender = localStorage.getItem("userGender") || "N/A";

    // Set the user details to state
    setUserDetails({
      fullName: userName,
      mobile: userPhone,
      email: userEmail,
      gender: userGender, // You can update this if needed
    });
  }, []);

  return (
    <DashboardLayout>
      <Header />
      <SoftBox mt={5} mb={8}>
        <Grid container spacing={1} ml={2} justifyContent="space-between">
          <Grid item xs={12} md={6} xl={4}>
            <ProfileInfoCard
              title="profile information"
              info={{
                fullName: userDetails.fullName,
                mobile: userDetails.mobile,
                email: userDetails.email,
                gender: userDetails.gender,
              }}
              action={{ route: "", tooltip: "Edit Profile" }}
            />
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
