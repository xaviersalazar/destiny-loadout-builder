import React from "react";
import { useAuth } from "../../utils/useAuth";
import { Button, Layout, Text, Icon } from "@ui-kitten/components";
import { Screen } from "../../components/screen/Screen";
import { COLORS } from "../../theme";
import styled from "styled-components";

const LoginInfoContainer = styled(Layout)`
  background: transparent;
  margin: 24px 0 48px 0;
  align-items: center;
`;

const LoginHeader = styled(Text)`
  margin-bottom: 12px;
`;

const LoginSubtitle = styled(Text)`
  text-align: center;
`;

export const Auth = () => {
  const { request, signIn } = useAuth();

  return (
    <Screen>
      <LoginInfoContainer>
        <Icon
          name="unlock-outline"
          style={{
            width: 64,
            height: 64,
            marginBottom: 24,
          }}
          fill={COLORS.text}
        />
        <LoginHeader category="h1">Login to Bungie.net</LoginHeader>
        <LoginSubtitle category="p1" appearance="hint">
          You need to authorize Destiny Loadout Builder to continue
        </LoginSubtitle>
      </LoginInfoContainer>
      <Button disabled={!request} onPress={() => signIn()}>
        Authorize D2Builder
      </Button>
    </Screen>
  );
};
