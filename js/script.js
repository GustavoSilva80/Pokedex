const pokemonName = document.querySelector('.pokemon_name');
const pokemonID = document.querySelector('.pokemon_id');
const pokemonGif = document.querySelector('.pokemon_gif');

const form = document.querySelector('.form');
const search = document.querySelector('.input_search');
const buttonprev = document.querySelector('.button_prev');
const buttonnext = document.querySelector('.button_next');

let searchpokemon = 1;

const fetchPokemons = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
    
}

const renderPokemons = async (pokemon) => {

    pokemonName.innerHTML = 'Searching';
    pokemonGif.src = "./loading.gif";
    pokemonID.innerHTML = '';

    const data = await fetchPokemons(pokemon);
    if (data) {
        pokemonGif.style.display ='block';
        pokemonName.innerHTML = data.name;
        pokemonID.innerHTML = data.id;
        pokemonGif.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        search.value ='';
        searchpokemon = data.id;
    } else {
        pokemonName.innerHTML = 'Not found';
        pokemonID.innerHTML = '';
        pokemonGif.src = "./exclamation.png";
        search.value='';
    }   
   
}

form.addEventListener('submit', (event) => {
    
    event.preventDefault();

    renderPokemons(search.value);
    

});
buttonprev.addEventListener('click', () => {
    searchpokemon -=1;
    renderPokemons(searchpokemon);
    
});

buttonnext.addEventListener('click', () => {
    searchpokemon += 1;
    renderPokemons(searchpokemon);
});

renderPokemons(searchpokemon);