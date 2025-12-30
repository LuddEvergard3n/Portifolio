document.addEventListener("DOMContentLoaded", () => {

    // Boot screen
    setTimeout(() => {
        document.getElementById("boot-screen")?.remove();
    }, 1200);

    // Navegação entre abas
    window.showSection = function (id) {
        document.querySelectorAll(".section").forEach(sec =>
            sec.classList.add("hidden")
        );
        document.getElementById(id)?.classList.remove("hidden");
    };

    // Controle de idioma (XP-style, estável)
    window.setLang = function (lang) {
        document.querySelectorAll(".lang").forEach(el =>
            el.classList.add("hidden")
        );
        document.querySelectorAll("." + lang).forEach(el =>
            el.classList.remove("hidden")
        );
        localStorage.setItem("lang", lang);
    };

    // Idioma padrão
    const savedLang = localStorage.getItem("lang") || "pt";
    setLang(savedLang);
});
