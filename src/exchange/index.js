import Peekaboo from 'pkbjs';

let peekaboo;

document.getElementById('login')
  .addEventListener('click', () => {
    const useTestnet = document.getElementById('testnet').checked;
    const nodes = useTestnet ? [
      "http://nodeos.eosdaq.test:18888",
    ] : null;

    peekaboo = new Peekaboo({
      network: {
        name: `eos@${useTestnet ? 'local' : 'junglenet'}`,
        nodes,
      }
    });

    peekaboo.signin()
      .then(identifier => {
        localStorage.setItem('identifier', identifier);
      });
  });

document.getElementById('buyram').addEventListener('click', () => {
  const identifier = localStorage.getItem('identifier');

  const transaction = {
    actions: [{
      account: 'eosio',
      name: 'delegatebw',
      authorization: [{
        permission: 'active',
        actor: identifier,
      }],
      data: {
        from: identifier,
        receiver: identifier,
        stake_net_quantity: '1.0000 EOS',
        stake_cpu_quantity: '1.0000 EOS',
        transfer: false,
      },
    }],
  };

  peekaboo.transaction(identifier, transaction)
    .then(r => {
      console.log(r);
    });
});
