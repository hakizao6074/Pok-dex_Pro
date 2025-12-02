//toggle de tema claro/escuro
const themeToggleBtn = document.getElementById("sla");

function toggleTheme() {
	document.body.classList.toggle("dark-mode");
}

themeToggleBtn.addEventListener("click", toggleTheme);

