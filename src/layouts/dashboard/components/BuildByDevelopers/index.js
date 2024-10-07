/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
// Images
import wavesWhite from "assets/images/shapes/waves-white.svg";
import rocketWhite from "assets/images/illustrations/rocket-white.png";

function BuildByDevelopers() {
  return (
    <Card>
      <SoftBox>
        <Grid >
          <Grid >
            <SoftBox>
              <SoftTypography mb={2} mt={3} ml={3} variant="h6" fontWeight="bold" gutterBottom>
                Add Tenant Details
              </SoftTypography>
              <SoftBox mb={4} ml={3} mr={3}>
              <form >
                <SoftBox mb={3}>
                <SoftInput
                    name="name"
                    placeholder="Name"
                    icon={{ component: <Icon>person</Icon>, direction: "left" }}
                    size="medium"
                    required
                  />
                </SoftBox>
                <SoftBox mb={3}>
                <SoftInput
                    name="domain"
                    placeholder="Domain"
                    icon={{ component: <Icon>public</Icon>, direction: "left" }}
                    size="medium"
                    required
                  />
                </SoftBox>
                <SoftBox mb={3}>
                <SoftInput
                    name="admin_email"
                    placeholder="Admin Email"
                    type="email"
                    icon={{ component: <Icon>email</Icon>, direction: "left" }}
                    size="medium"
                    required
                  />
                </SoftBox>
                <SoftButton type="submit" variant="gradient" color="success">
                  Submit
                </SoftButton>
              </form>
              </SoftBox>
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
    </Card>
  );
}

export default BuildByDevelopers;
