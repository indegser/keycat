export interface ISignin {
  account: string,
  password: string,
}

export abstract class BlockchainPlugin {
  abstract sign: () => any
  abstract signin: <T>(p: ISignin) => Promise<T>
}