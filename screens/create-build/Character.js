import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { Modal, Layout, Text, Button, Icon } from "@ui-kitten/components";
import { useAuth } from "../../utils/useAuth";
import { Screen } from "../../components/screen/Screen";
import {
  DESTINY_DEFINITIONS,
  STATS_DEFINITION,
  ARMOR_TYPES,
} from "../../utils/bungieApiDefinitions";
import { COLORS } from "../../theme";
import { EquippedItems } from "./EquippedItems";
import {
  getEquippedItemsForCharacter,
  getManifest,
} from "../../utils/bungieApi";
import styled from "styled-components";

const { DESTINY_INVENTORY_ITEM } = DESTINY_DEFINITIONS;

const CloseIcon = (props) => (
  <Icon width={32} height={32} {...props} name="close-outline" />
);

const CharacterModal = styled(Modal)`
  height: 100%;
  width: 100%;
  position: relative;
  top: 108px;
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 12px;
  right: 12px;
  border-radius: 50px;
  width: 32px;
  height: 32px;
  z-index: 999;
`;

const UserInfoContainer = styled(Layout)`
  width: 100%;
  background: ${COLORS.background}
  display: flex;
  align-items: center;
  position: relative;
  top: -12px;
  margin-bottom: 12px;
`;

const CharacterLightLevel = styled(Text)`
  color: ${COLORS.hintText};
  position: relative;
  top: 8px;
`;

const CharacterType = styled(Text)`
  font-size: 64px;
`;

const CharacterStats = styled(View)`
  flex-direction: row;
  justify-content: space-evenly;
`;

const StatImage = styled(Image)`
  height: 18px;
  width: 18px;
  margin: 0 auto;
`;

const Stat = styled(Text)`
  margin: 4px;
  color: ${COLORS.hintText};
`;

export const CharacterScreen = ({
  selectedCharacter,
  isCharacterScreenVisible,
  setIsCharacterScreenVisible,
}) => {
  const { user } = useAuth();
  const { characterId, type, light, stats } = selectedCharacter;

  const [currentlyEquippedHelmetArmor, setCurrentlyEquippedHelmetArmor] =
    useState(null);
  const [currentlyEquippedGauntletsArmor, setCurrentlyEquippedGauntletsArmor] =
    useState(null);
  const [currentlyEquippedChestArmor, setCurrentlyEquippedChestArmor] =
    useState(null);
  const [currentlyEquippedLegArmor, setCurrentlyEquippedLegArmor] =
    useState(null);
  const [currentlyEquippedClassArmor, setCurrentlyEquippedClassArmor] =
    useState(null);

  useEffect(() => {
    if (selectedCharacter) {
      getEquippedItems();
    }
  }, [selectedCharacter]);

  const setEquippedItem = (itemSubType, item) => {
    switch (itemSubType) {
      case 26:
        setCurrentlyEquippedHelmetArmor(item);
        break;
      case 27:
        setCurrentlyEquippedGauntletsArmor(item);
        break;
      case 28:
        setCurrentlyEquippedChestArmor(item);
        break;
      case 29:
        setCurrentlyEquippedLegArmor(item);
        break;
      case 30:
        setCurrentlyEquippedClassArmor(item);
        break;
    }
  };

  const getEquippedItems = async () => {
    const { Response } = await getEquippedItemsForCharacter(
      1,
      user?.xbox?.membershipId,
      characterId
    );

    const equippedItems = Response.equipment.data.items.map(
      ({ itemHash, itemInstanceId, overrideStyleItemHash, state }) => ({
        itemHash,
        itemInstanceId,
        overrideStyleItemHash,
        state,
      })
    );

    equippedItems.forEach(
      async ({ itemHash, overrideStyleItemHash, state }) => {
        await getManifest(DESTINY_INVENTORY_ITEM, itemHash).then(
          async (item) => {
            if (ARMOR_TYPES.indexOf(item.itemSubType) !== -1) {
              if (overrideStyleItemHash) {
                await getManifest(
                  DESTINY_INVENTORY_ITEM,
                  overrideStyleItemHash
                ).then((itemOrnament) => {
                  setEquippedItem(item.itemSubType, {
                    ...itemOrnament,
                    masterWorked: state === 4 || state === 5,
                  });
                });
              } else {
                setEquippedItem(item.itemSubType, {
                  ...item,
                  masterWorked: state === 4 || state === 5,
                });
              }
            }
          }
        );
      }
    );
  };

  return (
    <CharacterModal visible={isCharacterScreenVisible}>
      <Screen>
        <CloseButton
          size="large"
          appearance="ghost"
          accessoryLeft={CloseIcon}
          onPress={() => setIsCharacterScreenVisible(false)}
        />
        <UserInfoContainer>
          <CharacterLightLevel category="label">{light}</CharacterLightLevel>
          <CharacterType category="h1">{type}</CharacterType>
          <CharacterStats>
            {Object.keys(stats).map(
              (stat) =>
                STATS_DEFINITION[stat] && (
                  <View key={STATS_DEFINITION[stat]?.name}>
                    <StatImage
                      source={{ uri: `${STATS_DEFINITION[stat]?.iconPath}` }}
                      style={{
                        tintColor: `${COLORS.hintText}`,
                      }}
                    />
                    <Stat key={stat} category="label">
                      {stats[stat]}
                    </Stat>
                  </View>
                )
            )}
          </CharacterStats>
        </UserInfoContainer>
        <EquippedItems
          currentlyEquippedHelmetArmor={currentlyEquippedHelmetArmor}
          currentlyEquippedGauntletsArmor={currentlyEquippedGauntletsArmor}
          currentlyEquippedChestArmor={currentlyEquippedChestArmor}
          currentlyEquippedLegArmor={currentlyEquippedLegArmor}
          currentlyEquippedClassArmor={currentlyEquippedClassArmor}
        />
      </Screen>
    </CharacterModal>
  );
};
