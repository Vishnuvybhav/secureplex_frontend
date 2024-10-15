import React, { useEffect, useState } from "react";
import axiosInstance from "AxiosInstance"; // Import your Axios instance

// Soft UI Dashboard React examples
import Table from "examples/Tables/Table";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import Icon from "@mui/material/Icon";

import { Alert, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

function GatewayTable() {
  const [gateways, setGateways] = useState([]); // State to hold the gateway data
  const [error, setError] = useState(null); // State to handle error messages
  const [dialogOpen, setDialogOpen] = useState(false); // State to handle the edit dialog's open/close state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State to handle the delete dialog
  const [selectedGateway, setSelectedGateway] = useState(null); // State to hold the selected gateway for editing or deleting
  const [username, setUsername] = useState(""); // State to hold the username field in the edit dialog

  // Fetch data from the /gateway endpoint
  useEffect(() => {
    const fetchGateways = async () => {
      try {
        const response = await axiosInstance.get("/gateway");
        console.log("Fetched gateways:", response.data);
        setGateways(response.data.data || []); // Set the gateways state with the fetched data
      } catch (err) {
        setError("Error fetching gateway data. Please try again.");
        console.error("Error fetching gateways:", err);
        // Set timeout to clear the error message after 3 seconds
        setTimeout(() => setError(null), 3000);
      }
    };

    fetchGateways();
  }, []);

  // Handle opening the edit dialog with the selected gateway data
  const handleEditClick = (gateway) => {
    setSelectedGateway(gateway); // Set the selected gateway for editing
    setUsername(gateway.name); // Set the username field with the gateway's name
    setDialogOpen(true); // Open the edit dialog
  };

  // Handle opening the delete dialog with the selected gateway
  const handleDeleteClick = (gateway) => {
    setSelectedGateway(gateway); // Set the selected gateway for deletion
    setDeleteDialogOpen(true); // Open the delete confirmation dialog
  };

  // Handle closing the dialogs
  const handleDialogClose = () => {
    setDialogOpen(false); // Close the edit dialog
    setSelectedGateway(null); // Reset selected gateway
    setUsername(""); // Reset the username field
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false); // Close the delete confirmation dialog
    setSelectedGateway(null); // Reset selected gateway
  };

  // Handle form submission with a PATCH request to update the gateway username
  const handleSave = async () => {
    if (!selectedGateway) return;

    try {
      await axiosInstance.patch(`/gateway/${selectedGateway.id}`, {
        name: username,
      });

      // Update the local gateways state with the new username
      setGateways((prevGateways) =>
        prevGateways.map((gateway) =>
          gateway.id === selectedGateway.id ? { ...gateway, name: username } : gateway
        )
      );

      setDialogOpen(false); // Close the dialog after saving
      setSelectedGateway(null); // Reset selected gateway
      setUsername(""); // Reset the username field
    } catch (error) {
      setError("Error updating gateway. Please try again.");
      console.error("Error updating gateway:", error);
      // Set timeout to clear the error message after 3 seconds
      setTimeout(() => setError(null), 3000);
    }
  };

  // Handle gateway deletion with a DELETE request
  const handleDelete = async () => {
    if (!selectedGateway) return;

    try {
      await axiosInstance.delete(`/gateway/${selectedGateway.id}`);
      console.log("Gateway deleted successfully");

      // Remove the deleted gateway from the local state
      setGateways((prevGateways) =>
        prevGateways.filter((gateway) => gateway.id !== selectedGateway.id)
      );

      setDeleteDialogOpen(false); // Close the dialog after deleting
      setSelectedGateway(null); // Reset selected gateway
    } catch (error) {
      setError("Error deleting gateway. Please try again.");
      console.error("Error deleting gateway:", error);
      // Set timeout to clear the error message after 3 seconds
      setTimeout(() => setError(null), 3000);
    }
  };

  // Map the gateways data to rows for the table
  const rows = gateways.map((gateway) => ({
    Name: <SoftBox>{gateway.name || "N/A"}</SoftBox>,
    Location: <SoftBox>{gateway.location || "N/A"}</SoftBox>,
    action: (
      <SoftBox display="flex" justifyContent="center" gap={1}>
        <SoftButton color="secondary" variant="gradient" onClick={() => handleEditClick(gateway)}>
          Edit
        </SoftButton>
        <SoftButton color="error" variant="gradient" onClick={() => handleDeleteClick(gateway)}>
          Delete
        </SoftButton>
      </SoftBox>
    ),
  }));

  return (
    <SoftBox>
      {/* Display error message if there's an error */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Render the table */}
      <Table
        columns={[
          { name: "Name", align: "center" },
          { name: "Location", align: "center" },
          { name: "action", align: "center" },
        ]}
        rows={rows}
      />

      {/* Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Gateway Name</DialogTitle>
        <DialogContent>
          <SoftInput
            name="name"
            placeholder="Name"
            icon={{ component: <Icon>person</Icon>, direction: "left" }}
            size="medium"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Delete Gateway</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this gateway?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </SoftBox>
  );
}

export default GatewayTable;
