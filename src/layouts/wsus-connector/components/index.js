import React, { useState } from "react";
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

function WsusConnector(){
    const [selectedMonth, setSelectedMonth] = useState("");
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };
    return (
        <Card>
          <SoftBox>
          {/* {message && (
                      <Alert mt={2} severity="success">
                        {message}
                      </Alert>
                    )} */}
            <Grid >
              <Grid >
                <SoftBox>
                  <SoftTypography mb={2} mt={3} ml={3} variant="h6" fontWeight="bold" gutterBottom>
                    Create Wsus Connector
                  </SoftTypography>
                  <SoftBox mb={4} ml={3} mr={3}>
                  <form>
                  <Grid container spacing={2}>
                    {/* First Row: IP Address and Hostname */}
                    <Grid item xs={12} md={6}>
                      <SoftInput
                        name="ip_address"
                        placeholder="IP Address"
                        icon={{ component: <Icon>person</Icon>, direction: "left" }}
                        size="medium"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SoftInput
                        name="hostname"
                        placeholder="Hostname"
                        icon={{ component: <Icon>public</Icon>, direction: "left" }}
                        size="medium"
                        required
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} mt={2}>
                    {/* Second Row: Location and Sync Schedule */}
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
                    <Grid item xs={12} md={6}>
                      <SoftInput
                        name="sync_schedule"
                        placeholder="Sync Schedule"
                        type="date"
                        icon={{ component: <Icon>schedule</Icon>, direction: "left" }}
                        size="medium"
                        required
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} mt={2}>
                    {/* Third Row: Secret ID */}
                    <Grid item xs={12} md={6}>
                      <SoftInput
                        name="seceret_id"
                        placeholder="Secret ID"
                        type="text"
                        icon={{ component: <Icon>lock</Icon>, direction: "left" }}
                        size="medium"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SoftInput
                        name="password"
                        placeholder="Password"
                        type="password"
                        icon={{ component: <Icon>password</Icon>, direction: "left" }}
                        size="medium"
                        required
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} mt={2}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                      <Select
                          value={age}
                          onChange={handleChange}
                          displayEmpty
                          input={<OutlinedInput
                            startAdornment={
                                <Icon>arrow_forward</Icon>
                            }
                          />}
                        >
                          <MenuItem value="">
                            <span>Select Gateway</span>
                          </MenuItem>
                          <MenuItem value={10}>G1</MenuItem>
                          <MenuItem value={20}>G2</MenuItem>
                          <MenuItem value={30}>G3</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                 </Grid>
                  <SoftBox mt={3}>
                    <SoftButton type="submit" variant="gradient" color="success">
                      Connect
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


export default WsusConnector;