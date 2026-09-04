// ===== Gestion du Thème (Dark / Light Mode) =====
const checkboxTheme = document.querySelector("#checkbox");

const themeSauvegarde = localStorage.getItem("theme");
if (themeSauvegarde === "light") {
    document.body.classList.add("light-mode");
    if (checkboxTheme) checkboxTheme.checked = true;
}

if (checkboxTheme) {
    checkboxTheme.addEventListener("change", () => {
        if (checkboxTheme.checked) {
            document.body.classList.add("light-mode");
            localStorage.setItem("theme", "light");
        } else {
            document.body.classList.remove("light-mode");
            localStorage.setItem("theme", "dark");
        }
    });
}

// ===== Surbrillance de la section active dans la Nav =====
const liensNav = document.querySelectorAll(".nav-principale a");
const sections = document.querySelectorAll(".section[id]");

const observateur = new IntersectionObserver(
    (entrees) => {
        entrees.forEach((entree) => {
            if (entree.isIntersecting) {
                const idVisible = entree.target.id;
                liensNav.forEach((lien) => {
                    lien.classList.toggle("actif", lien.getAttribute("href") === "#" + idVisible);
                });
            }
        });
    },
    { rootMargin: "-40% 0px -50% 0px" }
);

sections.forEach((section) => observateur.observe(section));