// Observation de la navigation active
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

// Traitement asynchrone du formulaire avec Formspree
const formulaire = document.querySelector("#formulaire-contact");
const messageConfirmation = document.querySelector("#message-confirmation");

if (formulaire) {
    formulaire.addEventListener("submit", async (evenement) => {
        evenement.preventDefault();
        const data = new FormData(formulaire);
        
        try {
            const response = await fetch(formulaire.action, {
                method: formulaire.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                messageConfirmation.style.color = "var(--accent)";
                messageConfirmation.textContent = "Merci, votre message a bien été envoyé !";
                formulaire.reset();
            } else {
                const result = await response.json();
                messageConfirmation.style.color = "#ef4444";
                if (Object.hasOwn(result, 'errors')) {
                    messageConfirmation.textContent = result["errors"].map(error => error["message"]).join(", ");
                } else {
                    messageConfirmation.textContent = "Une erreur est survenue lors de l'envoi.";
                }
            }
        } catch (error) {
            messageConfirmation.style.color = "#ef4444";
            messageConfirmation.textContent = "Impossible de contacter le serveur pour l'instant.";
        }
    });
}

// Gestion du Toggle Mode Sombre / Mode Clair
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.body.classList.add(currentTheme);
    if (currentTheme === 'light-mode' && toggleSwitch) {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light-mode');
    } else {
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
    }
}

if (toggleSwitch) {
    toggleSwitch.addEventListener('change', switchTheme, false);
}