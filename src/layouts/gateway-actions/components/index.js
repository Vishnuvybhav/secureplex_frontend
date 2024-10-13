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


function CreateGateway() {
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
                  Create Gateway
                </SoftTypography> 
              </SoftBox>
              <SoftBox mb={4} ml={3} mr={3}>
                <form>
                  <Grid container spacing={2}>
                    {/* First Row: Name and Email */}
                    <Grid item xs={12} md={6}>
                      <SoftInput
                        name="gateway name"
                        placeholder="Gateway Name"
                        type="text"
                        icon={{ component: <Icon>public</Icon>, direction: "left" }}
                        size="medium"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SoftInput
                        name="location"
                        placeholder="Location"
                        type="text"
                        icon={{ component: <Icon>location_on</Icon>, direction: "left" }}
                        size="medium"
                        required
                      />
                    </Grid>
                  </Grid>
                  <SoftBox mt={2}>
                    <SoftButton type="submit" variant="gradient" color="success">
                      Create Gateway
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

export default CreateGateway;
