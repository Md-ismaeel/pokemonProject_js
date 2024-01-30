const optionType = document.querySelector(".optionType");
const pokemonList = document.querySelector(".pokemonList");
const searchFilter = document.querySelector("#searchFilter");
const searchPokemonInput = document.querySelector("#searchPokemonInput");
const searchBtn = document.querySelector("#searchBtn");

// optionsType Url:-
const typeOfUrl = "https://pokeapi.co/api/v2/type/";

/*****************************************************************************************
@param 

here fetching api on the  bases of types of pokemon  and each time creating option tag and appending in select 

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

const apiOfAllPokemon = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1302";

/*****************************************************************************************

@param 

from this function fetching all pokemon on the bases of limits and passing the particular pokemon details to renderCard function 

@return pokemonData
*****************************************************************************************/
async function allTypeOfPokemon() {
  const response = await fetch(apiOfAllPokemon);
  const data = await response.json();
  // console.log(data.results);

  data.results.forEach(async (ele) => {
    const response = await fetch(ele.url);
    const pokemonData = await response.json();
    // console.log(pokemonData);
    renderCard(pokemonData);
  });
}

/****************************************************************************************
@param pokemonData
 updating Dom dynamically when the function will call and the renderFunction create the cards as per needs
@return 
*****************************************************************************************/
function renderCard(pokemonData) {
  // Create and manipulate DOM elements based on 'pokemonData'
  const innerDiv = document.createElement("div");
  const pokemonCard_Detail = document.createElement("div");
  const pokemonFront_Card = document.createElement("div");
  const pokemonBack_Card = document.createElement("div");

  // Creating element Dynamically for frontCard  base_stat
  pokemonFront_Card.innerHTML = `
    <div class="pokeIdes">
    <p id="idNumber">#${pokemonData.id}</p>
    <div id="fColor">
      <p>${pokemonData.stats[0].stat.name}</p>
      <p>${pokemonData.stats[0].base_stat}<p></p>
      </div>
    </div>
    <figure class="figure">
      <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
      <figcaption>${pokemonData.name}</figcaption>
    </figure>
    <div class="heightAndWidth">
    <p>height ${pokemonData.height}</p>
    <p>weight ${pokemonData.weight}</p>
    </div>
    <div class="stats">
    <div class="state-1">
      <p>${pokemonData.stats[1].base_stat}<p></p>
      <p>${pokemonData.stats[1].stat.name}</p>
    </div>
    <div class="state-1">
      <p>${pokemonData.stats[2].base_stat}</p>
      <p>${pokemonData.stats[2].stat.name}</p>
    </div>
    <div class="state-1">
      <p>${pokemonData.stats[3].base_stat}<p></p>
      <p>${pokemonData.stats[3].stat.name}</p>
    </div>
    </div>`;

  const typeData = document.createElement("div");

  pokemonData.types.forEach((e) => {
    let p = document.createElement("p");

    p.innerText = e.type.name;
    typeData.appendChild(p);
  });

  if (pokemonData.types.length == 1) {
    pokemonCard_Detail.style.backgroundColor = backgroundColor(
      pokemonData.types[0].type.name);
      // pokemonData.types[0].type.name.style.backgroundColor = "black";



    // console.log(backgroundColor(pokemonData.types[0].type.name));
  } else {
    let cardBackground1 = backgroundColor(pokemonData.types[0].type.name);
    let cardBackground2 = backgroundColor(pokemonData.types[1].type.name);
    pokemonCard_Detail.style.background = `linear-gradient(${cardBackground1}, ${cardBackground2})`;
  }

  typeData.classList.add("types");
  pokemonFront_Card.appendChild(typeData);
  pokemonFront_Card.classList.add("pokemonFrontCard");

  // Creating element Dynamically for BackCard
  pokemonBack_Card.innerHTML = `
    <div class="pokeIdesBackCard">
      <p id="idNumber">#${pokemonData.id}</p>
      <div id="bColor"><p>${pokemonData.stats[0].stat.name}</p>
      <p>${pokemonData.stats[0].base_stat}<p></p>
      </div>
    </div>
    <figure class="figureBackCard">
      <img src="${pokemonData.sprites.back_default}" alt="${pokemonData.name}">
      <figcaption>${pokemonData.name}</figcaption>
    </figure>
    <p class="abilityHeading">Abilities</p>`;

  const abilityData = document.createElement("div");

  pokemonData.abilities.forEach((e) => {
    // console.log(e);
    let p = document.createElement("p");
    p.innerText = `${e.ability.name}`;
    abilityData.appendChild(p);
  });

  abilityData.classList.add("abilities");
  pokemonBack_Card.appendChild(abilityData);
  pokemonBack_Card.classList.add("pokemonBackCard");

  // appending the Card inside the pokemonList
  innerDiv.classList.add("innerDiv");
  pokemonCard_Detail.classList.add("pokemonCardDetail");
  pokemonCard_Detail.append(pokemonFront_Card, pokemonBack_Card);
  pokemonCard_Detail.classList.add("pokemonCardDetail");
  innerDiv.appendChild(pokemonCard_Detail);
  pokemonList.appendChild(innerDiv);
}

