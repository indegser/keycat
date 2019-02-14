const state = new Map();

const loginBox = document.getElementById('login');
let popup;
loginBox.addEventListener('click', () => {
  popup = window.open('http://localhost:8080', 'xafe', 'height=800,width=640');
  if (popup) {
    popup.focus();
  }
})

window.addEventListener('message', (e) => {
  if (!e.origin.includes('8080')) return;
  if (popup) {
    popup.close();
  }

  const { data: { type, payload } } = e;
  switch (type) {
    case 'login':
      console.log(`loggged in as ${payload}`);
      state.set('accountName', payload);
      break;
    default:
      return;
  }
});
