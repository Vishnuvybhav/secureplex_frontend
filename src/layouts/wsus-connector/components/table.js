// Soft UI Dashboard React examples
import Table from "examples/Tables/Table";
import SoftPagination from "components/SoftPagination";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

const maskSecretID = (secretID) => {
    const visiblePart = secretID.slice(0, 4); // Get the first 4 characters
    const maskedPart = "*".repeat(secretID.length - 4); // Replace the rest with asterisks
    return `${visiblePart}${maskedPart}`;
  };

function WsusConnectorTable() {
  return (  
<Table
  // pagination={<SoftPagination />}
  columns={[
    { name: "IP_Address", align: "left" },
    { name: "Hostname", align: "left" },
    { name: "Location", align: "center" },
    {name:"Sync_Schedule", align:"center"},
    {name:"Secret_ID", align:"center"}, 
    { name: "action", align: "center" },
  ]}
  rows={[
    {
      IP_Address: (
        <SoftBox sx={{ paddingLeft: "15px" }}>10.1.78.22:8081</SoftBox>
      ),
      Hostname: "john@user.com",
      Location: "Banglore",
      Sync_Schedule: "05.10.2024",
      Secret_ID: maskSecretID("8M4564jgvjhb"),
      action:(
        <SoftBox display="flex" justifyContent="center" gap={1}>
          <SoftButton color="secondary" variant="gradient">
            Edit
          </SoftButton>
        </SoftBox>
      ),
    },
    {
        IP_Address: (
            <SoftBox sx={{ paddingLeft: "15px" }}>10.1.78.22:8081</SoftBox>
          ),
      
        Hostname: "john@user.com",
        Location: "Chennai",
        Sync_Schedule: "05.10.2024",
        Secret_ID: maskSecretID("8M4564jgvjhb"),
        action:(
          <SoftBox display="flex" justifyContent="center" gap={1}>
            <SoftButton color="secondary" variant="gradient">
              Edit
            </SoftButton>
          </SoftBox>
        ),
      },
      {
        IP_Address:  (
            <SoftBox sx={{ paddingLeft: "15px" }}>10.1.78.22:8081</SoftBox>
          ),
      
        Hostname: "john@user.com",
        Location: "Coimbatore",
        Sync_Schedule: "05.10.2024",
        Secret_ID:maskSecretID("8M4564jgvjhb"),
        action:(
          <SoftBox display="flex" justifyContent="center" gap={1}>
            <SoftButton color="secondary" variant="gradient">
              Edit
            </SoftButton>
          </SoftBox>
        ),
      },
      {
        IP_Address:  (
            <SoftBox sx={{ paddingLeft: "15px" }}>10.1.78.22:8081</SoftBox>
          ),
      
        Hostname: "john@user.com",
        Location: "Delhi",
        Sync_Schedule: "05.10.2024",
        Secret_ID:maskSecretID("8M4564jgvjhb"),
        action:(
          <SoftBox display="flex" justifyContent="center" gap={1}>
            <SoftButton color="secondary" variant="gradient">
              Edit
            </SoftButton>
          </SoftBox>
        ),
      },
      {
        IP_Address:  (
            <SoftBox sx={{ paddingLeft: "15px" }}>10.1.78.22:8081</SoftBox>
          ),
      
        Hostname: "john@user.com",
        Location: "Kolkata",
        Sync_Schedule: "05.10.2024",
        Secret_ID:maskSecretID("8M4564jgvjhb"),
        action:(
          <SoftBox display="flex" justifyContent="center" gap={1}>
            <SoftButton color="secondary" variant="gradient">
              Edit
            </SoftButton>
          </SoftBox>
        ),
      },
      {
        IP_Address: (
            <SoftBox sx={{ paddingLeft: "15px" }}>10.1.78.22:8081</SoftBox>
          ),
        Hostname: "john@user.com",
        Location: "Mumbai",
        Sync_Schedule: "05.10.2024",
        Secret_ID:maskSecretID("8M4564jgvjhb"),
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
export default WsusConnectorTable;