import React, { useState } from 'react'
import { Keycat } from '@telosnetwork/telos-keycatjs'
import Web3 from 'web3'

const Instructor = () => {
  const [address, setAddress] = useState(null)

  const sendTransaction = async e => {
    e.preventDefault()

    const web3: Web3 = new Keycat({
      blockchain: {
        name: 'local',
        plugin: 'ethereum',
        rpcUrl: 'http://localhost:7545',
      },
      __keycatOrigin: 'http://localhost:3030',
    }).web3(Web3)

    // const signed = await web3.eth.sign('hello', '0x97f783e5830C35D2B8280aEfF2c35626a1c6E320')
    // console.log(signed)

    const { raw } = await web3.eth.signTransaction({
      from: '0x97f783e5830C35D2B8280aEfF2c35626a1c6E320',
      to: '0x69D392F7A5f9Ea31644C3d250d0a65FCB565E1Cd',
      value: '0x01',
    })

    const receipt = await web3.eth.sendSignedTransaction(raw)
    console.log(receipt)
    // try {
    //   const result = await web3.eth
    //     .sendTransaction({
    //       from: '0x97f783e5830C35D2B8280aEfF2c35626a1c6E320',
    //       to: '0x69D392F7A5f9Ea31644C3d250d0a65FCB565E1Cd',
    //       value: '0x01',
    //       gas: '0x123456',
    //     })
    //     .on('transactionHash', console.log)
    //     .on('confirmation', (...args) => {
    //       console.log('confirmation', ...args)
    //     })
    //     .on('receipt', r => console.log('RECEIPT', r))
    // } catch (err) {
    //   console.log(err)
    // }

    // const contract = new web3.eth.Contract(
    //   [
    //     {
    //       constant: false,
    //       inputs: [
    //         {
    //           name: 'x',
    //           type: 'uint256',
    //         },
    //       ],
    //       name: 'set',
    //       outputs: [],
    //       payable: false,
    //       stateMutability: 'nonpayable',
    //       type: 'function',
    //     },
    //     {
    //       constant: true,
    //       inputs: [],
    //       name: 'get',
    //       outputs: [
    //         {
    //           name: '',
    //           type: 'uint256',
    //         },
    //       ],
    //       payable: false,
    //       stateMutability: 'view',
    //       type: 'function',
    //     },
    //   ],
    //   '0xc7cfb21ec9e295fa6fd1a27104ac0eb7869a4f0c',
    // )

    // // contract.methods
    // //   .get()
    // //   .call()
    // //   .then(console.log)
    // contract.methods.set(2).send({ from: '0x97f783e5830C35D2B8280aEfF2c35626a1c6E320' }, (error, hash) => {
    //   if (error) return

    //   console.log(hash)
    // })
  }

  const handleSignin = async e => {
    e.preventDefault()
    // const result = await keycat.signin()
    // setAddress(result.address)
  }

  return (
    <div>
      <div>
        {!address ? <button onClick={sendTransaction}>Sign in to local RPC</button> : <div>Hello {address}</div>}
      </div>
    </div>
  )
}

export default Instructor
