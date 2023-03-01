function isDarkModeEnabled() {
  return localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
}

function enableDarkMode(set) {
  if(set){
    document.documentElement.classList.add("dark");
    darkModeButton.innerHTML = `<svg class="feather" width="${16}" height="${16}"><use href="/static/img/icons/feather-sprite.svg#${"sun"}" /></svg>`;
    console.log("( •_•)>⌐■-■");
  } else {
    document.documentElement.classList.remove("dark");
    darkModeButton.innerHTML = `<svg class="feather" width="${16}" height="${16}"><use href="/static/img/icons/feather-sprite.svg#${"moon"}" /></svg>`;
    console.log("(⌐■_■)");  
  }
}

const darkModeButton = document.getElementById("dark-mode-button");
darkModeButton.addEventListener("click", () => {
  // handle user explicitly enable/disable theme
  if(isDarkModeEnabled()){
    // disable it
    enableDarkMode(false);
    localStorage.theme = "light";
  } else{
    enableDarkMode(true);
    localStorage.theme = "dark";
  }
});

// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (isDarkModeEnabled()) {
  enableDarkMode(true);
} else {
  enableDarkMode(false);
}
