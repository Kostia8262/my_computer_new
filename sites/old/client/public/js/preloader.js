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
  const hasSeenPreloader = sessionStorage.getItem('preload');
  const fadeDelay = hasSeenPreloader ? 500 : 1000;
  const removeDelay = 1000;

  setTimeout(() => {
    preload.classList.add('preloader--hidden');
    document.body.classList.remove('preloader_body');
  }, fadeDelay);

  setTimeout(() => {
    preload.remove();
    sessionStorage.setItem('preload', true);
  }, fadeDelay + removeDelay);
});
