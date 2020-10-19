export const parseTransactionResult = (data, blockchain) => {
  if (blockchain.indexOf('eos') >= 0) {
    return {
      id: data.transaction_id,
    }
  }

  switch (blockchain) {
    case 'ethereum':
    case 'ropsten':
      return {
        id: data.hash,
      }
  }
  return {
    id: data.transactionHash,
  }
}

export const getTransactionHref = (blockchain, txId) => {
  switch (blockchain) {
    case 'eos-jungle':
      return `https://jungle.bloks.io/transaction/${txId}`
    case 'eos':
      return `https://bloks.io/transaction/${txId}`
    case 'klaytn-baobab':
      return `https://baobab.klaytnscope.com/tx/${txId}`
    default:
      return
  }
}
