import Grid from "@mui/material/Grid";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";


// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";


function TenantDashboard() {

  return (
    <DashboardLayout>
      <DashboardNavbar />
        <SoftBox justifyContent="center" alignItems="center" mb={3} mt={2}>
          <Grid >
            <h2>Tenant Dashboard</h2>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
        </SoftBox>   
      <Footer />
    </DashboardLayout>
  );
}

export default TenantDashboard;
