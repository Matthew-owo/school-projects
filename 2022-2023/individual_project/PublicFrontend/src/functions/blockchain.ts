import { Contract, providers } from "ethers";

import supplyChainJson from "@/constants/SupplyChain.json";

const getProvider = async (): Promise<providers.JsonRpcProvider> => {
  // Get the blockchain network JSON RPC URL
  const url = process.env.BLOCKCHAIN_RPC_URL || "http://127.0.0.1:8545";
  // Connect to the blockchain network
  const provider: providers.JsonRpcProvider = new providers.JsonRpcProvider(url);

  return provider;
};

const getContract = async (): Promise<Contract> => {
  const provider: providers.JsonRpcProvider = await getProvider();

  const accountAddress: string | undefined = process.env.ACCOUNT_ADDRESS;

  const signer: providers.JsonRpcSigner = provider.getSigner(accountAddress || "0x1C867cC829C38613346F93612eC47a2051012e16");

  // // Get the account of private key
  // const privateKey: string =
  //   process.env.ACCOUNT_PRIVATE_KEY || "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  // // Create a Wallet object using private key and provider
  // const wallet: Wallet = new ethers.Wallet(privateKey, provider);

  // Get the Supply Chain's ABI
  const abi = supplyChainJson.abi;
  // Get the Supply Chain Contract's address
  const contractAddress: string = process.env.CONTRACT_ADDRESS || "0x5fbdb2315678afecb367f032d93f642f64180aa3";
  // Create a Contract object
  const contract: Contract = new Contract(contractAddress, abi, signer);

  return contract;
};

export { getProvider, getContract };
