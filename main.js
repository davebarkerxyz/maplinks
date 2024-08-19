function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
      return;
    }
    document.addEventListener('DOMContentLoaded', fn);
}

function init() {
    const searchBtn = document.querySelector("#search-btn");
    const searchInput = document.querySelector("#search-input");

    searchBtn.addEventListener("click", () => {
        generateLinks(searchInput.value);
    });

    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            generateLinks(searchInput.value);
        }
    });

    // Setup light/dark toggle listener
    toggleButton = document.querySelector("#theme-toggle");
    toggleButton.addEventListener("click", (e) => {
        toggleTheme();
        e.preventDefault();
    });
}

function generateLinks(input) {
    const linksDisp = document.querySelector("#links");

    if (input === "") {
        linksDisp.innerHTML = '<div class="error">Error: please enter an address to search!</div>';
        return;
    }

    linksDisp.innerHTML = "";
    const linksCtr = document.createElement("ul");

    for (const key in destinations) {
        const mapUrlBase = "https://www.google.com/maps/dir/?api=1";
        const origin = input;
        const dest = "G1 1XH, Scotland";
        const url = new URL(mapUrlBase);
        url.searchParams.append("origin", origin);
        url.searchParams.append("destination", destinations[key]);
        url.searchParams.append("travelmode", "transit");

        const link = document.createElement("a");
        link.href = url.href;
        link.innerText = key;
        link.target = "_blank";

        const linkLi = document.createElement("li");
        linkLi.appendChild(link);
        linksCtr.appendChild(linkLi);
    }

    linksDisp.appendChild(linksCtr);
}


/*
 * Dark Mode themeing
 */

function toggleTheme() {
    if (document.documentElement.getAttribute("data-theme") === "dark") {
        setTheme("light");
    } else {
        setTheme("dark");  
    }
}

function setTheme(theme, save = true) {
    document.documentElement.setAttribute("data-theme", theme);
    if (save) {
        localStorage.setItem("theme", theme);
    }

    const icon = document.querySelector("#theme-toggle");
    if (icon !== null) {
        icon.textContent = getThemeIcon(theme);
    } else {
        ready(() => {
            const readyIcon = document.querySelector("#theme-toggle");
            readyIcon.textContent = getThemeIcon(theme);
        });
    }
}

function getThemeIcon(theme) {
    if (theme === "light") {
        return "🌞";
    } else {
        return "🌚";
    }
}

function restoreTheme() {
    const currentTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") : null;

    if (currentTheme) {
        setTheme(currentTheme, false);
    } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme("dark");
        }
    }
}


// Call init when ready
ready(() => {
    init();
});

restoreTheme();