/*****************************************************************************************
@param 

here that function selecting the option as per user selection than it will render that kind of pokemon cards 
 and filterSelectTypes() returning the data to map the array bed on length and then filtering out from the mappedData ------>

@return data
*****************************************************************************************/
async function filterSelectTypes() {
  pokemonList.innerHTML = "";
  const response = await fetch(optionType.value);
  const data = await response.json();
  const mappedData = data.pokemon.map(async (element) => {
    const dataUrl = element.pokemon.url;
    const response = await fetch(dataUrl);
    const data = await response.json();
    return data;
  });

  Promise.all(mappedData).then((res) => {
    //  console.log(res);
    const monoType = res.filter((elem) => {
      return elem.types.length == 1;
    });
    const dualType = res.filter((elem) => {
      return elem.types.length == 2;
    });

    for (let i = 0; i < monoType.length; i++) {
      renderCard(monoType[i]);
    }
    // console.log(monoType.length);
    for (let i = 0; i < dualType.length; i++) {
      renderCard(dualType[i]);
    }
  });
}

/*****************************************************************************************
@param 

here from this function taking  user input value to particular pokemon as per user want to search  it will render on the ui

@return 
*****************************************************************************************/
async function searchingPokemonByName() {
  pokemonList.innerHTML = "";
  let inputVal = searchPokemonInput.value;
  if (inputVal == "") {
    alert("please insert input Value");
  } else {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${inputVal}`
    );
    const data = await response.json();
    renderCard(data);
  }
  // if ( data !== inputVal) {
  //   alert("Please type Correct Name");
  // }
}

// addEventListener it will fire when the user will click on it that will render all the Cards
searchFilter.addEventListener("click", (event) => {
  event.preventDefault();
  filterSelectTypes();
});

// addEventListener it will fire when user will search particular pokemon name like pikachu and will hit on click it will render
searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  searchingPokemonByName();
});

/*****************************************************************************************
@param pokemonData

getting reference from from renderCard function and
return backGround Color

@return color
*****************************************************************************************/
function backgroundColor(pokemonData) {
  if (pokemonData == "normal") {
    return "#CAD8CF";
  } else if (pokemonData == "flying") {
    return "#E1E1E1";
  } else if (pokemonData == "fighting") {
    return "#F75454";
  } else if (pokemonData == "poison") {
    return "#D86FB9";
  } else if (pokemonData == "ground") {
    return "#EBC174";
  } else if (pokemonData == "rock") {
    return "#B5904C";
  } else if (pokemonData == "bug") {
    return "#77A93A";
  } else if (pokemonData == "ghost") {
    return "#A595B1";
  } else if (pokemonData == "steel") {
    return "#D3D3D3";
  } else if (pokemonData == "fire") {
    return "#FF8800";
  } else if (pokemonData == "water") {
    return "#00A6FF";
  } else if (pokemonData == "grass") {
    return "#40FF00";
  } else if (pokemonData == "electric") {
    return "#FFFF00";
  } else if (pokemonData == "psychic") {
    return "#E764C9";
  } else if (pokemonData == "ice") {
    return "#33A0F8";
  } else if (pokemonData == "dragon") {
    return "#FFD700";
  } else if (pokemonData == "dark") {
    return "#8A8A8A";
  } else if (pokemonData == "fairy") {
    return "#FF7C92";
  }
}

/***********************************
      window onLoad----->
***********************************/
window.onload = () => createOptions();
allTypeOfPokemon();
