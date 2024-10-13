// Soft UI Dashboard React examples
import Table from "examples/Tables/Table";
import SoftPagination from "components/SoftPagination";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";


function GatewayTable() {
  return (  
<Table
  // pagination={<SoftPagination />}
  columns={[
    { name: "Name", align: "left" },
    { name: "Location", align: "center" },
    { name: "action", align: "center" },
  ]}
  rows={[
    // {
    //   Name:  (
    //     <SoftBox sx={{ marginleft: "35px" }}>10.1.78.22:8081</SoftBox>
    //   ),
    //   Location: (
    //     <SoftBox sx={{ marginRight: "35px" }}>10.1.78.22:8081</SoftBox>
    //   ),
    //   action:(
    //     <SoftBox display="flex" justifyContent="center" gap={1}>
    //       <SoftButton color="secondary" variant="gradient">
    //         Edit
    //       </SoftButton>
    //     </SoftBox>
    //   ),
    // },
    {
        Name: "john@user.com",
        Location: "Chennai",
        action:(
          <SoftBox display="flex" justifyContent="center" gap={1}>
            <SoftButton color="secondary" variant="gradient">
              Edit
            </SoftButton>
          </SoftBox>
        ),
      },
      {
        Name: "john@user.com",
        Location: "Coimbatore",
        action:(
          <SoftBox display="flex" justifyContent="center" gap={1}>
            <SoftButton color="secondary" variant="gradient">
              Edit
            </SoftButton>
          </SoftBox>
        ),
      },
      {
        Name: "john@user.com",
        Location: "Delhi",
        action:(
          <SoftBox display="flex" justifyContent="center" gap={1}>
            <SoftButton color="secondary" variant="gradient">
              Edit
            </SoftButton>
          </SoftBox>
        ),
      },
      {
        Name: "john@user.com",
        Location: "Kolkata",
        action:(
          <SoftBox display="flex" justifyContent="center" gap={1}>
            <SoftButton color="secondary" variant="gradient">
              Edit
            </SoftButton>
          </SoftBox>
        ),
      },
      {
        Name: "john@user.com",
        Location: "Mumbai",
        action:(
          <SoftBox display="flex" justifyContent="center" gap={1}>
            <SoftButton color="secondary" variant="gradient">
              Edit
            </SoftButton>
          </SoftBox>
        ),
      },
  ]}
   
/>
)
}
export default GatewayTable;