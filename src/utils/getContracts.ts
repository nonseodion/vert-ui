import { getContract } from "@wagmi/core"
import VertRouterAbi from "./abis/contracts/VertRouter.json"
import PairAbi from "./abis/contracts/Pair.json"
import ERC20Abi from "./abis/contracts/ERC20Token.json"
import UniswapInterfaceMulticallAbi from "./abis/contracts/UniswapInterfaceMulticall.json"
import { ChainId, provider } from "./config"
import {
  Pair as PairContractType,
  UniswapInterfaceMulticall as UniswapInterfaceMulticallContractType,
  VertRouter,
  ERC20Token,
} from "./abis/types"

enum ContractNames {
  VERTROUTER = "vertRouter",
  UNISWAPINTERFACEMULTICALL = "UNISWAPINTERFACEMULTICALL",
}

const bscAddresses = {
  [ContractNames.VERTROUTER]: "0x0a055140C146bf8aAca189c65d8572Ee18Dd7e01",
  [ContractNames.UNISWAPINTERFACEMULTICALL]:
    "0x018b527df898381a690a5e9DD4633310d005837b",
  receiver: "0x41912F000D81B24797Bb44dcE9A3e2A821eD0B86",
}

const bscTestnetAddresses = {
  [ContractNames.VERTROUTER]: "0x74ad3f1C96E23456B8e6c9D7d7F67d1169949b5B",
  [ContractNames.UNISWAPINTERFACEMULTICALL]:
    "0x001Da96cb83d65aCFC89510856F5E54da1615F2B",
  receiver: "0x1aB89d35d120c22B44acd9CA44298b5BE8681927",
}

export const getAddress = (
  contractName: keyof typeof bscTestnetAddresses,
  chainId: ChainId
) =>
  chainId === 56
    ? bscAddresses[contractName]
    : bscTestnetAddresses[contractName]

// returns contracts
const getContracts = (chainId: ChainId) => {
  const vertRouter = getContract({
    address: getAddress(ContractNames.VERTROUTER, chainId),
    abi: VertRouterAbi,
  }) as VertRouter

  /**
   * @dev Always attach an address before utilising
   * */
  const pair = getContract({
    address: "0x74ad3f1C96E23456B8e6c9D7d7F67d1169949b5B", // dummy address
    abi: PairAbi,
  }) as PairContractType

  const multicall = getContract({
    address: getAddress(ContractNames.UNISWAPINTERFACEMULTICALL, chainId),
    abi: UniswapInterfaceMulticallAbi,
    signerOrProvider: provider({ chainId }),
  }) as UniswapInterfaceMulticallContractType

  const erc20Token = getContract({
    address: "0x74ad3f1C96E23456B8e6c9D7d7F67d1169949b5B", // dummy address
    abi: ERC20Abi,
    signerOrProvider: provider({ chainId }),
  }) as ERC20Token

  return {
    vertRouter,
    pair,
    multicall,
    erc20Token,
  }
}

export const getAbis = () => ({
  VertRouterAbi,
  PairAbi,
  UniswapInterfaceMulticallAbi,
})

export default getContracts
