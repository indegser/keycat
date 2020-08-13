import { handleActions, createAction } from 'redux-actions'
import { IBlockchain } from 'types/types'
import { Keycat } from '@telosnetwork/telos-keycatjs'
import { KEYCAT_ORIGIN } from 'consts/consts'

const initialState: Partial<IPlayState> = {
  init: false,
}

export interface IPlayState {
  init: boolean
  account: {
    accountName?: string
    address?: string
    identifier?: string
  }
  keycat: Keycat
  blockchain?: string
  blockchains?: {
    entries: IBlockchain[]
    entities: { [name: string]: IBlockchain }
  }
}

export const playActions = {
  init: createAction('play@init'),
  setAccount: createAction('play@setAccount'),
  setBlockchain: createAction('play@setBlockchain'),
}

const buildKeycatWithState = (state: Partial<IPlayState>) => {
  const { blockchains, blockchain } = state
  const { name, config } = blockchains.entities[blockchain]

  return new Keycat({
    blockchain: {
      name,
      ...config,
      plugin: blockchain.split('-')[0] as any,
    },
    __keycatOrigin: KEYCAT_ORIGIN,
  })
}

export const playReducer = handleActions(
  {
    [playActions.setAccount.toString()]: (s, { payload: { account } }) => ({
      ...s,
      account,
    }),
    [playActions.setBlockchain.toString()]: (s, { payload: { blockchain } }) => ({
      ...s,
      blockchain,
      keycat: buildKeycatWithState({ ...s, blockchain }),
      account: blockchain !== s.blockchain ? null : s.account,
    }),
    [playActions.init.toString()]: (s, { payload: { blockchains, blockchain } }) => ({
      ...s,
      init: true,
      blockchains,
      blockchain,
      keycat: buildKeycatWithState({ blockchain, blockchains }),
    }),
  },
  initialState,
)
