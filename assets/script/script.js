async function criarCards() {
	const container = document.getElementById("container");

	//rocha, fantasma, dragao e aço -> tipos
	const tipos = ["rock", "ghost", "dragon", "steel"];

	for (const tipo of tipos) {
		const titulo = document.createElement("h2");

		//traduzir os nomes
		function traduzir() {
			if (tipo == "rock") return "pedra";
			else if (tipo == "ghost") return "fantasma";
			else if (tipo == "dragon") return "dragão";
			else if (tipo == "steel") return "aço";
			else return "";
		}

		titulo.textContent = `Tipo: ${traduzir(tipo).toUpperCase()}`;
		titulo.classList.add("titulo-tipos");
		container.appendChild(titulo);

		const resp = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
		const data = await resp.json();

		const lista = data.pokemon.slice(0, 5);

		const area = document.createElement("div");
		area.classList.add("grupo-tipo");

		for (const p of lista) {
			const resp2 = await fetch(p.pokemon.url);
			const det = await resp2.json();

			const card = document.createElement("div");
			card.classList.add("card");

			card.innerHTML = `
	<img src="${det.sprites.front_default}">
	<h3>${det.name}</h3>
      `;

			area.appendChild(card);
		}

		container.appendChild(area);
	}
}

// executa assim que a pagina carregar
criarCards();

//toggle de tema claro/escuro
const themeToggleBtn = document.getElementById("sla");

function toggleTheme() {
	document.body.classList.toggle("dark-mode");
}

themeToggleBtn.addEventListener("click", toggleTheme);

