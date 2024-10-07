// Soft UI Dashboard React examples
import Table from "examples/Tables/Table";
import SoftPagination from "components/SoftPagination";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

function TenantTable() {
  return (  
<Table
  columns={[
    { name: "name", align: "left" },
    { name: "Domain", align: "left" },
    { name: "email", align: "center" },
    { name: "action", align: "center" },
  ]}
  rows={[
    {
      name: ["https://bit.ly/3qzezP5", "John Micheal"],
      Domain: "Programator",
      email: "john@user.com",
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
      name: ["https://bit.ly/3CfVnYA", "Alexa Liras"],
      Domain: "Programator",
      email: "alexa@user.com",
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
      name: ["https://bit.ly/3wM6x6v", "Laurent Perrier"],
      Domain: "Programator",
      email: "laurent@user.com",
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
      name: ["https://bit.ly/3CfVnYA", "Michael Levi"],
      Domain: "Programator",
      email: "michael@user.com",
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
      name: ["https://bit.ly/3qzezP5", "Richard Gran"],
      Domain: "Programator",
      email: "richard@user.com",
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
      name: ["https://bit.ly/3CfVnYA", "Miriam Eric"],
      Domain: "Programator",
      email: "miriam@user.com",
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
export default TenantTable;