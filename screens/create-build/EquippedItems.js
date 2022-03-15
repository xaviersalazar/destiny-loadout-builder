import React from "react";
import { Image, View } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import { uniqueId } from "lodash";
import { BUNGIE_PREFIX_URL } from "../../utils/bungieApiDefinitions";
import { COLORS } from "../../theme";
import styled from "styled-components";

const EquippedItemsContainer = styled(View)`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 12px auto;
  flex-direction: row;
  justify-content: space-around;
`;

const EquippedItemContainer = styled(View)`
  background: ${COLORS.background};
`;

const EquippedItem = styled(View)`
  height: 85px;
  width: 85px;
  border-radius: 12px;
  margin: 0 auto;
  text-align: center;
  align-items: center;
  justify-content: center;
  background: ${({ isExotic }) =>
    isExotic ? COLORS.exoticBackground : COLORS.itemBackground};
    box-shadow: ${({ masterWorked }) =>
      masterWorked
        ? "0px 0px 6px rgba(241, 196, 15, 0.6)"
        : "0px 0px 0px rgba(0, 0, 0, 0.12)"};}
`;

const ArmorImage = styled(Image)`
  height: 65px;
  width: 65px;
  resize-mode: contain;
  border-radius: 12px;
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
      {[
        [currentlyEquippedHelmetArmor, currentlyEquippedGauntletsArmor],
        [currentlyEquippedChestArmor, currentlyEquippedLegArmor],
        [currentlyEquippedClassArmor],
      ].map((row) => (
        <EquippedItemsContainer key={uniqueId("row_")}>
          {row.map((armor) => (
            <EquippedItemContainer key={uniqueId("armor_")}>
              <EquippedItem
                masterWorked={armor?.masterWorked}
                isExotic={armor?.isExotic}
              >
                <ArmorImage
                  source={{
                    uri: `${BUNGIE_PREFIX_URL}${armor?.displayProperties.icon}`,
                  }}
                />
              </EquippedItem>
              <ArmorName category="p2">
                {armor?.displayProperties.name}
              </ArmorName>
            </EquippedItemContainer>
          ))}
        </EquippedItemsContainer>
      ))}
      <SaveButton disabled={true}>Save</SaveButton>
    </>
  );
};
