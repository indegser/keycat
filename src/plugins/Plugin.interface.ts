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
  abstract sign: (p: ISign, ...any) => any
  abstract signin: (p: ISignin, ...any) => Promise<any>

  abstract getIdentifier: (account: any) => string
}