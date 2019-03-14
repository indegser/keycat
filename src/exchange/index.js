import Peekaboo from 'pkbjs';

document.getElementById('login')
  .addEventListener('click', () => {
    const useTestnet = document.getElementById('testnet').checked;
    const nodes = useTestnet ? [
      "http://nodeos.eosdaq.test:18888",
    ] : null;
    const peekaboo = new Peekaboo({
      network: {
        name: `eos@${useTestnet ? 'local' : 'junglenet'}`,
        nodes,
      }
    });

    peekaboo.signin()
      .then(r => console.log(r));
  });

document.getElementById('buyram').addEventListener('click', () => {
  const identifier = peekaboo.getIdentifier();
  const transaction = {
    actions: [{
      account: 'eosio',
      name: 'buyrambytes',
      authorization: [{
        permission: 'active',
        actor: identifier,
      }],
      data: {
        payer: identifier,
        receiver: identifier,
        bytes: 4096,
      },
    }],
  };

  peekaboo.transaction(transaction)
    .then(r => {
      console.log(r);
    });
});
