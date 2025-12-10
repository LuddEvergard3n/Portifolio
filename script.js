document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.getElementById("boot-screen").style.display = "none";
    }, 1500);

    document.querySelectorAll("nav li").forEach(item => {
        item.addEventListener("click", () => {
            const section = item.getAttribute("data-section");

            document.querySelectorAll("section").forEach(sec =>
                sec.classList.add("hidden")
            );

            document.getElementById(section).classList.remove("hidden");
        });
    });
});