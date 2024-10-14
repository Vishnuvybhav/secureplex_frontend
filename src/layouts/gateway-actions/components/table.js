import React, { useEffect, useState } from "react";
import axiosInstance from "AxiosInstance"; // Import your Axios instance

// Soft UI Dashboard React examples
import Table from "examples/Tables/Table";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import { Alert } from "@mui/material";
import { Password } from "@mui/icons-material";

function GatewayTable() {
  const [gateways, setGateways] = useState([]); // State to hold the gateway data
  const [error, setError] = useState(null); // State to handle error messages

  // Fetch data from the /gateway endpoint
  useEffect(() => {
    const fetchGateways = async () => {
      try {
        const response = await axiosInstance.get("/gateway");
        setGateways(response.data.data || []); // Set the gateways state with the fetched data
      } catch (err) {
        setError("Error fetching gateway data. Please try again.");
        console.error("Error fetching gateways:", err);
      }
    };

    fetchGateways();
  }, []);

  // Map the gateways data to rows for the table
  const rows = gateways.map((gateway) => ({
    Name: <SoftBox>{gateway.name || "N/A"}</SoftBox>,
    Location: <SoftBox>{gateway.location || "N/A"}</SoftBox>,
    // action: (
    //   <SoftBox display="flex" justifyContent="center" gap={1}>
    //     <SoftButton color="secondary" variant="gradient">
    //       Edit
    //     </SoftButton>
    //   </SoftBox>
    // ),
  }));

  return (
    <SoftBox>
      {/* Display error message if there's an error */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Render the table */}
      <Table
        columns={[
          { name: "Name", align: "left" },
          { name: "Location", align: "center" },
          // { name: "action", align: "center" },
        ]}
        rows={rows}
      />
    </SoftBox>
  );
}

export default GatewayTable;
