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

function KBDetails() {
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
                  KB Verification
                </SoftTypography>
                {/* <SoftBox mr={3}>
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
                </SoftBox>   */}
              </SoftBox>
              <SoftBox mb={4} ml={3} mr={3}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    {/* First Row: Name and Email */}
                    <Grid item xs={12} md={6}>
                      <SoftInput
                        name="kb"
                        placeholder="KB"
                        icon={{ component: <Icon>person</Icon>, direction: "left" }}
                        size="medium"
                        // value={name}
                        // onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SoftInput
                        name="comments"
                        placeholder="Comments"
                        type="text"
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
                            <span style={{ color: '#A9A9A9' }}>Verifed / Not Verifed</span>
                          </MenuItem>
                          <MenuItem value="Analyst">Verifed</MenuItem>
                          <MenuItem value="user">Not Verifed</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <Select
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          displayEmpty
                          input={<OutlinedInput startAdornment={<Icon sx={{ fontSize: 50 }}>wc</Icon>} />}
                        >
                          <MenuItem value="">
                            <span style={{ color: '#A9A9A9' }}>Gender</span>
                          </MenuItem>
                          <MenuItem value={10}>Male</MenuItem>
                          <MenuItem value={20}>Female</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  {/* Third Row: Phone Input */}
                  <Grid container spacing={2} mt={2}>
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
