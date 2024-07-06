document.addEventListener("DOMContentLoaded", () => {
    const baseURL = "https://pokeapi.co/api/v2/pokemon";
    let offset = 0;
    const limit = 10;

    const app = document.getElementById("app");
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const resetBtn = document.getElementById("resetBtn");

    async function fetchPokemon(url) {
        const response = await fetch(url);
        const data = await response.json();
        displayPokemon(data.results);
    }

    async function fetchPokemonByName(name) {
        try {
            const response = await fetch(`${baseURL}/${name.toLowerCase()}`);
            if (!response.ok) throw new Error("Pokémon no encontrado");
            const data = await response.json();
            displayPokemon([data]);
        } catch (error) {
            alert(error.message);
        }
    }

    function displayPokemon(pokemonArray) {
        app.innerHTML = "";
        pokemonArray.forEach(async pokemon => {
            const pokemonCard = document.createElement("div");
            pokemonCard.className = "pokemon-card";

            const pokemonData = pokemon.url ? await fetch(pokemon.url).then(res => res.json()) : pokemon;

            pokemonCard.innerHTML = `
                <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                <p>${pokemonData.name}</p>
            `;
            app.appendChild(pokemonCard);
        });
    }

    searchBtn.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query) fetchPokemonByName(query);
    });

    prevBtn.addEventListener("click", () => {
        if (offset > 0) {
            offset -= limit;
            fetchPokemon(`${baseURL}?offset=${offset}&limit=${limit}`);
        }
    });

    nextBtn.addEventListener("click", () => {
        offset += limit;
        fetchPokemon(`${baseURL}?offset=${offset}&limit=${limit}`);
    });

    resetBtn.addEventListener("click", () => {
        offset = 0;
        fetchPokemon(`${baseURL}?offset=${offset}&limit=${limit}`);
    });

    fetchPokemon(`${baseURL}?offset=${offset}&limit=${limit}`);
});