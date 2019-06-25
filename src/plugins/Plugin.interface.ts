export interface ISignin {
  account: string,
  password: string,
}

export interface ISign {
  account: string,
  password: string,
  data: string,
}

export interface ITransact extends ISignin {
  params: any,
}

export abstract class BlockchainPlugin {
  abstract sign: (p: ISign, ...any) => any
  abstract signin: (p: ISignin, ...any) => Promise<any>
  abstract transact: (p: ITransact) => Promise<any>
  abstract getIdentifier: (account: any) => string
}