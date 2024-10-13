import React, { useState, useRef } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import axios from "axios";
import axiosInstance from "AxiosInstance.js";
// import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftSelect from "components/SoftSelect";
import SoftButton from "components/SoftButton";
import { Alert } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


function CreateProfile() {
    const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected: ", file);
      // Handle file upload or processing here
    }
  };
  const [age, setAge] = React.useState('');
  const [gender, setGender] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handlegenderChange = (event) => {
    setGender(event.target.value);
    };


  const handleButtonClick = () => {
    // Programmatically trigger the file input click
    fileInputRef.current.click();
  };

  return (
    <Card>
      <SoftBox>
        {/* {message && (
          <Alert mt={2} severity="success">
            {message}
          </Alert>
        )} */}
        <Grid>
          <Grid>
            <SoftBox>
              <SoftBox display="flex" justifyContent="space-between" alignItems="center" mb={2} mt={3} ml={3}>
                <SoftTypography variant="h6" fontWeight="bold" gutterBottom>
                  Create User Profile
                </SoftTypography>
                <SoftBox mr={3}>
                    <SoftButton variant="gradient" color="info" size="small" onClick={handleButtonClick}>
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
                <form>
                  <Grid container spacing={2}>
                    {/* First Row: Name and Email */}
                    <Grid item xs={12} md={6}>
                      <SoftInput
                        name="name"
                        placeholder="Name"
                        icon={{ component: <Icon>person</Icon>, direction: "left" }}
                        size="medium"
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
                        required
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} mt={2}>
                    {/* Second Row: Phone and Date */}
                    <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <Select
                          value={age}
                          onChange={handleChange}
                          displayEmpty
                          input={<OutlinedInput
                            startAdornment={
                                <Icon>work</Icon>
                            }
                          />}
                        >
                          <MenuItem value="">
                          <span style={{ color: '#A9A9A9' }}>Role</span>
                          </MenuItem>
                          <MenuItem value={10}>Analyst</MenuItem>
                          <MenuItem value={20}>Genral User</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <Select
                          value={gender}
                          onChange={handlegenderChange}
                          displayEmpty
                          input={<OutlinedInput
                            startAdornment={
                                <Icon sx={{ fontSize: 50 }}>wc</Icon>
                            }
                          />}
                        >
                          <MenuItem value="">
                          <span style={{ color: '#A9A9A9' }}>Gender</span> 
                          </MenuItem>
                          <MenuItem value={10}>Male</MenuItem>
                          <MenuItem value={20}>Female</MenuItem>
                        </Select>
                      </FormControl>
                      {/* <SoftInput
                        name="gender"
                        placeholder="Gender"
                        type="text"
                        icon={{ component: <Icon>wc</Icon>, direction: "left" }}
                        size="medium"
                        required
                      /> */}
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} mt={2}>
                    <Grid item xs={12} md={6}>
                    <PhoneInput
                            country={'us'}  // Set the default country
                            // value={phone}
                            // onChange={phone => setPhone(phone)}  // Handle phone number change
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
