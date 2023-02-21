import { getContract } from "@wagmi/core"
import { VertRouter } from "./abis/types"
import VertRouterAbi from "./abis/contracts/VertRouter.json"
import { chainId } from "./config"

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
  chainId === 56
    ? bscAddresses[contractName]
    : bscTestnetAddresses[contractName]

// returns contracts and abis
const getContracts = () => {
  const vertRouter = getContract({
    address: getAddress(ContractNames.VERTROUTER),
    abi: VertRouterAbi,
  }) as VertRouter

  return {
    vertRouter,
    VertRouterAbi,
  }
}

export default getContracts
