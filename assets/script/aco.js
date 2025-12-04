async function criarCards() {
	const container = document.getElementById("container");
	const dcontainer = document.getElementById("d-container");

	container.innerHTML = ""; // limpar tudo
	dcontainer.innerHTML = "";


		const resp = await fetch(`https://pokeapi.co/api/v2/type/steel`);
		const data = await resp.json();

		const lista = data.pokemon.slice(0, 30);

		const area = document.createElement("div");
		area.classList.add("grupo-tipo");

		for (const p of lista) {
			const resp2 = await fetch(p.pokemon.url);
			const det = await resp2.json();

			const card = document.createElement("div");
			card.classList.add("card");

			card.innerHTML = `
			<h4>#${det.id}</h4>
			<img src="${det.sprites.front_default}">
			<h3>${det.name}</h3>
		      `;

			card.addEventListener("click", () => {
				container.innerHTML = ""; // limpar tudo

				const card2 = document.createElement("div");
				card.classList.add("card2");

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
				<br>
				<button id="back"><</button>
				<br>
				<br>
			      `;

				dcontainer.appendChild(card2);

				const back = document.getElementById("back");

				back.addEventListener("click", () => {
					criarCards();
				});

			})

			area.appendChild(card);
		}

		container.appendChild(area);
	}

// executa assim que a pagina carregar
criarCards();


