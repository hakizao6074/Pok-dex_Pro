async function criarCards() {
	const container = document.getElementById("container");
	const dcontainer = document.getElementById("d-container");

	container.innerHTML = ""; // limpar tudo
	dcontainer.innerHTML = "";


		const pokname = document.getElementById("text").value.toLowerCase();
		const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokname}`);
		const data = await resp.json();


		const area = document.createElement("div");
		area.classList.add("grupo-tipo");

			const card = document.createElement("div");
			card.classList.add("card");

			card.innerHTML = `
			<h4>#${data.id}</h4>
			<img src="${data.sprites.front_default}">
			<h3>${data.name}</h3>
		      `;

			card.addEventListener("click", () => {
				container.innerHTML = ""; // limpar tudo

				const card2 = document.createElement("div");
				card2.classList.add("card2");

				const hp = data.stats.find(s => s.stat.name === "hp").base_stat;
				const attack = data.stats.find(s => s.stat.name === "attack").base_stat;
				const defense = data.stats.find(s => s.stat.name === "defense").base_stat;
				const height = data.height / 10;
				const weight = data.weight / 10;

				card2.innerHTML = `
				<br>
				<h4>#${data.id}</h4>
				<img src="${data.sprites.front_default}">
				<h3>${data.name}</h3>
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
	container.appendChild(area);
}

criarCards()
