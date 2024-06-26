import axios from "axios";
import { environment } from "./environment";
import { ethers } from "ethers";
import { Web3AllowlistProvider } from "@aut-labs/abi-types";

export const AUTH_TOKEN_KEY = "user-access-token";

export const authoriseWithWeb3 = async (
  signer: ethers.JsonRpcSigner
): Promise<boolean | any> => {
  const account = await signer.getAddress();

  const responseNonce = await axios.get(
    `${environment.apiUrl}/autID/user/nonce/${account}`
  );

  const nonce = responseNonce.data.nonce;

  const signature = await signer.signMessage(`${nonce}`);

  const jwtResponse = await axios.post(
    `${environment.apiUrl}/autID/user/getToken`,
    {
      address: account,
      signature
    }
  );
  localStorage.setItem(AUTH_TOKEN_KEY, jwtResponse.data.token);
  const isAuthorised = !!jwtResponse.data.token;
  return isAuthorised;
};

export const isAllowListed = async (
  signer: ethers.JsonRpcSigner,
  contractAddress: string
) => {
  try {
    const account = signer.address;
    const contract = Web3AllowlistProvider(contractAddress, {
      signer: () => signer
    });
    const isAllowed = await contract.isAllowed(account);
    if (!isAllowed) {
      throw new Error(
        "Aw shucks, it looks like you’re not on the Allowlist for this round."
      );
    }
    return isAllowed;
  } catch (error) {
    throw new Error(
      "Aw shucks, it looks like you’re not on the Allowlist for this round."
    );
  }
};
