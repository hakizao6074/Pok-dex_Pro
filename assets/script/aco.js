async function criarCards() {
	const container = document.getElementById("container");
	const dcontainer = document.getElementById("d-container");

	container.innerHTML = ""; // limpar tudo
	dcontainer.innerHTML = "";


		const resp = await fetch(`https://pokeapi.co/api/v2/type/steel`);
		const det = await resp.json(); // pega as info dos pokemons tipo "aço"

		const lista = det.pokemon.slice(0, 20); // a quantidade de pokemons q vai aparecer, no caso 20

		const area = document.createElement("div"); // cria uma div com class=grupo-tipo
		area.classList.add("grupo-tipo");

		for (const p of lista) {
			const resp2 = await fetch(p.pokemon.url); // para cada pokemon ira pegar as infos da API principal
			const det = await resp2.json();

			const card = document.createElement("div"); // cria um div com class=card
			card.classList.add("card");

			card.innerHTML = `
			<img src="${det.sprites.front_default}">
			<h3>${det.name}</h3>
			<h4>#${det.id}</h4>
			<ul>
				<li>${det.types[0].type.name}</li>
				<li>${det.types[1] ? det.types[1].type.name : ""}</li>
			</ul>
		      `; // infos q vai aparecer no cards

			function color(det) {
				const types = det.types.map(t => t.type.name); // pega o nome do(s) tipos
				const listItems = card.querySelectorAll("ul li"); // seleciona os <li> do card2

				listItems.forEach((li, index) => {
					li.style.background = `var(--${types[index]}-type-background)`; // troca o background de acordo com o tipo

					if (types[index] == "flying" ||
						types[index] == "ice" ||
						types[index] == "normal" ||
						types[index] == "electric" ||
						types[index] == "dragon" ||
						types[index] == "grass" ||
						types[index] == "ground") { li.style.color = "black"} // caso o typo do pokemon for "ice", por exemplo, a cor do texto sera preta
					else {li.style.color = "var(--type-color-white)"}; // qualquer outro tipo o texto sera branco
				});

			};

			color(det); // executa a funçao

			card.addEventListener("click", () => {
				container.innerHTML = ""; // limpar tudo

				const card2 = document.createElement("div"); // cria uma div com class=card2
				card2.classList.add("card2");

				// pega as infos da API
				const height = det.height / 10;
				const weight = det.weight / 10;
				const name = det.name;
				const imgUrl =
					det.sprites.other["official-artwork"].front_default ||
					det.sprites.front_default;
				const abilities = det.abilities
					.map((a) => a.ability.name)
					.slice(0, 2)
					.join(", ");

				// Stats
				const stats = {};
				det.stats.forEach((s) => (stats[s.stat.name] = s.base_stat));
				const atk = stats["attack"] || 0;
				const def = stats["defense"] || 0;	
				const hp = stats["hp"] || 0;	


				card2.innerHTML = `
				<br>
					<div class="card2-header">
					<h4>#${det.id}</h4>
					<img src="${imgUrl}" class="pokemon-image">
					<h3>${name}</h3>
				</div>
				<br>
				<div class="line-separator">
					<div class="line">
						<div class="height">
							<h4><strong>Height:</strong></h4>
							<p>${height}m</p>
						</div>
						<div class="weight">
							<h4><strong>Weight:</strong></h4>
							<p>${weight}kg</p>
						</div>
					</div>
					<br>
					<div class="line2">
						<div class="hp">
							<span class="stat-value">HP</span>
							<span class="stat-value">${hp}</span>
							<div class="progress-bg">
								<div class="progress-fill" style="width: ${Math.min(
									hp / 2,
										100
									)}%; background-color: var(--stat-color-red-hp);">
								</div>
							</div>
						</div>
						<div class="attack">
						<span class="stat-value">ATK</span>
							<span class="stat-value">${atk}</span>
							<div class="progress-bg">
								<div class="progress-fill" style="width: ${Math.min(
									atk / 2,
										100
									)}%; background-color: var(--stat-color-yellow-attack);">
								</div>
								</div>
						</div>
						<div class="defense">
							<span class="stat-label">DEF</span>
							<span class="stat-value">${def}</span>
							<div class="progress-bg">
							<div class="progress-fill" style="width: ${Math.min(
								def / 2,
								100
							)}%; background-color: var(--stat-color-green-defense);">
							</div>
							</div>
							</div>
							</div>
							<br>
							<div class="line3">
							<p><strong>Abilities:</strong></p>
							<p>${abilities}</p>
							</div>
							<br>
							<p><strong>Type:</strong></p>
							<ul>
							<li>${det.types[0].type.name}</li>
							<li>${det.types[1] ? det.types[1].type.name : ""}</li>
							</ul>
							<br>
							<button id="back"><</button>
						</div>
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
						types[index] == "dragon" ||
						types[index] == "grass" ||
						types[index] == "ground") { li.style.color = "black"} // caso o typo do pokemon for "ice", por exemplo, a cor do texto sera preta
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
		} // vai criar a quantidade de cards q vc colocou, no caso 20

		container.appendChild(area); // dentro da div container criar a "grupo-tipo"
	}

// executa assim que a pagina carregar
criarCards();