async function criarCards() {
	const container = document.getElementById("container");
	const dcontainer = document.getElementById("d-container");

	container.innerHTML = ""; 
	dcontainer.innerHTML = "";


		const resp = await fetch(`https://pokeapi.co/api/v2/type/dragon`);
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
				container.innerHTML = ""; 

				const card2 = document.createElement("div"); 
				card2.classList.add("card2");

				
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
			      `; 

				function color(det) {
					const types = det.types.map(t => t.type.name); 
					const listItems = card2.querySelectorAll("ul li");  

					listItems.forEach((li, index) => {
						li.style.background = `var(--${types[index]}-type-background)`; 

						if (types[index] == "flying" ||
						types[index] == "ice" ||
						types[index] == "normal" ||
						types[index] == "electirc" ||
						types[index] == "grass" ||
						types[index] == "ground") { li.style.color = "var(--type-color-back)"} 
						else {li.style.color = "var(--type-color-white)"}; 
					});

				};

				color(det); 

				dcontainer.appendChild(card2); 

				const back = document.getElementById("back");

				back.addEventListener("click", () => {
					criarCards();
				}); 

			}); 

			area.appendChild(card); 
		} 

		container.appendChild(area); 
	}

criarCards();


