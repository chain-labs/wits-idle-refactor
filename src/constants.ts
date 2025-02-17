import { envVars } from "./envVars";

export const IMAGEKIT = "https://ik.imagekit.io/qvs5pk2dl/Wits-Idle";

export const PROJECT_ID = "9dc0f8c0aa31f9c7fdd6f5e46978aa16";

export const SUBGRAPH_URL = envVars.TEST_NETWORK
? "https://abs-indexer-testnet-production.up.railway.app/"
: "";
// TODO: add mainnet subgraph here

export const AGW_PAYMASTER = "0x5407B5040dec3D339A9247f3654E59EEccbb6391";


// backend API url
export const API_ENDPOINT = window.location.origin + "/api";