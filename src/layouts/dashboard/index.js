/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
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



function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
        <SoftBox justifyContent="center" alignItems="center" mb={3} mt={2}>
          <Grid >
            <BuildByDevelopers />
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <PaginatorBasicDemo/> 
        </SoftBox>   
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
