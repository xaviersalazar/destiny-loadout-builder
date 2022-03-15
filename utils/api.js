import { configureRefreshFetch, fetchJSON } from "refresh-fetch";
import { TOKEN_ENDPOINT, CLIENT_ID } from "react-native-dotenv";
import AsyncStorage from "@react-native-async-storage/async-storage";
import merge from "lodash/merge";

const CODE_NAME = "@AuthCode";
const TOKEN_NAME = "@AuthToken";

const retrieveCode = async () => {
  const value = await AsyncStorage.getItem(CODE_NAME);

  if (value) {
    return JSON.parse(value);
  }
};

const retrieveToken = async () => {
  const value = await AsyncStorage.getItem(TOKEN_NAME);

  if (value) {
    return JSON.parse(value);
  }
};

const saveToken = async (token) =>
  await AsyncStorage.setItem(TOKEN_NAME, JSON.stringify(token));

const removeToken = async () => await AsyncStorage.removeItem(TOKEN_NAME);

const fetchJSONWithToken = (url, options = {}) => {
  const { access_token: token } = retrieveToken();

  let optionsWithToken = options;

  if (token != null) {
    optionsWithToken = merge({}, options, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return fetchJSON(url, optionsWithToken);
};

const shouldRefreshToken = (error) => error.response.status === 401;

const refreshToken = async () => {
  const code = retrieveCode();

  removeToken();

  return fetchJSONWithToken(TOKEN_ENDPOINT, {
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
      const token = await res.body.token;
      console.log("refresh token", token);

      saveToken(token);
    })
    .catch((error) => error);
};

export const fetch = configureRefreshFetch({
  shouldRefreshToken,
  refreshToken,
  fetch: fetchJSONWithToken,
});
