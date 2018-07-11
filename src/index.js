document.addEventListener("DOMContentLoaded", function() {
  const pokemonObjs = data.pokemons;
  console.log(pokemonObjs);

  const searchElement = document.querySelector('#pokemon-search-input');
  const containerElement = document.querySelector('#pokemon-container');

  searchElement.addEventListener('keyup', function(){
    const filterText = searchElement.value;
    if(filterText !== ''){
      const filteredPokemon = pokemonObjs.filter(pokemon => pokemon.name.includes(filterText));
      renderSearchResults(filteredPokemon);
    }else{
      renderSearchResults([]);
    }
  });

  containerElement.addEventListener('click', function(event){
    debugger;
    if(event.target.dataset.action === "flip-image"){
      flipImage(event.target.dataset.pokename);
    }
  })
})

function flipImage(pokemonName){
  const pokemonCard = document.querySelector(`#image-${pokemonName}`);
  const imageDirection = pokemonCard.dataset.direction === 'front' ? 'back' : 'front';
  pokemonCard.dataset.direction = imageDirection;
  pokemonCard.setAttribute("src", data.pokemons.find(pokemon => pokemon.name == pokemonName).sprites[imageDirection]);
}

function renderSearchResults(filteredPokemon){
  const pokemonContainer = document.querySelector('#pokemon-container');
  pokemonContainer.innerHTML = '';
  if(filteredPokemon.length > 0){
    for(pokemon of filteredPokemon){
      pokemonContainer.innerHTML += render(pokemon);
    }
  }
  else {
    pokemonContainer.innerHTML = '<p><center>There are no Pokémon here</center></p>';
  }
}

function render(pokemon){
  return `<div class="pokemon-container">
          <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
          <h1 class="center-text">${pokemon.name}</h1>
          <div style="width:239px;margin:auto">
            <div style="width:96px;margin:auto">
              <img id="image-${pokemon.name}" src="${pokemon.sprites.front}" data-direction="front">
            </div>
          </div>
          <p style="padding:10px;" class="center-text flip-image" data-pokename="${pokemon.name}" data-action="flip-image">flip card</p>
          </div>
        </div>`;
}
