export interface ISignin {
  account: string,
  password: string,
}

export interface ISign {
  account: string,
  password: string,
  data: string,
}

export abstract class BlockchainPlugin {
  abstract sign: (p: ISign) => any
  abstract signin: (p: ISignin) => Promise<any>

  abstract getIdentifier: (account: any) => string
}