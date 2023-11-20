const toggleThemeButton = document.getElementById("toggle-switch");
const iconSun = document.getElementById("sun");
const iconMoon = document.getElementById("moon");
const themeBg = document.getElementById("theme-bg");

let currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : "light";

function getBackgroundImage(theme) {
  if (window.outerWidth < 767)
    return `url('./assets/images/pattern-background-mobile-${theme}.svg')`;
  return `url('./assets/images/pattern-background-desktop-${theme}.svg')`;
}

function toggleTheme() {
  if (currentTheme === "light") {
    document?.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    currentTheme = "dark";
    toggleThemeButton.checked = true;
    iconSun.src = "./assets/images/icon-sun-light.svg";
    iconMoon.src = "./assets/images/icon-moon-light.svg";
    themeBg.style.backgroundImage = getBackgroundImage("dark");
  } else {
    document?.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    currentTheme = "light";
    toggleThemeButton.checked = false;
    iconSun.src = "./assets/images/icon-sun-dark.svg";
    iconMoon.src = "./assets/images/icon-moon-dark.svg";
    themeBg.style.backgroundImage = getBackgroundImage("light");
  }
}

toggleThemeButton.addEventListener("click", () => {
  toggleTheme();
});

toggleTheme();
