// ===== Gestion du Thème (Dark / Light Mode) =====
const checkboxTheme = document.querySelector("#checkbox");

// Vérifie si un thème est déjà sauvegardé dans le navigateur
const themeSauvegarde = localStorage.getItem("theme");
if (themeSauvegarde === "light") {
    document.body.classList.add("light-mode");
    if (checkboxTheme) checkboxTheme.checked = true;
}

// Écoute le changement de la case à cocher (Switch)
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

// ===== Envoi du formulaire de contact via FormSubmit =====
const formulaire = document.querySelector("#formulaire-contact");
const messageConfirmation = document.querySelector("#message-confirmation");

if (formulaire) {
    formulaire.addEventListener("submit", async (evenement) => {
        evenement.preventDefault();

        const donnees = new FormData(formulaire);

        try {
            const reponse = await fetch("https://formsubmit.co/ajax/calebedjrosse@gmail.com", {
                method: "POST",
                headers: { "Accept": "application/json" },
                body: donnees
            });

            if (reponse.ok) {
                messageConfirmation.textContent = "Merci, ton message a bien été envoyé !";
                formulaire.reset();
            } else {
                messageConfirmation.textContent = "Une erreur est survenue, réessaie plus tard.";
            }
        } catch (erreur) {
            messageConfirmation.textContent = "Une erreur est survenue, réessaie plus tard.";
        }
    });
}