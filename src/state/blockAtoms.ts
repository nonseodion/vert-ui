import { atom, useAtom } from "jotai"
import { useBlockNumber as useBlockNumberWagmi } from "wagmi"

export const blockNumberAtom = atom<number>(0)

export const updateBlockNumberAtom = atom(
  null,
  (get, set, blockNumber: number) => {
    set(blockNumberAtom, blockNumber)
  }
)

export const useBlockNumber = () => {
  const [, updateBlockNumber] = useAtom(updateBlockNumberAtom)

  const { data } = useBlockNumberWagmi({
    watch: false,
    staleTime: 5_000,
  })

  if (data !== undefined) updateBlockNumber(data)
}
