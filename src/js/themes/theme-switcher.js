//-----------------------------Theme Switcher-------------------------------------------------------

const switcherEl = document.querySelector('.switch__input');

switcherEl.addEventListener('change', onColorSwitch);

function onColorSwitch() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
}

//---------------------------------------------------------------------------------------------------