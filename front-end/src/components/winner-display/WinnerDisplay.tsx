import { WinnerDisplayContainer, WinnerText } from "./WinnerDisplay.styled";
import React from "react";

type Props = {
  text?: string | undefined;
};

const WinnerDisplay: React.FC<Props> = ({ text }) => (
  <WinnerDisplayContainer>
    <WinnerText>{text} wins!</WinnerText>
  </WinnerDisplayContainer>
);

export { WinnerDisplay };
