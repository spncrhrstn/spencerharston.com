function isDarkModeEnabled() {
  return localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
}

function enableDarkMode(isSet) {
  if(isSet){
    document.documentElement.classList.add("dark");
    darkModeButton.innerHTML = `<svg class="tabler-icon" width="${20}" height="${20}"><use href="/static/img/icons/tabler-sprite.svg#tabler-${"sun"}" /></svg>`;
  } else {
    document.documentElement.classList.remove("dark");
    darkModeButton.innerHTML = `<svg class="tabler-icon" width="${20}" height="${20}"><use href="/static/img/icons/tabler-sprite.svg#tabler-${"moon"}" /></svg>`;
  }
}

const darkModeButton = document.getElementById("dark-mode-button");
darkModeButton.addEventListener("click", () => {
  // handle user explicitly enable/disable theme
  if(isDarkModeEnabled()){
    enableDarkMode(false);
    localStorage.theme = "light";
    console.log("(•_•)\n( •_•)>⌐■-■\n(⌐■_■)");
  } else{
    enableDarkMode(true);
    localStorage.theme = "dark";
    console.log("(⌐■_■)\n( •_•)>⌐■-■\n(•_•)");
  }
});

// Run this again now that we have the DOM loaded
enableDarkMode(isDarkModeEnabled());
