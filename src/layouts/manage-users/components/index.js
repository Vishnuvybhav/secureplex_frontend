import React, { useState, useRef } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axiosInstance from "AxiosInstance.js";  // Import your axios instance
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Alert } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

function CreateProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('us');  // default country code
  const [message, setMessage] = useState(null);
  const [alertType, setAlertType] = useState('success');
  const fileInputRef = useRef(null);

  // Handle file selection (for bulk import)
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected: ", file);
      // Handle file upload or processing here
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();  // Prevent page reload on form submission
    
    // Create data object to send
    const userData = {
      name: name,
      email: email,
      phone: phone,
      country_code: countryCode,
      role: role,
    };

    // Make POST request using axiosInstance
    console.log("User data:", userData);  
    axiosInstance.post("/user/create/", userData)
      .then((response) => {
        setMessage("Profile created successfully!");
        setAlertType('success');
        console.log("Response:", response.data);
        setName('');
        setEmail('');
        setPhone('');
        setCountryCode('us');
        setRole('');
      })
      .catch((error) => {
        setMessage("Error creating profile. Please try again.");
        setAlertType('error');
        console.error("Error:", error);
      });
  };

  return (
    <Card>
      <SoftBox>
        {message && (
          <Alert mt={2} severity={alertType}>
            {message}
          </Alert>
        )}
        <Grid>
          <Grid>
            <SoftBox>
              <SoftBox display="flex" justifyContent="space-between" alignItems="center" mb={2} mt={3} ml={3}>
                <SoftTypography variant="h6" fontWeight="bold" gutterBottom>
                  Create User Profile
                </SoftTypography>
                <SoftBox mr={3}>
                    <SoftButton variant="gradient" color="info" size="small" onClick={() => fileInputRef.current.click()}>
                        Bulk User Import
                    </SoftButton>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        accept=".csv, .xlsx"  // Optional: limit file types
                        onChange={handleFileChange}
                    />
                </SoftBox>  
              </SoftBox>
              <SoftBox mb={4} ml={3} mr={3}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    {/* First Row: Name and Email */}
                    <Grid item xs={12} md={6}>
                      <SoftInput
                        name="name"
                        placeholder="Name"
                        icon={{ component: <Icon>person</Icon>, direction: "left" }}
                        size="medium"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SoftInput
                        name="email"
                        placeholder="Email"
                        type="email"
                        icon={{ component: <Icon>email</Icon>, direction: "left" }}
                        size="medium"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} mt={2}>
                    {/* Second Row: Role and Gender */}
                    <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <Select
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          displayEmpty
                          input={<OutlinedInput startAdornment={<Icon>work</Icon>} />}
                        >
                          <MenuItem value="">
                            <span style={{ color: '#A9A9A9' }}>Role</span>
                          </MenuItem>
                          <MenuItem value="Tenant Analyst">Tenant Analyst</MenuItem>
                          <MenuItem value="User">User</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <PhoneInput
                          country={countryCode}  // Set the default country
                          value={phone}
                          onChange={(phone) => setPhone(phone)}  // Handle phone number change
                          inputStyle={{ width: '100%' }}  // Full-width input field
                          containerStyle={{ marginBottom: '20px' }}
                      />
                    </Grid>
                  </Grid>

                  <SoftBox mt={1}>
                    <SoftButton type="submit" variant="gradient" color="success">
                      Create Profile
                    </SoftButton>
                  </SoftBox>
                </form>
              </SoftBox>
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
    </Card>
  );
}

export default CreateProfile;
