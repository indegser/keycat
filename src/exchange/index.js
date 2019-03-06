import pkb from 'pkbjs';
const wallet = pkb();

(() => {
  wallet.signin().then((r) => {
    setTimeout(() => {
      alert(`Hello ${r} from exchange.`);
    }, 0)
  })
})()

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


