const loginBox = document.getElementById('login');
loginBox.addEventListener('click', () => {
  const popup = window.open('http://localhost:8080', 'xafe', 'height=800,width=640');
  if (popup) {
    popup.focus();
  }

  popup.onmessage = (e) => {
    console.log(e);
  }
})