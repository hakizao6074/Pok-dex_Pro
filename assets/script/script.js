//IDs
const pokemonName = document.getElementById("");
const pokemonNumber = document.getElementById("");
const pokemonImage = document.getElementById("");















//rocha, fantasma, dragao e aço

//API pokemon
fetch("https://pokeapi.co/docs/v2")
  .then((response) => response.json())
  .then((data) => {
    console.log("Pokémons:");
    console.log(data);
  })
  .catch((error) => {
    console.error("Erro ao consumir API do pokemon:", error);
  });


//toggle de tema claro/escuro
const themeToggleBtn = document.getElementById("");

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}

themeToggleBtn.addEventListener("click", toggleTheme);
