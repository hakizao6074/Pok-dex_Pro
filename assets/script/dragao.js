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


