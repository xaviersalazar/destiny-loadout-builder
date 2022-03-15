import React from "react";
import * as eva from "@eva-design/eva";
import { AuthProvider } from "./utils/useAuth";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { Router } from "./components/router/Router";
import { default as theme } from "./theme.json";

const App = () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ApplicationProvider>
  </>
);

export default App;
