import {
  CommunityRegistryContractEventType,
  PartnersRegistryContractEventType,
  Web3CommunityRegistryProvider,
  Web3PartnersRegistryProvider,
  Web3SkillWalletProvider,
} from '@skill-wallet/sw-abi-types';
import { ethers } from 'ethers';
import { Community } from './community.model';
import { generatePartnersKey } from './dito.api';
import { environment, EnvMode } from './environment';
import { Web3ThunkProviderFactory } from './ProviderFactory/web3-thunk.provider';
import { getAutAddress } from './aut.api';
import { ipfsCIDToHttpUrl, storeAsBlob, storeMetadata } from './textile.api';

const communityRegistryThunkProvider = Web3ThunkProviderFactory('CommunityRegistry', {
  provider: Web3CommunityRegistryProvider,
});

const partnersRegistryThunkProvider = Web3ThunkProviderFactory('PartnersRegistry', {
  provider: Web3PartnersRegistryProvider,
});

export const createPartnersCommunity = communityRegistryThunkProvider(
  {
    type: 'integrate/create/community',
    event: CommunityRegistryContractEventType.CommunityCreated,
  },
  () => {
    return Promise.resolve(environment.communityRegistryAddress);
  },
  async (contract, requestBody: { metadata: Community; contractType: number; daoAddr: string }) => {
    const { metadata, contractType, daoAddr } = requestBody;
    console.log('Metadata -> ', metadata);
    console.log('ContractType -> ', contractType);
    console.log('DaoAddr -> ', daoAddr);
    const cid = await storeAsBlob(metadata);
    console.log('Metadata url -> ', ipfsCIDToHttpUrl(cid));
    const response = await contract.createCommunity(contractType, daoAddr, metadata.properties.market, cid, metadata.properties.commitment);
    return response[0];
  }
);

export const createPartnersAgreement = partnersRegistryThunkProvider(
  {
    type: 'integrate/create/agreement',
    event: PartnersRegistryContractEventType.PartnersAgreementCreated,
  },
  () => {
    return Promise.resolve(environment.partnersRegistryAdress);
  },
  async (
    contract,
    requestBody: {
      community: Community;
      numOfActions: number;
      contractAddress: string;
    },
    { getState }
  ) => {
    const { integrate } = getState();
    const { community, numOfActions, contractAddress } = requestBody;

    // const totalRoles = community.properties.skills.roles.slice(0, 3).reduce((prev, curr) => {
    //   prev += curr.roleName ? 1 : 0;
    //   return prev;
    // }, 0);

    const totalRoles = 10;

    const response = await contract.create(
      integrate.communityAddr,
      totalRoles,
      numOfActions,
      contractAddress ?? ethers.constants.AddressZero
    );
    const partnersAddr = response[0].toString();
    const key = await generatePartnersKey(integrate.communityAddr, partnersAddr);
    return {
      key,
      communityAddr: integrate.communityAddr,
      partnersAddr,
    };
  }
);
