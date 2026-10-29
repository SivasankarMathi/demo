const form = document.getElementById('form');
const msg = document.getElementById('msg');
form.addEventListener('submit', e => {
  e.preventDefault();
  msg.className = '';
  const email = form.email.value.trim();
  if (!/^\S+@\S+\.\S+$/.test(email)) { msg.textContent = 'Enter a valid email.'; return; }
  if (form.password.value.length < 6) { msg.textContent = 'Password must be at least 6 characters.'; return; }
  msg.className = 'ok';
  msg.textContent = 'Login successful (demo only).';
});
