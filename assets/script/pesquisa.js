const container = document.getElementById("container");
const dcontainer = document.getElementById("d-container");

async function criarCards() {

	container.innerHTML = ""; // limpar tudo
	dcontainer.innerHTML = "";


	const pokname = document.getElementById("text").value.toLowerCase();
	const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokname}`);
	const data = await resp.json(); // ira pegar oq esta no input e usar na API


	const area = document.createElement("div");
	area.classList.add("grupo-tipo"); // cria uma div com class=grupo-tipo

	const card = document.createElement("div");
	card.classList.add("card"); // cria uma div com class=card

	card.innerHTML = `
			<img src="${data.sprites.front_default}">
			<h3>${data.name}</h3>
			<h4>#${data.id}</h4>
			<ul>
				<li>${data.types[0].type.name}</li>
				<li>${data.types[1] ? data.types[1].type.name : ""}</li>
			</ul>
		      `; // infos q vai aparecer no cards


	function color(data) {
		const types = data.types.map(t => t.type.name); // pega o nome do(s) tipos
		const listItems = card.querySelectorAll("ul li"); // seleciona os <li> do card2


		listItems.forEach((li, index) => {
			li.style.background = `var(--${types[index]}-type-background)`; // troca o background de acordo com o tipo

			if (types[index] == "rock") { card.style.borderImage = "var(--border-card-pedra) 1" };
			if (types[index] == "ghost") { card.style.border = "2px solid var(--border-card-fantasma)" };
			if (types[index] == "dragon") { card.style.borderImage = "var(--border-card-dragao) 1" };
			if (types[index] == "steel") { card.style.border = "2px solid var(--border-card-aco)" };
			// serve para q esses 4 tipos tenham seus proprios borders, e qualquer outro tipo a borda sera azul

			if (types[index] == "flying" ||
				types[index] == "ice" ||
				types[index] == "normal" ||
				types[index] == "electirc" ||
				types[index] == "dragon" ||
				types[index] == "grass" ||
				types[index] == "ground") { li.style.color = "var(--type-color-back)"} // caso o typo do pokemon for "ice", por exemplo, a cor do texto sera preta
			else {li.style.color = "var(--type-color-white)"}; // qualquer outro tipo o texto sera branco
		});

	};

	color(data); // executa a funçao

	card.addEventListener("click", () => {
		container.innerHTML = ""; // limpar tudo

		const card2 = document.createElement("div");
		card2.classList.add("card2"); // cria um segundo card

				// pega as infos da API
				const height = data.height / 10;
				const weight = data.weight / 10;
				const name = data.name;
				const imgUrl =
					data.sprites.other["official-artwork"].front_default ||
					data.sprites.front_default;
				const abilities = data.abilities
					.map((a) => a.ability.name)
					.slice(0, 2)
					.join(", ");

				// Stats
				const stats = {};
				data.stats.forEach((s) => (stats[s.stat.name] = s.base_stat));
				const atk = stats["attack"] || 0;
				const def = stats["defense"] || 0;	
				const hp = stats["hp"] || 0;	


				card2.innerHTML = `
				<br>
					<div class="card2-header">
					<h4>#${data.id}</h4>
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
							<li>${data.types[0].type.name}</li>
							<li>${data.types[1] ? data.types[1].type.name : ""}</li>
							</ul>
							<br>
							<button id="back"><</button>
						</div>
						<br>
						<br>
			      `; // infos do card2

		function color(data) {
			const types = data.types.map(t => t.type.name); // pega o nome do(s) tipos
			const listItems = card2.querySelectorAll("ul li"); // seleciona os <li> do card2

			listItems.forEach((li, index) => {
				li.style.background = `var(--${types[index]}-type-background)`; // troca o background de acordo com o tipo

				if (types[index] == "flying" ||
					types[index] == "ice" ||
					types[index] == "normal" ||
					types[index] == "electric" ||
					types[index] == "dragon" ||
					types[index] == "grass" ||
					types[index] == "ground") { li.style.color = "var(--type-color-back)"} // caso o typo do pokemon for "ice", por exemplo, a cor do texto sera preta
				else {li.style.color = "var(--type-color-white)"}; // qualquer outro tipo o texto sera branco
			});

		};

		color(data); // executa a funçao

		dcontainer.appendChild(card2); // dentro da div dcontainer ira criar o card2

		const back = document.getElementById("back");

		back.addEventListener("click", () => {
			criarCards();
		}); // caso o botao seja clicado ira rodar o codigo tudo de novo

	}); // vai criar um evento de click em cada card

	area.appendChild(card); // dentro da div "grupo-tipo" criar as divs "card"
	container.appendChild(area); // dentro da div "container" criar a div "grupo-tipo"
}

criarCards() //caso ja tenha algo no input ira rodar o cadigo

const input = document.getElementById("text");

input.addEventListener("keypress", function(event) {
	if (event.key === "Enter") {
		criarCards()
	}
}); // para poder usar a enter na pesquisa
