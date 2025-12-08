async function criarCards() {
	const container = document.getElementById("container");
	const dcontainer = document.getElementById("d-container");

	container.innerHTML = ""; // limpar tudo
	dcontainer.innerHTML = "";


		const resp = await fetch(`https://pokeapi.co/api/v2/type/ghost`);
		const data = await resp.json(); // pega as info dos pokemons tipo "aço"

		const lista = data.pokemon.slice(0, 30); // a quantidade de pokemons q vai aparecer, no caso 30

		const area = document.createElement("div"); // cria uma div com class=grupo-tipo
		area.classList.add("grupo-tipo");

		for (const p of lista) {
			const resp2 = await fetch(p.pokemon.url); // para cada pokemon ira pegar as infos da API principal
			const det = await resp2.json();

			const card = document.createElement("div"); // cria um div com class=card
			card.classList.add("card");

			card.innerHTML = `
			<h4>#${det.id}</h4>
			<img src="${det.sprites.front_default}">
			<h3>${det.name}</h3>
		      `; // infos q vai aparecer no cards

			card.addEventListener("click", () => {
				container.innerHTML = ""; // limpar tudo

				const card2 = document.createElement("div"); // cria uma div com class=card2
				card2.classList.add("card2");

				// pega as infos da API
				const hp = det.stats.find(s => s.stat.name === "hp").base_stat;
				const attack = det.stats.find(s => s.stat.name === "attack").base_stat;
				const defense = det.stats.find(s => s.stat.name === "defense").base_stat;
				const height = det.height / 10;
				const weight = det.weight / 10;


				card2.innerHTML = `
				<br>
				<h4>#${det.id}</h4>
				<img src="${det.sprites.front_default}">
				<h3>${det.name}</h3>
				<br>
				<p><strong>Height:</strong> ${height}m</p>
				<p><strong>weight:</strong> ${weight}kg</p>
				<p><strong>Hp:</strong> ${hp}</p>
				<p><strong>Attack:</strong> ${attack}</p>
				<p><strong>Defense:</strong> ${defense}</p>
				<p><strong>Type:</strong></p>
				<ul>
					<li>${det.types[0].type.name}</li>
					<li>${det.types[1] ? det.types[1].type.name : ""}</li>
				</ul>
				<br>
				<button id="back"><</button>
				<br>
				<br>
			      `; // infos do card2

				function color(det) {
					const types = det.types.map(t => t.type.name); // pega o nome do(s) tipos
					const listItems = card2.querySelectorAll("ul li"); // seleciona os <li> do card2

					listItems.forEach((li, index) => {
						li.style.background = `var(--${types[index]}-type-background)`; // troca o background de acordo com o tipo

						if (types[index] == "flying" ||
						types[index] == "ice" ||
						types[index] == "normal" ||
						types[index] == "electirc" ||
						types[index] == "grass" ||
						types[index] == "ground") { li.style.color = "var(--type-color-back)"} // caso o typo do pokemon for "ice", por exemplo, a cor do texto sera preta
						else {li.style.color = "var(--type-color-white)"}; // qualquer outro tipo o texto sera branco
					});

				};

				color(det); // executa a funçao

				dcontainer.appendChild(card2); // dentro da div dcontainer criar o card2

				const back = document.getElementById("back");

				back.addEventListener("click", () => {
					criarCards();
				}); // caso o botao for clicado rodar o codigo tudo de novo

			}); // in cada card criar um evento de click

			area.appendChild(card); // dentro da "grupo-tipo" criar os cards
		} // vai criar a quantidade de cards q vc colocou, no caso 30

		container.appendChild(area); // dentro da div container criar a "grupo-tipo"
	}

// executa assim que a pagina carregar
criarCards();


