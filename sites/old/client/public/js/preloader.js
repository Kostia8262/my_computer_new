console.log(`░░░░░░░░░░░░░░░░░░░░▄▄▄▄▄▄▄░░░░░░░
░░░░░░░░▄▄▄░░░░░░▄███████████▄░░░░
░░░░▄█████████▄▄███████████████▄░░
░░██████████████████████▀░░░░▀▀▀█▄
░▀▀░░░▄▄██████████████████▄░░░░░░░
░░░▄████████████████████████▄░░░░░
░░▄████▀▀██████▀████░░▀██████▄░░░░
░▄███▀░░██████░░░███▄░░░░█████░░░░
░██▀░░░██████░░░░████░░░░░████░░░░
░█▀░░░░█████░░░░░█████░░░░░██▀░░░░
░▀░░░░░█████░░░░░█████░░░░░██░░░░░
░░░░░░░░███░░░░░░█████░░░░░▀░░░░░░
░░░░░░░░░██░░░░░░█████░░░░░░░░░░░░
░░░░░░░░░░▀█░░░░░█████░░░░░░░░░░░░
░░░░░░░░░░░░░░░░██████░░░░░░░░░░░░
░░░░░░░░░░░░░░░▄██████░░░░░░░░░░░░
░░░░░░░░░▄▄▄▄▄▄███████▄▄░░░░░░░░░░
▄▄▄██████████████████████▄▄▄░░░░░░
▀█████████████████████████▀▀░░░░░░`);

console.log('MY COMPUTER ACADEMY');

window.addEventListener('load', () => {
  const preload = document.querySelector('.preloader');
  if (!preload) return;

  // Fade starts the instant the page is ready — matches the 0.5s
  // transition already defined in preloader.css, no artificial padding.
  const removeDelay = 500;

  preload.classList.add('preloader--hidden');
  document.body.classList.remove('preloader_body');

  setTimeout(() => {
    preload.remove();
    sessionStorage.setItem('preload', true);
  }, removeDelay);
});
