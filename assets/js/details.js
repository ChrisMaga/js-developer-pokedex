const detailsOverlay = document.getElementById('detailsOverlay');
const closeDetailsButton = document.getElementById('closeDetailsButton');
const detailsContent = document.querySelector('.details-content');

function getTypeColor(type) {
    const colors = {
        normal: '#a6a877',
        grass: '#77c850',
        fire: '#ee7f30',
        water: '#678fee',
        electric: '#f7cf2e',
        ice: '#98d5d7',
        ground: '#dfbf69',
        flying: '#a98ff0',
        poison: '#a040a0',
        fighting: '#bf3029',
        psychic: '#f65687',
        dark: '#725847',
        rock: '#b8a137',
        bug: '#a8b720',
        ghost: '#6e5896',
        steel: '#b9b7cf',
        dragon: '#6f38f6',
        fairy: '#f9aec7'
    }
    return colors[type] || '#ccc'
}

function showPokemonDetails(pokemon) {
    detailsContent.innerHTML = `

    <div class="details-header" style="--type-color-1: ${getTypeColor(pokemon.types[0])}; --type-color-2: ${getTypeColor(pokemon.types[1] || pokemon.types[0])}">
        <span class="name">${pokemon.name}</span>
        <div class="types">
            ${pokemon.types.map(type => `<span class="type-label ${type}">${type}</span>`).join('')}
        </div>

        <img src="${pokemon.photo}" alt="${pokemon.name}">
    </div>
    <div class="details-body">
        <p><strong>Espécie:</strong> ${pokemon.species}</p>
        <p><strong>Altura:</strong> ${pokemon.height}</p>
        <p><strong>Peso:</strong> ${pokemon.weight}</p>
        <p><strong>Habilidades:</strong> ${pokemon.abilities.join(', ')}</p>
        <p><strong>HP:</strong> ${pokemon.hp}</p>
        <p><strong>Ataque:</strong> ${pokemon.attack}</p>
        <p><strong>Defesa:</strong> ${pokemon.defense}</p>
        <p><strong>Velocidade:</strong> ${pokemon.speed}</p>
        <p><strong>Total:</strong> ${pokemon.total}</p>
    </div>

    `;

    detailsOverlay.style.display = 'flex';
}


detailsOverlay.addEventListener('click', (event) => {
    if (event.target === detailsOverlay) {
        detailsOverlay.style.display = 'none';
    }
});

pokemonList.addEventListener('click', async (event) => {
    const detailsButton = event.target.closest('.details-button');
    if (detailsButton) {
        const pokemonId = parseInt(detailsButton.getAttribute('data-pokemon-id'));

        try {
            const pokemonDetails = await pokeApi.getPokemonDetailById(pokemonId); 
            showPokemonDetails(pokemonDetails);
        } catch (error) {
            console.error("Erro ao obter detalhes do Pokémon:", error);
        }
    }
});