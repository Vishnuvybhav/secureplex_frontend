// Soft UI Dashboard React examples
import Table from "examples/Tables/Table";
import SoftPagination from "components/SoftPagination";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

function TenantUsersTable() {
  return (  
<Table
  // pagination={<SoftPagination />}
  columns={[
    { name: "Name", align: "left" },
    { name: "Email", align: "left" },
    { name: "Phone", align: "center" },
    {name:"Role", align:"center"},
    {name:"Gender", align:"center"},
    {name:"Is_Active", align:"center"}, 
    { name: "action", align: "center" },
  ]}
  rows={[
    {
        Name: (
        <SoftBox sx={{ paddingLeft: "15px" }}>Rahul</SoftBox>
      ),
      Email: "john@user.com",
      Phone: "9879879877",
      Is_Active: "True",
      Role: "Analyst",
      Gender:"Male",
      action:(
        <SoftBox display="flex" justifyContent="center" gap={1}>
          <SoftButton color="secondary" variant="gradient">
            Edit
          </SoftButton>
          <SoftButton color="error" variant="gradient">
              Delete
            </SoftButton>
        </SoftBox>
      ),
    },
    {
        Name: (
            <SoftBox sx={{ paddingLeft: "15px" }}>Rahul</SoftBox>
          ),
      
        Email: "john@user.com",
        Phone: "9879879877",
        Is_Active: "True",
        Role: "Analyst",
        Gender: "Male",
        action:(
          <SoftBox display="flex" justifyContent="center" gap={1}>
            <SoftButton color="secondary" variant="gradient">
              Edit
            </SoftButton>
            <SoftButton color="error" variant="gradient">
              Delete
            </SoftButton>
          </SoftBox>
        ),
      },
      {
        Name:  (
            <SoftBox sx={{ paddingLeft: "15px" }}>Rahul</SoftBox>
          ),
      
        Email: "john@user.com",
        Phone: "9879879877",
        Is_Active: "True",
        Role: "Genral User",
        Gender:"Male",
        action:(
          <SoftBox display="flex" justifyContent="center" gap={1}>
            <SoftButton color="secondary" variant="gradient">
              Edit
            </SoftButton>
            <SoftButton color="error" variant="gradient">
              Delete
            </SoftButton>
          </SoftBox>
        ),
      },
      {
        Name:  (
            <SoftBox sx={{ paddingLeft: "15px" }}>Rahul</SoftBox>
          ),
      
        Email: "john@user.com",
        Phone: "9879879877",
        Is_Active: "True",
        Role: "Analyst",
        Gender:"Male",
        action:(
          <SoftBox display="flex" justifyContent="center" gap={1}>
            <SoftButton color="secondary" variant="gradient">
              Edit
            </SoftButton>
            <SoftButton color="error" variant="gradient">
              Delete
            </SoftButton>
          </SoftBox>
        ),
      },
      {
        Name:  (
            <SoftBox sx={{ paddingLeft: "15px" }}>Rahul</SoftBox>
          ),
      
        Email: "john@user.com",
        Phone: "9879879877",
        Is_Active: "True",
        Role: "Genral User",
        Gender:"Male",
        action:(
          <SoftBox display="flex" justifyContent="center" gap={1}>
            <SoftButton color="secondary" variant="gradient">
              Edit
            </SoftButton>
            <SoftButton color="error" variant="gradient">
              Delete
            </SoftButton>
          </SoftBox>
        ),
      },
      {
        Name: (
            <SoftBox sx={{ paddingLeft: "15px" }}>Rahul</SoftBox>
          ),
        Email: "john@user.com",
        Phone: "9879879877",
        Is_Active: "True",
        Role: "Genral User",
        Gender:"Male",
        action:(
          <SoftBox display="flex" justifyContent="center" gap={1}>
            <SoftButton color="secondary" variant="gradient">
              Edit
            </SoftButton>
            <SoftButton color="error" variant="gradient">
              Delete
            </SoftButton>
          </SoftBox>
        ),
      },
  ]}
   
/>
)
}
export default TenantUsersTable;