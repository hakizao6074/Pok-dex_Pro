//toggle de tema claro/escuro
const themeToggleBtn = document.getElementById("tema");

function toggleTheme() {
	document.body.classList.toggle("dark-mode");
} // troca as cores para a variavel ".dark-mode", esta variavel enta na css global

themeToggleBtn.addEventListener("click", toggleTheme); // quando o switch for ativado executar a funçao

