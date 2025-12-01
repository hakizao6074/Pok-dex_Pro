//API pokemon
fetch("https://pokeapi.co/docs/v2")
  .then(response => response.json())     
  .then(data => {
    console.log("Pokémons:");
    console.log(data);                   
  })
  .catch(error => {
    console.error("Erro ao consumir API do pokemon:", error);
  });


