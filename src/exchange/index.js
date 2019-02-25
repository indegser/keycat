const state = new Map();

const baseUri = 'http://localhost:8080';

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
  openPopup('/signin');
});

document.getElementById('buyram').addEventListener('click', () => {
  const identifier = state.get('identifier');
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
  openPopup(`/transaction?identifier=${identifier}&payload=${JSON.stringify(transaction, null, 2)}`);
});

window.addEventListener('message', (e) => {
  if (!e.origin.includes('8080')) return;
  if (popup) {
    popup.close();
  }

  const { data: { type, payload } } = e;
  switch (type) {
    case 'signin':
      alert(`loggged in as ${payload}`);
      state.set('identifier', payload);
      break;
    case 'tx':
      alert(`success ${payload}`);
      break;
    default:
      return;
  }
});


