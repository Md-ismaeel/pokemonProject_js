const optionType = document.querySelector(".optionType");
const pokemonList = document.querySelector(".pokemonList");
// const optionType = document.querySelector(".optionType");
// const optionType = document.querySelector(".optionType");

// optionsType Url:-
const typeOfUrl = "https://pokeapi.co/api/v2/type/";

// *****************************************************************************************

// *****************************************************************************************
async function createOptions() {
  const response = await fetch(typeOfUrl);
  const data = await response.json();
  console.log(data);

  data.results.forEach((element) => {
    let Options = document.createElement("option");

    Options.innerHTML = element.name;
    Options.value = element.url;
    optionType.appendChild(Options);
  });

  // console.log(optionType);
}

const apiOfAllPokemon = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100";

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
    const typeData = document.createElement("div");

    // Creating element Dynamically
    pokemonFront_Card.innerHTML = `
      <div>
      <p id="idNumber">#${pokemonData.id}</p>
      <pi d="idColor"></pi>
      <div>
      <figure>
        <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
        <figcaption>${pokemonData.name}</figcaption>
      </figure>
    `;
    pokemonData.types.forEach((e) => {
      let p = document.createElement("p");

      p.innerText = e.type.name;
      typeData.appendChild(p);
    });

    pokemonBack_Card = `<figure>
    <img src="${pokemonData.sprites.back_default}" alt="${pokemonData.name}">
    <figcaption>${pokemonData.name}</figcaption>
    </figure>`;

    typeData.classList.add("types");
    pokemonFront_Card.appendChild(typeData);
    pokemonCard_Detail.classList.add("pokemonCardDetail");
    pokemonCard_Detail.append(pokemonFront_Card, pokemonBack_Card);
    pokemonFront_Card.classList.add("pokemonFrontCard");
    pokemonCard_Detail.classList.add("pokemonCardDetail");
    pokemonList.appendChild(pokemonCard_Detail);
  });
}

/***********************************
      window onLoad----->
***********************************/
(window.onload = () => createOptions()), allTypeOfPokemon();
