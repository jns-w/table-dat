import { ExplorerAPI } from "explorer_api_js";

export const mainnet_explorer_api = new ExplorerAPI(process.env.NEXT_PUBLIC_MAINNET_EXPLORER_API as string)
export const testnet_explorer_api = new ExplorerAPI(process.env.NEXT_PUBLIC_TESTNET_EXPLORER_API as string)

export function getAPIClient(network: "Mainnet" | "Testnet") {
  return network === "Mainnet" ? mainnet_explorer_api : testnet_explorer_api
}