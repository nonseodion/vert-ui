import { getContract } from "@wagmi/core"
import { VertRouter } from "./abis/types"
import VertRouterAbi from "./abis/contracts/VertRouter.json"
import PairAbi from "./abis/contracts/Pair.json"
import { activeChainId } from "./config"
import { Pair as PairContractType } from "./abis/types/Pair"

enum ContractNames {
  VERTROUTER = "vertRouter",
}

const bscAddresses = {
  [ContractNames.VERTROUTER]: "",
}

const bscTestnetAddresses = {
  [ContractNames.VERTROUTER]: "0x74ad3f1C96E23456B8e6c9D7d7F67d1169949b5B",
}

const getAddress = (contractName: ContractNames) =>
  activeChainId === 56
    ? bscAddresses[contractName]
    : bscTestnetAddresses[contractName]

// returns contracts
const getContracts = () => {
  const vertRouter = getContract({
    address: getAddress(ContractNames.VERTROUTER),
    abi: VertRouterAbi,
  }) as VertRouter

  /**
   * @dev Always attach an address before utilising
   * */
  const pair = getContract({
    address: "0x74ad3f1C96E23456B8e6c9D7d7F67d1169949b5B", // dummy address
    abi: PairAbi,
  }) as PairContractType

  return {
    vertRouter,
    pair,
  }
}

export const getAbis = () => ({
  VertRouterAbi,
  PairAbi,
})

export default getContracts
