
document.addEventListener("DOMContentLoaded", () => {
    const startscreen = document.getElementById("startscreen");

    setTimeout(() => {
        startscreen.classList.add("hidden");
        init();
    }, 5000);
});

