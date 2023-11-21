const toggleThemeButton = document.getElementById("toggle-switch");
const iconSun = document.getElementById("sun");
const iconMoon = document.getElementById("moon");
const themeBg = document.getElementById("theme-bg");

let currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : "light";

function getBackgroundImage(theme) {
  if (window.outerWidth < 767)
    return `url('./assets/images/pattern-background-mobile-${
      theme === "light" ? "dark" : "light"
    }.svg')`;
  return `url('./assets/images/pattern-background-desktop-${
    theme === "light" ? "dark" : "light"
  }.svg')`;
}

function defineIcons(theme) {
  iconSun.src = `./assets/images/icon-sun-${theme}.svg`;
  iconMoon.src = `./assets/images/icon-moon-${theme}.svg`;
}

function initiateTheme() {
  document?.documentElement.setAttribute("data-theme", currentTheme);
  localStorage.setItem("theme", currentTheme);
  toggleThemeButton.checked = currentTheme === "light" ? false : true;
  if (currentTheme === "light") {
    defineIcons("dark");
    themeBg.style.backgroundImage = getBackgroundImage("dark");
  } else {
    defineIcons("light");
    themeBg.style.backgroundImage = getBackgroundImage("light");
  }
}

function changeTheme() {
  if (currentTheme === "light") {
    document?.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    currentTheme = "dark";
    defineIcons("light");
    themeBg.style.backgroundImage = getBackgroundImage("light");
  } else {
    document?.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    currentTheme = "light";
    defineIcons("dark");
    themeBg.style.backgroundImage = getBackgroundImage("dark");
  }
  localStorage.setItem("theme", currentTheme);
}

toggleThemeButton.addEventListener("click", () => {
  changeTheme();
});

initiateTheme();
