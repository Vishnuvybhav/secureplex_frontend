// @mui material components
import { styled } from "@mui/material/styles";

export default styled("div")(({ theme, ownerState }) => {
  const { palette, functions } = theme;
  const { size } = ownerState;

  const { dark } = palette;
  const { pxToRem } = functions;

  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 0,
    padding: size === "small" ? `${pxToRem(4)} ${pxToRem(10)}` : `${pxToRem(8)} ${pxToRem(10)}`,
    width: size === "small" ? pxToRem(32) : pxToRem(39),
    height: "100%",
    color: dark.main,
  };
});
