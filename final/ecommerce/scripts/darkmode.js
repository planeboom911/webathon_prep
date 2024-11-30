const toggleButton = document.getElementById('toggle-dark-mode');

toggleButton.addEventListener('click', () => {
  if (toggleButton.src.includes('dark-mode.svg')) {
    toggleButton.src = 'icons/light-mode.svg';
  } else {
    toggleButton.src = 'icons/dark-mode.svg';
  }
    document.body.classList.toggle('dark-mode');
  });