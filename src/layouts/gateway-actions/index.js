import Grid from "@mui/material/Grid";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";


// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import GatewayTable from "layouts/gateway-actions/components/table";
import CreateGateway from "layouts/gateway-actions/components";

function CreateTenantGateway() {
  return (
    <DashboardLayout>
    <DashboardNavbar />
      <SoftBox justifyContent="center" alignItems="center" mb={3} mt={2}>
        <Grid >
        <CreateGateway></CreateGateway>
        </Grid>
      </SoftBox>
      <SoftBox mb={3}>
      <GatewayTable></GatewayTable>
      </SoftBox>   
    <Footer />
  </DashboardLayout>
);
}

export default CreateTenantGateway;