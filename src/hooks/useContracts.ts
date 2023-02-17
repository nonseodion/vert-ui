import { useContract } from "wagmi"
import { VertRouter } from "../utils/abis/types"
import VertRouterAbi from "../utils/abis/contracts/VertRouter.json"
import { chainId } from "../utils/config"

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
const useContracts = () => {
  const vertRouter = useContract({
    address: getAddress(ContractNames.VERTROUTER),
    abi: VertRouterAbi,
  }) as VertRouter

  return {
    vertRouter,
    VertRouterAbi,
  }
}

export default useContracts
