import { NetworkConfig } from "./ProviderFactory/network.config";

export const getNetworkConfigs = (networkEnv: string): NetworkConfig[] => {
  if (networkEnv === "mainnet") {
    return [PolygonMainnetConfig];
  }
  return [AmoyTestnetConfig];
};

const AmoyTestnetConfig: NetworkConfig = {
  name: "Amoy (Polygon)",
  chainId: 80002,
  network: "Amoy",
  disabled: false,
  rpcUrls: ["https://polygon-amoy.g.alchemy.com/v2/Skyi471bo5qu1UFfGLHf-DDo0kgKHeXW"],
  explorerUrls: ["https://www.oklink.com/amoy"],
  contracts: {
    autIDAddress: "0x322Cec04d63CDCba9410026B033dEc1015EC346d",
    hubRegistryAddress: "0x5F8DaDD94fc82f8D25156606E6cE5B71559126a2",
    taskRegistryAddress: "0x76361c6C43E0958127dC1Bbe73B9aCAba70d9906",
    hubDomainsRegistryAddress: "0xA2d20DdE1443A6AA825Ac0B7dd960C13bd399d6a",
    interactionFactoryAddress: "0x026a88b2f8ed7997d071714D7524C9A4A72644D3",
    trustedForwarderAddress: "0xfdF2fDE15E285E5C68c72D60956D29b1052e836b",
    globalParametersAddress: "0x576Ef4dd4Fe157C9cbebf0857909FCe9660D243F"
  },
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18
  }
};

const PolygonMainnetConfig: NetworkConfig = {
  name: "Polygon",
  chainId: 137,
  network: "Polygon",
  disabled: true, // Not deployed to mainnet yet
  rpcUrls: ["https://polygon-mainnet.g.alchemy.com/v2/Skyi471bo5qu1UFfGLHf-DDo0kgKHeXW"],
  explorerUrls: ["https://polygonscan.com"],
  contracts: {
    autIDAddress: "",
    hubRegistryAddress: "",
    taskRegistryAddress: "",
    hubDomainsRegistryAddress: "",
    interactionFactoryAddress: "",
    trustedForwarderAddress: "",
    globalParametersAddress: ""
  },
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18
  }
};

