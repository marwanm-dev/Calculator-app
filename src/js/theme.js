// Theme switcher
let currentTheme = localStorage.getItem('currentTheme') || 'theme-1';

// Onload select current theme
const rootElement = document.documentElement;
document.addEventListener('DOMContentLoaded', () => {
  rootElement.classList.add(`${currentTheme}`);
  if (currentTheme == 'theme-1') {
    move(0);
    rootElement.classList.remove('theme-2');
    rootElement.classList.remove('theme-3');
    rootElement.classList.add('theme-1');
  } else if (currentTheme == 'theme-2') {
    move(1.65);
    rootElement.classList.remove('theme-1');
    rootElement.classList.remove('theme-3');
    rootElement.classList.add('theme-2');
  } else if (currentTheme == 'theme-3') {
    move(3.3);
    rootElement.classList.remove('theme-1');
    rootElement.classList.remove('theme-2');
    rootElement.classList.add('theme-3');
  }
});

// changes ball position
const switchBall = document.querySelector('.switch');
const move = (value, unit = 'rem') => {
  switchBall.style.marginLeft = value + unit;
};

// changes theme
const switcher = document.querySelector('.switcher');
switcher.addEventListener('click', () => {
  if (currentTheme == 'theme-1') {
    move(1.65);
    rootElement.classList.remove('theme-1');
    rootElement.classList.remove('theme-3');
    rootElement.classList.add('theme-2');
    currentTheme = 'theme-2';
    localStorage.setItem('currentTheme', 'theme-2');
  } else if (currentTheme == 'theme-2') {
    move(3.3);
    rootElement.classList.remove('theme-2');
    rootElement.classList.add('theme-3');
    currentTheme = 'theme-3';
    localStorage.setItem('currentTheme', 'theme-3');
  } else if (currentTheme == 'theme-3') {
    move(0);
    rootElement.classList.remove('theme-2');
    rootElement.classList.remove('theme-3');
    rootElement.classList.add('theme-1');
    currentTheme = 'theme-1';
    localStorage.setItem('currentTheme', 'theme-1');
  }
});
