export interface NetworkContracts {
  autIDAddress: string;
  daoExpanderRegistryAddress: string;
  daoExpanderFactoryAddress: string;
  novaRegistryAddress: string;
  allowListAddress: string;
  novaFactoryAddress: string;
  hackerDaoAddress: string;
  daoTypesAddress: string;
}

export interface NetworkConfig {
  network: string;
  name: string;
  chainId: string | number;
  rpcUrls: string[];
  explorerUrls: string[];
  biconomyApiKey: string;
  contracts: NetworkContracts;
  disabled: boolean;
  nativeCurrency: any;
}
