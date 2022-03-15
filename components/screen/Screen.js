import React from "react";
import { Layout } from "@ui-kitten/components";
import { COLORS } from "../../theme";
import styled from "styled-components";

const ScreenOuterLayout = styled(Layout)`
  flex: 1;
  align-items: center;
  background-color: ${COLORS.text};
`;

const ScreenInnerLayout = styled(Layout)`
  width: 100%;
  height: 100%;
  flex: 1;
  align-items: center;
  padding: 48px 24px 24px 24px;
  background-color: ${COLORS.background};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
`;

export const Screen = ({ children, ...props }) => (
  <ScreenOuterLayout>
    <ScreenInnerLayout {...props}>{children}</ScreenInnerLayout>
  </ScreenOuterLayout>
);
