import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

// Custom styles for SoftSelect (you can create these or use Material-UI's styled API)
import SoftSelectRoot from "components/SoftSelect/SoftSelectRoot";
import SoftSelectWithIconRoot from "components/SoftSelect/SoftSelectWithIconRoot";
import SoftSelectIconBoxRoot from "components/SoftSelect/SoftSelectIconBoxRoot";
import SoftSelectIconRoot from "components/SoftSelect/SoftSelectIconRoot";

// Soft UI Dashboard React contexts
import { useSoftUIController } from "context";

const SoftSelect = forwardRef(({ size, icon, error, success, disabled, options, value, onChange, placeholder }, ref) => {
  let template;
  const [controller] = useSoftUIController();
  const { direction } = controller;
  const iconDirection = icon.direction;

  if (icon.component && icon.direction === "left") {
    console.log("options.value",options);
    template = (
      <SoftSelectWithIconRoot ref={ref} ownerState={{ error, success, disabled }}>
        <SoftSelectIconBoxRoot ownerState={{ size }}>
          <SoftSelectIconRoot fontSize="small" ownerState={{ size }}>
            {icon.component}
          </SoftSelectIconRoot>
        </SoftSelectIconBoxRoot>
          {/* <InputLabel>{placeholder}</InputLabel> */}
          <Select
            value={value}
            onChange={onChange}
            label={placeholder}
            ownerState={{ size, error, success, iconDirection, direction, disabled }}
          >
            {options.map((option) => (
                console.log("option",option),
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          
      </SoftSelectWithIconRoot>
    );
  } else if (icon.component && icon.direction === "right") {
    template = (
      <SoftSelectWithIconRoot ref={ref} ownerState={{ error, success, disabled }}>
        <FormControl fullWidth variant="outlined" error={error} disabled={disabled}>
          <InputLabel>{placeholder}</InputLabel>
          <Select
            value={value}
            onChange={onChange}
            label={placeholder}
            ownerState={{ size, error, success, iconDirection, direction, disabled }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <SoftSelectIconBoxRoot ownerState={{ size }}>
          <SoftSelectIconRoot fontSize="small" ownerState={{ size }}>
            {icon.component}
          </SoftSelectIconRoot>
        </SoftSelectIconBoxRoot>
      </SoftSelectWithIconRoot>
    );
  } else {
    template = (
      <FormControl fullWidth variant="outlined" error={error} disabled={disabled}>
        <InputLabel>{placeholder}</InputLabel>
        <Select
          value={value}
          onChange={onChange}
          label={placeholder}
          ownerState={{ size, error, success, iconDirection, direction, disabled }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  return template;
});

// Setting default values for the props of SoftSelect
SoftSelect.defaultProps = {
  size: "medium",
  icon: {
    component: false,
    direction: "none",
  },
  error: false,
  success: false,
  disabled: false,
  options: [],
  placeholder: "Select option",
};

// Typechecking props for the SoftSelect
SoftSelect.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  icon: PropTypes.shape({
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    direction: PropTypes.oneOf(["none", "left", "right"]),
  }),
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SoftSelect;
