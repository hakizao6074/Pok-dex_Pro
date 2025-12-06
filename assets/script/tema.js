//toggle de tema claro/escuro
let darkmode = localStorage.getItem("darkmode"); // pega o thema dark do css global
const themeToggleBtn = document.getElementById("tema"); // o ID do switch

const enableDarkmode = () => {
	document.body.classList.add("darkmode"); // adicionando a classe "darkmode" no body
	console.log("rodo"); // debug
	localStorage.setItem("darkmode", "active"); // quando o theme for ativado colocar o valor "active" nele 
}; // ativar o dark theme adicionando a classe "darkmode" no body

const disableDarkmode = () => {
	document.body.classList.remove("darkmode"); // remove a classe "darkmode" do body
	console.log("tiro"); // debug
	localStorage.setItem("darkmode", null) // remove o valor "active"
}; // desativando o dark theme removendo a classe "darkmode" do body

if(darkmode === "active") enableDarkmode(); // caso o tema dark tenda o valor "active" vai rodar o comando para ativar o tema automaticamente

themeToggleBtn.addEventListener("click", () => {
	darkmode = localStorage.getItem("darkmode");
	darkmode !== "active" ? enableDarkmode() : disableDarkmode(); // o "toggle" do botao, "?" = "if", ":" = "else"  
}); // quando o switch for ativado executar a funçao

