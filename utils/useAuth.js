import React, { useReducer } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import {
  makeRedirectUri,
  ResponseType,
  useAuthRequest,
} from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CLIENT_ID,
  AUTHORIZATION_ENDPOINT,
  TOKEN_ENDPOINT,
  LOCALHOST_URI,
} from "react-native-dotenv";
import { getMembershipsById } from "./bungieApi";

const CODE_NAME = "@AuthCode";
const TOKEN_NAME = "@AuthToken";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: AUTHORIZATION_ENDPOINT,
};

const redirectUri = makeRedirectUri({
  scheme: LOCALHOST_URI,
  useProxy: false,
});

export const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      responseType: ResponseType.Code,
      redirectUri,
    },
    discovery
  );

  const { token, exchangeError } = useAutoExchange(
    response?.type === "success" ? response.params.code : null
  );

  useEffect(() => {
    loadStorageData();
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;

      // TESTING ONLY
      console.log("Successfully retrieved auth code: ", code);

      setStoredCode(code);
    }

    if (token) {
      setStoredAuthToken(token);
    }

    if (exchangeError) {
      console.log("token exchange error: ", exchangeError);
    }
  }, [token, exchangeError]);

  const loadStorageData = async () => {
    try {
      const value = await AsyncStorage.getItem(TOKEN_NAME);

      if (value) {
        const storedToken = JSON.parse(value);

        // TESTING ONLY
        const storedCode = await AsyncStorage.getItem(CODE_NAME);
        console.log("@AuthCode: ", storedCode);
        console.log("Successfully loaded token: ", storedToken);

        setAuthToken(storedToken);

        const { membership_id } = storedToken;

        const { Response } = await getMembershipsById(membership_id, 0);

        const user = {
          xbox: {
            membershipType: Response.destinyMemberships[0].membershipType,
            membershipId: Response.destinyMemberships[0].membershipId,
            displayName: Response.destinyMemberships[0].displayName,
          },
          bungie: {
            displayName: Response.bungieNetUser.displayName,
            membershipId: Response.bungieNetUser.membershipId,
            profilePicture: `https://www.bungie.net${Response.bungieNetUser.profilePicturePath}`,
          },
        };

        setUser(user);
      }
    } catch (err) {
      console.log("Error retrieving @AuthToken");
    }
  };

  const setStoredCode = async (code) => {
    try {
      await AsyncStorage.setItem(CODE_NAME, JSON.stringify(code));

      // TESTING ONLY
      console.log("Successfully stored @AuthCode: ", code);
    } catch (err) {
      console.log("Error saving @AuthCode");
    }
  };

  const setStoredAuthToken = async (token) => {
    try {
      await AsyncStorage.setItem(TOKEN_NAME, JSON.stringify(token));

      // TESTING ONLY
      console.log("Successfully stored @AuthToken: ", token);
    } catch (err) {
      console.log("Error saving @AuthToken");
    }
  };

  // TESTING ONLY
  const deleteCodeAndToken = async () => {
    try {
      await AsyncStorage.removeItem(CODE_NAME);

      console.log("Successfully deleted @AuthCode");
    } catch (e) {
      console.log("Error deleting @AuthCode");
    }

    try {
      await AsyncStorage.removeItem(TOKEN_NAME);
      console.log("Successfully deleted @AuthToken");
    } catch (e) {
      console.log("Error deleting @AuthToken");
    }
  };

  const signIn = () => promptAsync();

  return (
    <AuthContext.Provider
      value={{
        request,
        authToken,
        signIn,
        setAuthToken,
        user,
        deleteCodeAndToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAutoExchange(code) {
  const [state, setState] = useReducer(
    (state, action) => ({ ...state, ...action }),
    { token: null, exchangeError: null }
  );

  useEffect(() => {
    if (!code) {
      setState({ token: null, exchangeError: null });
      return;
    }

    fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        'client_id': `${CLIENT_ID}`, // prettier-ignore
        'grant_type': "authorization_code", // prettier-ignore
        'code': `${code}`, // prettier-ignore
      }).toString(),
    })
      .then(async (res) => {
        const token = await res.json();

        // TESTING ONLY
        console.log("Successfully exchanged auth code for token: ", token);

        setState({ token, exchangeError: null });
      })
      .catch((exchangeError) => {
        // TESTING ONLY
        console.log("Error exchanging auth code for token: ", exchangeError);

        setState({ exchangeError, token: null });
      });
  }, [code]);

  return state;
}
