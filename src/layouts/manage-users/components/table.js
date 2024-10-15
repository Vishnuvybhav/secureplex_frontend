import React, { useEffect, useState } from "react";
import axiosInstance from "AxiosInstance"; // Import your Axios instance
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Select, MenuItem, Grid, Alert, Switch, FormControlLabel } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import Table from "examples/Tables/Table";
import Icon from "@mui/material/Icon";
import PhoneInput from "react-phone-input-2";
import FormControl from '@mui/material/FormControl';
import "react-phone-input-2/lib/style.css";

function TenantUsersTable() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Holds user data for editing
  const [editedUser, setEditedUser] = useState(null); // Store the user data being edited
  const [open, setOpen] = useState(false); // Modal open/close state
  const [message, setMessage] = useState(null); // For success/error messages
  const [showAlert, setShowAlert] = useState(false); // Control the alert visibility
  const [alertType, setAlertType] = useState("success");

  // Fetch user data from the API
  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/user");
      console.log("Fetched users:", response.data.data);
      setUsers(response.data.data); // Assuming your data is in `data.data`
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (message) {
      setShowAlert(true); // Show alert when a message is set

      const timer = setTimeout(() => {
        setShowAlert(false); // Hide after 3 seconds
        setMessage(null); // Clear message after hiding the alert
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  // Handle opening the modal with user data
  const handleEditClick = (user) => {
    setSelectedUser(user); // Set the selected user's data for editing
    setEditedUser({ 
      ...user, 
      role: user.role?.[0]?.name || "" // Extract the role name for Select input
    }); // Create a copy of the user data for editing
    setOpen(true); // Open the modal
  };

  // Handle closing the modal
  const handleClose = () => {
    setOpen(false); // Close the modal
    setSelectedUser(null); // Reset selected user
    setEditedUser(null); // Reset edited user data
  };

  // Handle saving the user changes (PATCH request)
  const handleSave = async () => {
    if (!editedUser) return;

    const updatedFields = {
      name: editedUser.name,
      phone: editedUser.phone,
      role: [{ name: editedUser.role }], // Convert role back to array
      country_code: editedUser.country_code,
      is_active: editedUser.is_active, // Include the active state
    };

    try {
      // Send the updated fields along with the user.id in the URL
      const response = await axiosInstance.patch(`/user/${editedUser.id}/`, updatedFields);
      console.log("User data to be sent:", updatedFields);
      console.log("User updated response:", response.data);
      setMessage("User updated successfully!");
      setAlertType("success");

      // After saving, refetch the user data to update the table
      await fetchUsers();

      handleClose(); // Close the modal after saving
    } catch (error) {
      setMessage("Error updating user. Please try again.");
      setAlertType("error");
      console.error("Error updating user:", error);
      handleClose(); // Close the modal even if there's an error
    }
  };

  // Prepare rows for the table
  const rows = users.map((user) => ({
    Name: <SoftBox sx={{ paddingLeft: "15px" }}>{user.name || "N/A"}</SoftBox>,
    Email: user.email || "N/A",
    Phone: user.phone || "N/A",
    Role: user.role?.[0]?.name || "N/A", // Assuming roles is an array
    IsActive: user.is_active ? "Active" : "Not Active",
    action: (
      <SoftBox display="flex" justifyContent="center" gap={1}>
        <SoftButton color="secondary" variant="gradient" onClick={() => handleEditClick(user)}>
          Edit
        </SoftButton>
      </SoftBox>
    ),
  }));

  return (
    <>
      {/* Display success or error messages */}
      {showAlert && message && (
        <Alert mt={2} mb={2} severity={alertType}>
          {message}
        </Alert>
      )}

      {/* User Table */}
      <Table
        columns={[
          { name: "Name", align: "center" },
          { name: "Email", align: "center" },
          { name: "Phone", align: "center" },
          { name: "Role", align: "center" },
          { name: "IsActive", align: "center" },
          { name: "action", align: "center" },
        ]}
        rows={rows}
      />

      {/* Modal for editing user */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {editedUser && (
            <>
              <SoftBox mb={3} mt={1}>
                <SoftInput
                  name="name"
                  placeholder="Name"
                  icon={{ component: <Icon>person</Icon>, direction: "left" }}
                  size="medium"
                  value={editedUser.name}
                  onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                  required
                />
              </SoftBox>
              <SoftBox mb={3}>
                <PhoneInput
                  country={editedUser?.country_code || "us"}
                  value={editedUser?.phone || ""}
                  onChange={(phone, countryData) =>
                    setEditedUser({
                      ...editedUser,
                      phone,
                      country_code: countryData.countryCode,
                    })
                  }
                  inputStyle={{ width: "100%" }}
                />
              </SoftBox>
              <SoftBox>
                <FormControl fullWidth>
                  <Select
                    label="User Role"
                    value={editedUser.role || ""} // Use string value of role
                    onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                    displayEmpty
                  >
                    <MenuItem value="">
                      <em>Select Role</em>
                    </MenuItem>
                    <MenuItem value="Tenant Analyst">Tenant Analyst</MenuItem>
                    <MenuItem value="User">User</MenuItem>
                  </Select>
                </FormControl>
              </SoftBox>
              <SoftBox pl={2} mt={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={!!editedUser.is_active}
                      onChange={(e) => setEditedUser({ ...editedUser, is_active: e.target.checked })}
                    />
                  }
                  label={editedUser.is_active ? "Active" : "Inactive"}
                />
              </SoftBox>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TenantUsersTable;
