interface IEosConfig {
  nodes: string[]
}

interface IKlaytnConfig {
  rpcUrl: string
}

interface IEthereumConfig {
  provider: string
}

export interface IBlockchain {
  name: string
  displayName: string
  website: string
  precision: number
  symbol: string
  icon: string
  testnets: Array<Partial<IBlockchain>>
  config: IEosConfig | IKlaytnConfig | IEthereumConfig
}
