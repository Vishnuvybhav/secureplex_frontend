import React, { useState, useEffect } from "react";
import axiosInstance from "AxiosInstance"; // Use axiosInstance for making API requests

// Soft UI Dashboard React examples
import Table from "examples/Tables/Table";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import SoftInput from "components/SoftInput";
import { Alert } from "@mui/material";

function WsusConnectorTable() {
  const [wsusConnections, setWsusConnections] = useState([]); // State to store WSUS connections data
  const [selectedConnection, setSelectedConnection] = useState(null); // State for selected connection for editing
  const [formData, setFormData] = useState({
    ip_address: "",
    hostname: "",
    location: "",
    sync_schedule: "",
  }); // Form data state
  const [dialogOpen, setDialogOpen] = useState(false); // Dialog open/close state
  const [error, setError] = useState(null); // Error state
  const [success, setSuccess] = useState(null); // Success state

  // Fetch WSUS connections on component mount
  useEffect(() => {
    const fetchWsusConnections = async () => {
      try {
        const response = await axiosInstance.get("/wsusconnections/");
        setWsusConnections(response.data); // Store the fetched data in state
      } catch (error) {
        setError("Failed to fetch WSUS connections data.");
        console.error("Error fetching WSUS connections:", error);
      }
    };

    fetchWsusConnections();
  }, []);

  // Handle opening the edit dialog and setting the pre-filled data
  const handleEditClick = (connection) => {
    setSelectedConnection(connection);
    setFormData({
      ip_address: connection.ip_address,
      hostname: connection.hostname,
      location: connection.location,
      sync_schedule: new Date(connection.sync_schedule).toISOString().slice(0, 16), // Set date-time in the right format
    });
    setDialogOpen(true);
  };

  // Handle input changes for form fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle closing the dialog without saving
  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedConnection(null);
  };

  // Handle form submission and sending the PATCH request
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await axiosInstance.patch(`/wsusconnections/${selectedConnection.id}/`, formData);
      setSuccess("WSUS connection updated successfully!");
      setError(null);

      // Update the local state with the new values
      setWsusConnections((prevConnections) =>
        prevConnections.map((conn) =>
          conn.id === selectedConnection.id ? { ...conn, ...formData } : conn
        )
      );

      setDialogOpen(false); // Close the dialog
      setSelectedConnection(null);
    } catch (error) {
      setError("Failed to update WSUS connection.");
      setSuccess(null);
      console.error("Error updating WSUS connection:", error);
    }
  };

  // Map the fetched data to the rows for the table
  const rows = wsusConnections.map((connection) => ({
    IP_Address: <SoftBox sx={{ paddingLeft: "15px" }}>{connection.ip_address || "N/A"}</SoftBox>,
    Hostname: connection.hostname || "N/A",
    Location: connection.location || "N/A",
    Sync_Schedule: new Date(connection.sync_schedule).toLocaleString() || "N/A",
    action: (
      <SoftBox display="flex" justifyContent="center" gap={1}>
        <SoftButton color="secondary" variant="gradient" onClick={() => handleEditClick(connection)}>
          Edit
        </SoftButton>
      </SoftBox>
    ),
  }));

  return (
    <SoftBox>
      {/* Show error or success message */}
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      {/* Render the WSUS Connector table */}
      <Table
        columns={[
          { name: "IP_Address", align: "left" },
          { name: "Hostname", align: "left" },
          { name: "Location", align: "center" },
          { name: "Sync_Schedule", align: "center" },
          { name: "action", align: "center" },
        ]}
        rows={rows}
      />

      {/* Edit WSUS Connection Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit WSUS Connection</DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <SoftBox mb={3}>
              <SoftInput
                name="ip_address"
                icon={{ component: <Icon>person</Icon>, direction: "left" }}
                size="medium"
                placeholder="IP Address"
                value={formData.ip_address}
                onChange={handleInputChange}
                required
              />
            </SoftBox>
            <SoftBox mb={3}>
              <SoftInput
                name="hostname"
                placeholder="Hostname"
                icon={{ component: <Icon>public</Icon>, direction: "left" }}
                size="medium"
                value={formData.hostname}
                onChange={handleInputChange}
                required
              />
            </SoftBox>
            <SoftBox mb={3}>
              <SoftInput
                name="location"
                placeholder="Location"
                icon={{ component: <Icon>location_on</Icon>, direction: "left" }}
                size="medium"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </SoftBox>
            <SoftBox mb={3}>
              <SoftInput
                name="sync_schedule"
                type="datetime-local"
                placeholder="Sync Schedule"
                icon={{ component: <Icon>schedule</Icon>, direction: "left" }}
                size="medium"
                value={formData.sync_schedule}
                onChange={handleInputChange}
                required
              />
            </SoftBox>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </SoftBox>
  );
}

export default WsusConnectorTable;
