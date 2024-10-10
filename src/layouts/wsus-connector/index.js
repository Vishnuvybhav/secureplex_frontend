import Grid from "@mui/material/Grid";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";


// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";

// import Table from "examples/Tables/Table";
import Tables from "layouts/tables";
// import TenantTable from "layouts/dashboard/components/TenantDatatable";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import PaginatorBasicDemo from "layouts/dashboard/components/TenantDatatable";
import WsusConnector from "layouts/wsus-connector/components";
import WsusConnectorTable from "layouts/wsus-connector/components/table";



function WsusConnectorform() {

  return (
    <DashboardLayout>
      <DashboardNavbar />
        <SoftBox justifyContent="center" alignItems="center" mb={3} mt={2}>
          <Grid >
            <WsusConnector></WsusConnector>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <WsusConnectorTable/>
        </SoftBox>   
      <Footer />
    </DashboardLayout>
  );
}

export default WsusConnectorform;
