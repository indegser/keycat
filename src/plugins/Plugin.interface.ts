export interface ISignin {
  account: string
  password: string
}

export interface ISign {
  account: string
  password: string
  data: string
}

export interface ITransact extends ISignin {
  params: any
}

export abstract class BlockchainPlugin {
  public abstract signin: (p: ISignin) => Promise<any>
  public abstract register: (p: ISignin) => Promise<any>
  public abstract signArbitraryData: (p: ITransact) => Promise<any>
  public abstract signTransaction: (p: ITransact) => Promise<any>
  public abstract transact: (p: ITransact) => Promise<any>
  // abstract getIdentifier: (account: any) => string
}
