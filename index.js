const optionType = document.querySelector(".optionType");
const pokemonList = document.querySelector(".pokemonList");
const searchFilter = document.querySelector("#searchFilter");
// const input = document.querySelector("#input");

// optionsType Url:-
const typeOfUrl = "https://pokeapi.co/api/v2/type/";

/*****************************************************************************************
@param 

@return 
*****************************************************************************************/
async function createOptions() {
  const response = await fetch(typeOfUrl);
  const data = await response.json();
  // console.log(data);

  data.results.forEach((element) => {
    let Options = document.createElement("option");

    Options.innerHTML = element.name;
    Options.value = element.url;
    optionType.appendChild(Options);
  });

  // console.log(optionType);
}

const apiOfAllPokemon = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=50";

/*****************************************************************************************
@param 

@return 
*****************************************************************************************/
async function allTypeOfPokemon() {
  const response = await fetch(apiOfAllPokemon);
  const data = await response.json();
  // console.log(data.results);

  data.results.forEach(async (ele) => {
    const response = await fetch(ele.url);
    const pokemonData = await response.json();
    // console.log(pokemonData);

    // Create and manipulate DOM elements based on 'pokemonData'
    const pokemonCard_Detail = document.createElement("div");
    const pokemonFront_Card = document.createElement("div");
    const pokemonBack_Card = document.createElement("div");

    // Creating element Dynamically for frontCard
    pokemonFront_Card.innerHTML = `
              <div class="pokeIdes">
              <p id="idNumber">#${pokemonData.id}</p>
              <p id="dColor"></p>
              </div>
              <figure class="figure">
                <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                <figcaption>${pokemonData.name}</figcaption>
              </figure>
              <div class="heightAndWidth">
              <p>height:- ${pokemonData.height}</p>
              <p>weight:- ${pokemonData.weight}</p>
              </div>`;

    const typeData = document.createElement("div");

    pokemonData.types.forEach((e) => {
      let p = document.createElement("p");

      p.innerText = e.type.name;
      typeData.appendChild(p);
    });
    typeData.classList.add("types");
    pokemonFront_Card.appendChild(typeData);
    pokemonFront_Card.classList.add("pokemonFrontCard");

    // Creating element Dynamically for frontCard
    pokemonBack_Card.innerHTML = `
          <div class="pokeIdesBackCard">
            <p id="idNumber">#${pokemonData.id}</p>
            <p id="dColor"></p>
          </div>
          <figure class="figureBackCard">
            <img src="${pokemonData.sprites.back_default}" alt="${pokemonData.name}">
            <figcaption>${pokemonData.name}</figcaption>
          </figure>
          <p class="abilityHeading">ABILITIES:-</p>`;

    const abilityData = document.createElement("div");

    pokemonData.abilities.forEach((e) => {
      // console.log(e);
      let p = document.createElement("p");
      p.innerText = e.ability.name;
      abilityData.appendChild(p);
    });
    abilityData.classList.add("abilities");
    pokemonBack_Card.appendChild(abilityData);
    pokemonBack_Card.classList.add("pokemonBackCard");

    // appending the Card inside the pokemonList
    pokemonCard_Detail.classList.add("pokemonCardDetail");
    pokemonCard_Detail.append(pokemonFront_Card, pokemonBack_Card);
    pokemonCard_Detail.classList.add("pokemonCardDetail");
    pokemonList.appendChild(pokemonCard_Detail);
  });
}

// console.log(searchFilter);
searchFilter.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(optionType.value);
});

/***********************************
      window onLoad----->
***********************************/
window.onload = () => createOptions();
allTypeOfPokemon();
