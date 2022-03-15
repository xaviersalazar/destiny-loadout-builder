import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Text,
} from "@ui-kitten/components";
import { Builds } from "../../screens/builds/Builds";
import { CreateBuild } from "../../screens/create-build/CreateBuild";
import { Settings } from "../../screens/settings/Settings";
import { COLORS } from "../../theme";
import styled from "styled-components";

const { Navigator, Screen } = createBottomTabNavigator();

const LayersIcon = (props) => <Icon {...props} name="layers-outline" />;
const PlusIcon = (props) => <Icon {...props} name="plus-outline" />;
const SettingsIcon = (props) => <Icon {...props} name="settings-outline" />;

const BottomNavContainer = styled(View)`
  margin: 0;
  padding: 0;
  width: 100%;
  background: ${COLORS.white};
`;

const BottomNav = styled(BottomNavigation)`
  position: relative;
  bottom: 0;
  height: 92px;
  background-color: ${COLORS.white};
  margin: 0 auto;
  padding: 0 8px 8px 8px;
`;

const BottomNavTabText = styled(Text)`
  color: ${(props) => (props.selected ? COLORS.text : COLORS.nonSelectedText)};
  font-size: 12px;
  font-weight: bold;
`;

const CreateBuildContainer = styled(View)`
  position: absolute;
  bottom: 24px;
  background: ${(props) =>
    props.selected ? COLORS.white : COLORS.nonSelectedText};
  height: 74px;
  width: 74px;
  border-radius: 50px;
  padding: 24px;
  box-shadow: ${(props) =>
    props.selected
      ? "0px 4px 18px rgba(0, 0, 0, 0.12)"
      : "0px 0px 0px rgba(0, 0, 0, 0.12)"};
`;

const CreateBuildContainerInner = styled(View)`
  position: absolute;
  bottom: 6px;
  left: 6px;
  background: ${COLORS.primary};
  height: 62px;
  width: 62px;
  border-radius: 50px;
  padding: 24px;
`;

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavContainer>
    <BottomNav
      appearance="noIndicator"
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab
        title={() => (
          <BottomNavTabText selected={state.index === 0}>
            BUILDS
          </BottomNavTabText>
        )}
        icon={
          <LayersIcon
            fill={state.index === 0 ? COLORS.text : COLORS.nonSelectedText}
          />
        }
      />
      <BottomNavigationTab
        title={() => (
          <CreateBuildContainer selected={state.index === 1}>
            <CreateBuildContainerInner>
              <PlusIcon
                fill={COLORS.white}
                height={38}
                width={38}
                style={{
                  position: "relative",
                  right: 12,
                  bottom: 12,
                }}
              />
            </CreateBuildContainerInner>
          </CreateBuildContainer>
        )}
      />
      <BottomNavigationTab
        title={() => (
          <BottomNavTabText selected={state.index === 2}>
            SETTINGS
          </BottomNavTabText>
        )}
        icon={
          <SettingsIcon
            fill={state.index === 2 ? COLORS.text : COLORS.nonSelectedText}
          />
        }
      />
    </BottomNav>
  </BottomNavContainer>
);

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Builds" component={Builds} options={{ headerShown: false }} />
    <Screen
      name="Create Build"
      component={CreateBuild}
      options={{ headerShown: false }}
    />
    <Screen
      name="Settings"
      component={Settings}
      options={{ headerShown: false }}
    />
  </Navigator>
);

export const Navigation = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);
