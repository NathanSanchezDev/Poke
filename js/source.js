// Define suggestions array before using it in functions
const suggestions = [
    'bulbasaur', 'ivysaur', 'venusaur', 'charmander', 'charmeleon',
    'charizard', 'squirtle', 'wartortle', 'blastoise', 'caterpie',
    'metapod', 'butterfree', 'pidgey', 'pidgeotto', 'pidgeot',
    'rattata', 'raticate', 'spearow', 'fearow', 'ekans'    // Add more suggestions as needed
];

document.addEventListener('DOMContentLoaded', function() {
    let pokeInfo = {};

    const inputField = document.getElementById('pokemonInput');
    const suggestionsContainer = document.getElementById('suggestions');

    inputField.addEventListener('input', handleInput);

    function handleInput() {
        const inputValue = inputField.value.toLowerCase();
        const filteredSuggestions = suggestions.filter(suggestion =>
            suggestion.toLowerCase().includes(inputValue)
        );

        showSuggestions(filteredSuggestions);
    }

    function showSuggestions(suggestions) {
        suggestionsContainer.innerHTML = '';
        for (const suggestion of suggestions) {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.textContent = suggestion;
            suggestionItem.addEventListener('click', () => {
                inputField.value = suggestion;
                suggestionsContainer.innerHTML = '';
            });
            suggestionsContainer.appendChild(suggestionItem);
        }
    }

    // Rest of your code (getpoke and displayPoke functions)
  document.querySelector('button').addEventListener('click', getpoke);

    function getpoke() {
        let poke = inputField.value;

        const url = 'https://pokeapi.co/api/v2/pokemon/' + poke.trim();

        fetch(url)
            .then(res => res.json())
            .then(data => {
                pokeInfo = data;
                displayPoke();
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    function displayPoke() {
        const name = pokeInfo.name;
        const imageUrl = pokeInfo.sprites.front_default;
        const types = pokeInfo.types.map(type => type.type.name).join(', ');
    
        document.querySelector('h1').innerText = name;
        document.querySelector('img').src = imageUrl;
    
        const movesList = document.getElementById('moves-list');
        movesList.innerHTML = ''; // Clear any existing moves
    
        for (const move of pokeInfo.moves.slice(0, 5)) {
            const moveItem = document.createElement('li');
            moveItem.textContent = move.move.name;
            movesList.appendChild(moveItem);
        }
    
        document.querySelector('#pokemon-types').textContent = "Types: " + types; // Display types
    }
    
    })

  