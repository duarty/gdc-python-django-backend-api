import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { colors } from "../../constants/colors";

export const WinnerDisplayContainer = styled.section(() => ({
  background: colors.lightBlue,
  border: `1px solid ${colors.black}`,
  boxShadow: "-2px 3px 10px rgba(0, 0, 0, 0.25)",
  borderRadius: "4px",
  padding: "17px 28px",
}));

export const WinnerText = styled(Typography)(() => ({
  fontDamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "22px",
  lineHeight: "26px",
}));
