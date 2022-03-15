import React, { useState } from "react";
import { Image } from "react-native";
import { Layout, Text, ViewPager } from "@ui-kitten/components";
import { Screen } from "../../components/screen/Screen";
import crucibleImage from "../../assets/crucibleImage.png";
import vanguardImage from "../../assets/vanguardImage.png";
import gambitImage from "../../assets/gambitImage.png";
import styled from "styled-components";
import { COLORS } from "../../theme";

const BuildContainer = styled(ViewPager)`
  height: 100%;
`;

const BuildImageContainer = styled(Layout)`
  width: 100%;
  height: 60%;
  justify-content: center;
  align-items: center;
  background: transparent;
`;

const BuildImage = styled(Image)`
  width: 150px;
  height: 150px;
  margin: 16px;
  resize-mode: contain;
`;

const BuildImage_2 = styled(BuildImage)`
  width: 250px;
  height: 250px;
  margin: 16px 16px 0 16px;
  resize-mode: contain;
`;

const HintText = styled(Text)`
  position: relative;
  top: 24px;
  color: ${COLORS.nonSelectedText};
`;

const HintText_2 = styled(Text)`
  position: relative;
  top: -24px;
  color: ${COLORS.nonSelectedText};
`;

export const Builds = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <BuildContainer
      selectedIndex={selectedIndex}
      onSelect={(index) => setSelectedIndex(index)}
    >
      <Screen>
        <Text category="h1">Crucible</Text>
        <BuildImageContainer>
          <BuildImage source={crucibleImage} />
          <HintText category="h6">No builds yet</HintText>
        </BuildImageContainer>
      </Screen>
      <Screen>
        <Text category="h1">Vanguard</Text>
        <BuildImageContainer>
          <BuildImage_2 source={vanguardImage} />
          <HintText_2 category="h6">No builds yet</HintText_2>
        </BuildImageContainer>
      </Screen>
      <Screen>
        <Text category="h1">Gambit</Text>
        <BuildImageContainer>
          <BuildImage_2 source={gambitImage} />
          <HintText_2 category="h6">No builds yet</HintText_2>
        </BuildImageContainer>
      </Screen>
      <Screen>
        <Text category="h1">Add Custom Group</Text>
      </Screen>
    </BuildContainer>
  );
};
