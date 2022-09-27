import { getNetworkVariables } from '@api/environment';
import { createSlice } from '@reduxjs/toolkit';
import { NetworkConfig } from '@store/model';
import { ethers } from 'ethers';

export interface WalletProviderState {
  signer: ethers.providers.JsonRpcSigner;
  selectedWalletType: 'injected' | 'walletConnect';
  selectedNetwork: string;
  networkConfig: NetworkConfig;
  isOpen: boolean;
}

const initialState: WalletProviderState = {
  signer: null,
  selectedWalletType: null,
  selectedNetwork: null,
  networkConfig: null,
  isOpen: false,
};

export const walletProviderSlice = createSlice({
  name: 'walletProvider',
  initialState,
  reducers: {
    setSigner(state, action) {
      state.signer = action.payload;
    },
    setWallet(state, action) {
      state.selectedWalletType = action.payload;
    },
    setProviderIsOpen(state, action) {
      state.isOpen = action.payload;
    },
    setNetwork(state, action) {
      state.selectedNetwork = action.payload as string;
      if (!action.payload) {
        state.networkConfig = null;
      } else {
        state.networkConfig = getNetworkVariables(action.payload);
      }
    },
    resetWalletProviderState: () => initialState,
  },
});

export const { setSigner, setWallet, setNetwork, setProviderIsOpen } = walletProviderSlice.actions;

export const NetworkSelectorIsOpen = (state: any) => state.walletProvider.isOpen as boolean;
export const SelectedWalletType = (state: any) => state.walletProvider.selectedWalletType as string;
export const NetworkSigner = (state: any) => state.walletProvider.signer as ethers.providers.JsonRpcSigner;
export const SelectedNetworkConfig = (state: any) => state.walletProvider.networkConfig as NetworkConfig;

export default walletProviderSlice.reducer;
