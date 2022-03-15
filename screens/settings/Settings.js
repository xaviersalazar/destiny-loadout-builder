import React from "react";
import { Button, Text } from "@ui-kitten/components";
import { Screen } from "../../components/screen/Screen";
import { useAuth } from "../../utils/useAuth";

export const Settings = () => {
  const { deleteCodeAndToken } = useAuth();

  return (
    <Screen>
      <Text category="h1">Settings</Text>
      <Button onPress={() => deleteCodeAndToken()}>
        Delete code and token
      </Button>
    </Screen>
  );
};
