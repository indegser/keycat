export type Blockchain = {
  id: string
  name: string
  network?: string
  nodes?: string[]
  precision: number
  symbol: string
  testnets: Partial<Blockchain>[]
}