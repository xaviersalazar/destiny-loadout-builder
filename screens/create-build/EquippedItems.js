import React from "react";
import { Image, View } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import { BUNGIE_PREFIX_URL } from "../../utils/bungieApiDefinitions";
import styled from "styled-components";

const EquippedItemsContainer = styled(View)`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 12px auto;
  flex-direction: row;
  justify-content: space-around;
`;

const EquippedItem = styled(View)`
  height: 125px;
  width: 125px;
  border-radius: 8px;
  margin: 0 auto;
  text-align: center;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ masterWorked }) =>
    masterWorked
      ? "0px 0px 8px rgba(253, 203, 110, 0.9)"
      : "0px 0px 0px rgba(0, 0, 0, 0.12)"};}
`;

const ArmorImage = styled(Image)`
  height: 100px;
  width: 100px;
  resize-mode: contain;
  border-radius: 8px;
`;

const ArmorName = styled(Text)`
  text-align: center;
  margin: 8px auto 0 auto;
`;

const SaveButton = styled(Button)`
  border: none;
  border-radius: 8px;
  position: relative;
  top: 32px;
`;

export const EquippedItems = ({
  currentlyEquippedHelmetArmor,
  currentlyEquippedGauntletsArmor,
  currentlyEquippedChestArmor,
  currentlyEquippedLegArmor,
  currentlyEquippedClassArmor,
}) => {
  return (
    <>
      <EquippedItemsContainer>
        <EquippedItem masterWorked={currentlyEquippedHelmetArmor?.masterWorked}>
          <ArmorImage
            source={{
              uri: `${BUNGIE_PREFIX_URL}${currentlyEquippedHelmetArmor?.displayProperties.icon}`,
            }}
          />
          <ArmorName category="p2">
            {currentlyEquippedHelmetArmor?.displayProperties.name}
          </ArmorName>
        </EquippedItem>
        <EquippedItem
          masterWorked={currentlyEquippedGauntletsArmor?.masterWorked}
        >
          <ArmorImage
            source={{
              uri: `${BUNGIE_PREFIX_URL}${currentlyEquippedGauntletsArmor?.displayProperties.icon}`,
            }}
          />
          <ArmorName category="p2">
            {currentlyEquippedGauntletsArmor?.displayProperties.name}
          </ArmorName>
        </EquippedItem>
      </EquippedItemsContainer>
      <EquippedItemsContainer>
        <EquippedItem masterWorked={currentlyEquippedChestArmor?.masterWorked}>
          <ArmorImage
            source={{
              uri: `${BUNGIE_PREFIX_URL}${currentlyEquippedChestArmor?.displayProperties.icon}`,
            }}
          />
          <ArmorName category="p2">
            {currentlyEquippedChestArmor?.displayProperties.name}
          </ArmorName>
        </EquippedItem>
        <EquippedItem masterWorked={currentlyEquippedLegArmor?.masterWorked}>
          <ArmorImage
            source={{
              uri: `${BUNGIE_PREFIX_URL}${currentlyEquippedLegArmor?.displayProperties.icon}`,
            }}
          />
          <ArmorName category="p2">
            {currentlyEquippedLegArmor?.displayProperties.name}
          </ArmorName>
        </EquippedItem>
      </EquippedItemsContainer>
      <EquippedItemsContainer>
        <EquippedItem masterWorked={currentlyEquippedClassArmor?.masterWorked}>
          <ArmorImage
            source={{
              uri: `${BUNGIE_PREFIX_URL}${currentlyEquippedClassArmor?.displayProperties.icon}`,
            }}
          />
          <ArmorName category="p2">
            {currentlyEquippedClassArmor?.displayProperties.name}
          </ArmorName>
        </EquippedItem>
      </EquippedItemsContainer>
      <SaveButton disabled={true}>Save</SaveButton>
    </>
  );
};
