import { getDataFromLocalStorage, saveDataToLocalStorage} from "../localstorage/local";

//-----------------------------Theme Switcher-------------------------------------------------------

const switcherEl = document.querySelector('.switch__input');

switcherEl.addEventListener('change', onColorSwitch);

export function onColorSwitch() {
  const currentTheme = document.documentElement.getAttribute('data-theme');

  if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'dark');
    saveDataToLocalStorage('data-theme', 'dark');

  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    saveDataToLocalStorage('data-theme', 'light');
    switcherEl.setAttribute('checked', false);
  }
}

export function switcherCheck() {
  const currentTheme = getDataFromLocalStorage('data-theme');

  if (currentTheme === 'dark' || !currentTheme) {
    document.documentElement.setAttribute('data-theme', 'dark');
    switcherEl.setAttribute('checked', false);
    
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
}

//---------------------------------------------------------------------------------------------------