function isDarkModeEnabled() {
  return localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
}

const darkModeButton = document.getElementById('dark-mode-button');
darkModeButton.addEventListener('click', (e) => {
  if(isDarkModeEnabled()){
    // disable it
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
    darkModeButton.innerHTML = `<svg class="feather" width="${16}" height="${16}"><use href="/static/img/icons/feather-sprite.svg#${'moon'}" /></svg>`
    console.log("dark mode disabled");
  } else{
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
    darkModeButton.innerHTML = `<svg class="feather" width="${16}" height="${16}"><use href="/static/img/icons/feather-sprite.svg#${'sun'}" /></svg>`
    console.log("dark mode enabled");
  }

})

// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (isDarkModeEnabled()) {
  document.documentElement.classList.add('dark')
  darkModeButton.innerHTML = `<svg class="feather" width="${16}" height="${16}"><use href="/static/img/icons/feather-sprite.svg#${'sun'}" /></svg>`
} else {
  document.documentElement.classList.remove('dark')
  darkModeButton.innerHTML = `<svg class="feather" width="${16}" height="${16}"><use href="/static/img/icons/feather-sprite.svg#${'moon'}" /></svg>`
}

// // Whenever the user explicitly chooses light mode
// localStorage.theme = 'light'

// // Whenever the user explicitly chooses dark mode
// localStorage.theme = 'dark'

// // Whenever the user explicitly chooses to respect the OS preference
// localStorage.removeItem('theme')