import Grid from "@mui/material/Grid";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";


// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import CreateProfile from "layouts/manage-users/components";
import TenantUsersTable from "layouts/manage-users/components/table";

function VerifyKB() {
  return (
    <DashboardLayout>
    <DashboardNavbar />
      <SoftBox justifyContent="center" alignItems="center" mb={3} mt={2}>
        <Grid >
         {/* <CreateProfile></CreateProfile> */}
         <h3>KB Verification</h3>
        </Grid>
      </SoftBox>
      <SoftBox mb={3}>
      {/* <TenantUsersTable></TenantUsersTable> */}
      </SoftBox>   
    <Footer />
  </DashboardLayout>
);
}

export default VerifyKB;