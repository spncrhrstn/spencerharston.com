function isDarkModeEnabled() {
  return localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
}

function enableDarkMode(isSet) {
  if(isSet){
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

// Run this again now that we have the DOM loaded
enableDarkMode(isDarkModeEnabled());
