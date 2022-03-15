import { API_KEY } from "react-native-dotenv";
import { fetch } from "./api";
import { DESTINY_DEFINITIONS, EXOTIC_TYPE } from "./bungieApiDefinitions";

const ROOT_ENDPOINT = "https://www.bungie.net/Platform";

const headers = {
  "x-api-key": "ff53295d381540ff9a1cd8d6a3e18b91", // TODO: Move this to .env
};

const getManifest = async (entityType, hashIdentifier) => {
  return await fetch(
    `${ROOT_ENDPOINT}/Destiny2/Manifest/${entityType}/${hashIdentifier}`,
    {
      method: "GET",
      headers,
    }
  )
    .then((res) => {
      // TODO: make this more usable for different entity types
      if (entityType === DESTINY_DEFINITIONS.DESTINY_INVENTORY_ITEM) {
        const {
          displayProperties,
          itemType,
          itemSubType,
          itemTypeDisplayName,
          inventory,
        } = res.body.Response;

        return {
          displayProperties,
          itemTypeDisplayName,
          itemType,
          itemSubType,
          isExotic: inventory?.tierType === EXOTIC_TYPE,
        };
      } else {
        return res.body;
      }
    })
    .catch((err) => err);
};

const getMembershipsById = async (membershipId, membershipType) => {
  return await fetch(
    `${ROOT_ENDPOINT}/User/GetMembershipsById/${membershipId}/${membershipType}`,
    {
      method: "GET",
      headers,
    }
  )
    .then((res) => res.body)
    .catch((err) => err);
};

const getDestinyCharacters = async (membershipType, destinyMembershipId) => {
  return await fetch(
    `${ROOT_ENDPOINT}/Destiny2/${membershipType}/Profile/${destinyMembershipId}?components=200`,
    {
      method: "GET",
      headers,
    }
  )
    .then((res) => res.body)
    .catch((err) => err);
};

const getEquippedItemsForCharacter = async (
  membershipType,
  destinyMembershipId,
  characterId
) => {
  return await fetch(
    `${ROOT_ENDPOINT}/Destiny2/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}?components=205`,
    {
      method: "GET",
      headers,
    }
  )
    .then((res) => res.body)
    .catch((err) => err);
};

export {
  getManifest,
  getMembershipsById,
  getDestinyCharacters,
  getEquippedItemsForCharacter,
};
