import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text } from "@ui-kitten/components";
import { Screen } from "../../components/screen/Screen";
import SkeletonContent from "react-native-skeleton-content";
import { CharacterScreen } from "./Character";
import { getDestinyCharacters } from "../../utils/bungieApi";
import { useAuth } from "../../utils/useAuth";
import {
  CHARACTER_DEFINITIONS,
  STATS_DEFINITION,
} from "../../utils/bungieApiDefinitions";
import { COLORS } from "../../theme";
import warlock from "../../assets/warlock.png";
import hunter from "../../assets/hunter.png";
import titan from "../../assets/titan.png";
import styled from "styled-components";

const characterColors = {
  Warlock: "#fdcb6e",
  Hunter: "#0984e3",
  Titan: "#ff7675",
};

const Header = styled(View)`
  margin: 0 auto 24px auto;
`;

const HeaderText = styled(Text)`
  text-align: center;
`;

const CharacterContainer = styled(View)`
  display: flex;
  flex-direction: row;
  height: 100px;
  width: 100%;
  background: ${({ character }) => characterColors[character]};
  border-radius: 8px;
  padding: 12px;
  margin: 12px 0;
  overflow: hidden;
`;

const CharacterEmblem = styled(Image)`
  height: 150px;
  width: 180px;
  position: absolute;
  top: -26px;
  left: -30px;
  opacity: 0.08;
`;

const CharacterInfo = styled(View)`
  flex-direction: column;
  align-self: flex-end;
  flex: 2;
`;

const CharacterLightLevel = styled(Text)`
  color: ${COLORS.white};
`;

const CharacterStats = styled(View)`
  flex-direction: row;
  justify-content: space-evenly;
`;

const StatImage = styled(Image)`
  height: 18px;
  width: 18px;
  margin: 0 auto;
  opacity: 0.8;
`;

const Stat = styled(Text)`
  margin: 4px;
  color: ${COLORS.white};
`;

export const CreateBuild = () => {
  const { user } = useAuth();

  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isCharacterScreenVisible, setIsCharacterScreenVisible] =
    useState(false);

  useEffect(() => {
    if (user) {
      getCharacters();
    }
  }, [user]);

  const getCharacters = async () => {
    const { Response } = await getDestinyCharacters(
      1,
      user?.xbox?.membershipId
    );

    const allCharacters = [
      {
        type: "Warlock",
        emblem: warlock,
        ...Response.characters.data[CHARACTER_DEFINITIONS.Warlock],
      },
      {
        type: "Hunter",
        emblem: hunter,
        ...Response.characters.data[CHARACTER_DEFINITIONS.Hunter],
      },
      {
        type: "Titan",
        emblem: titan,
        ...Response.characters.data[CHARACTER_DEFINITIONS.Titan],
      },
    ];

    setCharacters(allCharacters);
  };

  return (
    <Screen>
      <Header>
        <HeaderText category="h1">Select a character</HeaderText>
        <HeaderText category="p1" appearance="hint">
          To add or modify a build
        </HeaderText>
      </Header>
      {characters && characters.length > 0
        ? characters.map((character) => (
            <TouchableOpacity
              key={character.characterId}
              onPress={() => {
                setSelectedCharacter(character);
                setIsCharacterScreenVisible(true);
              }}
            >
              <CharacterContainer character={character.type}>
                <CharacterEmblem source={character.emblem} />
                <CharacterInfo>
                  <CharacterLightLevel category="label">
                    {character.light}
                  </CharacterLightLevel>
                  <Text category="h2">{character.type}</Text>
                </CharacterInfo>
                <CharacterStats>
                  {Object.keys(character.stats).map(
                    (stat) =>
                      STATS_DEFINITION[stat] && (
                        <View key={STATS_DEFINITION[stat]?.name}>
                          <StatImage
                            source={{
                              uri: `${STATS_DEFINITION[stat]?.iconPath}`,
                            }}
                            style={{
                              tintColor: `${COLORS.white}`,
                            }}
                          />
                          <Stat key={stat} category="label">
                            {character.stats[stat]}
                          </Stat>
                        </View>
                      )
                  )}
                </CharacterStats>
              </CharacterContainer>
            </TouchableOpacity>
          ))
        : [1, 2, 3].map((i) => (
            <SkeletonContent
              key={i}
              isLoading={!characters || characters.length <= 0}
              containerStyle={{
                width: "100%",
                marginTop: 12,
                marginBottom: 12,
              }}
              layout={[
                {
                  key: `${i}-character`,
                  width: "100%",
                  height: 90,
                  borderRadius: 8,
                },
              ]}
            />
          ))}
      {isCharacterScreenVisible && (
        <CharacterScreen
          selectedCharacter={selectedCharacter}
          isCharacterScreenVisible={isCharacterScreenVisible}
          setIsCharacterScreenVisible={setIsCharacterScreenVisible}
        />
      )}
    </Screen>
  );
};
