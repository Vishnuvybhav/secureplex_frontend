import React, { useEffect, useState } from "react";
import axiosInstance from "AxiosInstance";  // Import your axios instance
import Table from "examples/Tables/Table";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import Icon from "@mui/material/Icon";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Switch, FormControlLabel } from "@mui/material";  // Material-UI components for the modal and switch
import { Alert } from '@mui/material';

function TenantTable() {
  const [tenants, setTenants] = useState([]);
  const [open, setOpen] = useState(false);  // To control the modal visibility
  const [selectedTenant, setSelectedTenant] = useState(null);  // To store the tenant data for editing
  const [editedTenant, setEditedTenant] = useState(null);  // To store edited values before saving
  const [message, setMessage] = useState(null);
  const [showAlert, setShowAlert] = useState(true);
  const [alertType, setAlertType] = useState('success');

  // Fetch tenant data from Django API using axiosInstance
  useEffect(() => {
    axiosInstance
      .get("/tenant/")  // No need to include base URL here; it's already defined in axiosInstance
      .then((response) => {
        setTenants(response.data.tenants);  // Assuming data is in response.data.tenants
      })
      .catch((error) => {
        console.error("There was an error fetching the tenants!", error);
      });
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);


  // Handle Edit button click
  const handleEditClick = (tenant) => {
    setSelectedTenant(tenant);  // Set the selected tenant
    setEditedTenant({ ...tenant });  // Create a copy of the tenant data to edit
    setOpen(true);  // Open the modal
  };

  // Handle modal close
  const handleClose = () => {
    setOpen(false);
    setSelectedTenant(null);
    setEditedTenant(null);  // Reset the edited tenant
  };

  // Handle the "Save" button click
  const handleSave = () => {
    const updatedData = {
      name: editedTenant.name,
      tenant_domain: editedTenant.domains.length > -1 ? editedTenant.domains[0].domain : "N/A",
      is_active: editedTenant.is_active,
      domain: "localhost",  // For example, extra data you want to send along
    };

    axiosInstance
      .patch(`/tenant/${editedTenant.id}/`, updatedData)
      .then((response) => {
        // Update tenants list with the saved tenant data
        const updatedTenants = tenants.map((tenant) =>
          tenant.id === editedTenant.id ? response.data : tenant
        );
        setTenants(updatedTenants);
        setMessage("Tenant updated successfully!");
        setAlertType('success');
        console.log("Updated Tenant:", response.data);
        handleClose();  // Close the modal after saving
      })
      .catch((error) => {
        setMessage("Error updating tenant. Please try again.");
        setAlertType('error');
        console.error("There was an error updating the tenant!", error);
        handleClose();  // Close the modal even if there's an error
      });
  };

  // Prepare rows for the table
  const rows = tenants.map((tenant) => ({
    name: tenant.name,
    Domain: tenant.domains.length > 0 ? tenant.domains[0].domain : "N/A",
    email: tenant.email,
    is_active: tenant.is_active ? "Active" : "Inactive",
    action: (
      <SoftBox display="flex" justifyContent="center" gap={1}>
        <SoftButton color="secondary" variant="gradient" onClick={() => handleEditClick(tenant)}>
          Edit
        </SoftButton>
      </SoftBox>
    ),
  }));

  return (
    <>
     {showAlert && message && (
          <Alert mt={2} mb={2} severity={alertType}>
            {message}
          </Alert>
        )}
      <Table
        columns={[
          { name: "name", align: "left" },
          { name: "Domain", align: "left" },
          { name: "email", align: "center" },
          { name: "is_active", align: "center" },
          { name: "action", align: "center" },
        ]}
        rows={rows}
      />

      {/* Edit Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth >
        <DialogTitle>Edit Tenant</DialogTitle>
        <DialogContent>
          {editedTenant && (
            <>
              <SoftBox mb={3} mt={1}>
                <SoftInput
                    name="name"
                    placeholder="Name"
                    icon={{ component: <Icon>person</Icon>, direction: "left" }}
                    size="medium"
                    value={editedTenant.name}
                    onChange={(e) =>
                      setEditedTenant({ ...editedTenant, name: e.target.value })
                    }
                    required
                  />
              </SoftBox>
              <SoftBox mb={3}>
                <SoftInput
                    name="domain"
                    placeholder="Domain"
                    icon={{ component: <Icon>public</Icon>, direction: "left" }}
                    size="medium"
                    value={editedTenant.domains.length >   0 ? editedTenant.domains[0].domain : "N/A"}
                    onChange={(e) => {
                      // const updatedDomains = [...editedTenant.domains];
                      // updatedDomains[0].domain = e.target.value;
                      setEditedTenant({ ...editedTenant, domains: e.target.value });
                    }}
                    required
                  />
              </SoftBox>
              <SoftBox pl={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={editedTenant.is_active}  // Checked if active
                      onChange={(e) =>
                        setEditedTenant({ ...editedTenant, is_active: e.target.checked })  // Toggle state
                      }
                    />
                  }
                  label={editedTenant.is_active ? "Active" : "Inactive"}  // Label changes with state
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

export default TenantTable;
