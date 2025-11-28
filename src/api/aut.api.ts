import { NetworkConfig } from "./ProviderFactory/network.config";
import { getNetworkConfigs } from "./network-configs";
import { environment } from "./environment";

export const getAppConfig = (): Promise<NetworkConfig[]> => {
  return Promise.resolve(getNetworkConfigs(environment.networkEnv));
};
