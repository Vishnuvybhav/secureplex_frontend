// @mui material components
import { styled } from "@mui/material/styles";

export default styled("div")(({ theme, ownerState }) => {
  const { palette, functions, borders } = theme;
  const { error, success, disabled } = ownerState;

  const { inputColors, grey, white } = palette;
  const { pxToRem } = functions;
  const { borderRadius, borderWidth } = borders;

  // Determine the border color based on error, success, or default state
  let borderColorValue = inputColors.borderColor.main;

  if (error) {
    borderColorValue = inputColors.error;
  } else if (success) {
    borderColorValue = inputColors.success;
  }

  return {
    display: "flex", // Ensures the select box and icon are aligned in a row
    alignItems: "center", // Vertically center the content
    backgroundColor: disabled ? grey[200] : white.main, // Apply grey background if disabled
    border: `${borderWidth[1]} solid`, // Apply border width and color
    borderRadius: borderRadius.md, // Rounded corners
    borderColor: borderColorValue, // Apply the determined border color

    // Styles for the select input within the div
    "& .MuiSelect-select": {
      paddingLeft: pxToRem(12), // Adjust the padding for the select text based on icon position
      paddingRight: pxToRem(12), // Padding for the right side
      height: pxToRem(20), // Ensure proper height
    },
    
    // Handle focus state for better UX
    "&:focus-within": {
      borderColor: inputColors.borderColor.focus, // Change border color on focus
      boxShadow: `0px 0px 0px 1px ${inputColors.borderColor.focus}`, // Apply box shadow on focus
    },

    // Handle disabled state styling
    "&.Mui-disabled": {
      backgroundColor: grey[200], // Grey out the background when disabled
      pointerEvents: "none", // Prevent interaction when disabled
    },
  };
});
