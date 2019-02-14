const state = new Map();

const baseUri = 'http://172.16.100.28:8080';

const loginBox = document.getElementById('login');


let popup;
const openPopup = (pathname) => {
  popup = window.open(baseUri + pathname, 'xafe', 'height=800,width=640');
  if (popup) {
    popup.focus();
  }
  return popup;
}

loginBox.addEventListener('click', () => {
  openPopup('/');
});

document.getElementById('buyram').addEventListener('click', () => {
  const accountName = state.get('accountName');
  const transaction = {
    actions: [{
      account: 'eosio',
      name: 'buyrambytes',
      authorization: [{
        permission: 'active',
        actor: accountName,
      }],
      data: {
        payer: accountName,
        receiver: accountName,
        bytes: 4096,
      },
    }],
  };
  openPopup(`/transaction?payload=${JSON.stringify(transaction)}`);
});

window.addEventListener('message', (e) => {
  if (!e.origin.includes('8080')) return;
  if (popup) {
    popup.close();
  }

  const { data: { type, payload } } = e;
  switch (type) {
    case 'login':
      alert(`loggged in as ${payload}`);
      state.set('accountName', payload);
      break;
    case 'tx':
      alert(`success ${payload}`);
      break;
    default:
      return;
  }
});


