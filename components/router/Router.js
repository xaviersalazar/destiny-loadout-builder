import React from "react";
import { useAuth } from "../../utils/useAuth";
import { Layout, Text } from "@ui-kitten/components";
import { Auth } from "../../screens/auth/Auth";
import { Navigation } from "../navigation/Navigation";
import { COLORS } from "../../theme";
import styled from "styled-components";

const Container = styled(Layout)`
  flex: 1;
  justify-content: center;
  background-color: ${COLORS.background};
`;

const UserInfoContainer = styled(Layout)`
  width: 100%;
  text-align: center;
  margin: 0 auto;
  align-items: center;
  position: relative;
  top: 0;
  height: 92px;
  background-color: ${COLORS.text};
`;

const UserName = styled(Text)`
  color: ${COLORS.white};
  position: relative;
  top: 48px;
`;

export const Router = () => {
  const { authToken, user } = useAuth();

  if (!authToken) return <Auth />;

  return (
    <>
      <UserInfoContainer>
        <UserName category="h4">{user?.bungie?.displayName}</UserName>
      </UserInfoContainer>
      <Container>
        <Navigation />
      </Container>
    </>
  );
};
