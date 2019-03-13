import pkb from 'pkbjs';
const wallet = pkb();
wallet.useNetwork('local', [
  "http://nodeos.eosdaq.test:18888",
]);

document.getElementById('login')
  .addEventListener('click', () => {
    const useTestnet = document.getElementById('testnet').checked;
    const nodes = useTestnet ? [
      "http://nodeos.eosdaq.test:18888",
    ] : null;
    wallet.useNetwork(`eos@${useTestnet ? 'local' : 'junglenet'}`, nodes);
    wallet.signin()
      .then(r => console.log(r));
  });

document.getElementById('buyram').addEventListener('click', () => {
  const identifier = wallet.getIdentifier();
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

  wallet.transaction(transaction)
    .then(r => {
      console.log(r);
    });
});

// window.addEventListener('message', (e) => {
//   if (!e.origin.includes('8080')) return;
//   if (popup) {
//     popup.close();
//   }

//   const { data: { type, payload } } = e;
//   switch (type) {
//     case 'signin':
//       state.set('identifier', payload);
//       console.log(`logged in as ${payload}`);
//       break;
//     case 'tx':
//       alert(`success ${payload}`);
//       break;
//     default:
//       return;
//   }
// });


