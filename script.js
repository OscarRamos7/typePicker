//make side function to check multiplier (pass value and an identifier variable)
//add clear button
const typeForm = document.getElementById("typeForm");
const typeOne = document.getElementById("typeOne");
const typeCounter = document.getElementById("type-counter");
const aStrengthsContainer = document.getElementById("attack-strengths-container");
const aWeaknessesContainer = document.getElementById("attack-weaknesses-container");
const aImmunityContainer = document.getElementById("attack-immunity-container");
const dStrengthsContainer = document.getElementById("defensive-strengths-container");
const dWeaknessesContainer = document.getElementById("defensive-weaknesses-container");
const dImmunityContainer = document.getElementById("defensive-immunity-container");


const doubleTypeForm = document.getElementById("double-type-form");
const dTypeOne = document.getElementById("double-type-one");
const dTypeTwo = document.getElementById("double-type-two");
const dTypeCounter = document.getElementById("double-type-counter")
const xdStrengthsContainer2 = document.getElementById("x-defensive-strengths-container2");
const xdWeaknessesContainer2 = document.getElementById("x-defensive-weaknesses-container2");
const dStrengthsContainer2 = document.getElementById("defensive-strengths-container2");
const dWeaknessesContainer2 = document.getElementById("defensive-weaknesses-container2");
const dImmunityContainer2 = document.getElementById("defensive-immunity-container2");

const cardContainer = document.getElementById("card-container");
const statContainer = document.getElementById("stat-container");
const nameContainer = document.getElementById('name-container');
const headerContainer = document.getElementById('header-container');
const moves = document.getElementById('moves');

let typeArray = [];
let doubleArray = [];
let movesArray = [];

const typeColorCodes = {
    fire: '#FDC49A',
    poison: '#BEA8BE',
    grass: '#CEF6CA',
    water: '#ACC2F5',
    rock: '#B4A871',
    ground: '#E0CB91',
    flying: '#C7B9F0',
    electric: '#E9D68B',
    dragon: '#A280F3',
    fairy: '#EACAD8',
    dark: '#A09994',
    ghost: '#7C6B98',
    psychic: '#FA789F',
    bug: '#A6B33C',
    fighting: '#BF524C',
    normal: '#CFCFC5',
    steel: '#B8B8D0',
    ice: '#98D8D8',
};

//clearing function
function clear() {
        dTypeCounter.querySelectorAll("p").forEach(p => p.remove());
        dStrengthsContainer2.querySelectorAll("p").forEach(p => p.remove());
        dWeaknessesContainer2.querySelectorAll("p").forEach(p => p.remove());
        dImmunityContainer2.querySelectorAll("p").forEach(p => p.remove());
        xdStrengthsContainer2.querySelectorAll("p").forEach(p => p.remove());
        xdWeaknessesContainer2.querySelectorAll("p").forEach(p => p.remove());
        cardContainer.innerHTML = "";
        typeCounter.querySelectorAll("p").forEach(p => p.remove());
        aStrengthsContainer.querySelectorAll("p").forEach(p => p.remove());
        aWeaknessesContainer.querySelectorAll("p").forEach(p => p.remove());
        aImmunityContainer.querySelectorAll("p").forEach(p => p.remove());
        dStrengthsContainer.querySelectorAll("p").forEach(p => p.remove());
        dWeaknessesContainer.querySelectorAll("p").forEach(p => p.remove());
        dImmunityContainer.querySelectorAll("p").forEach(p => p.remove());
        cardContainer.innerHTML = "";
        nameContainer.innerHTML = '';
        headerContainer.style.display = 'none';
        moves.innerHTML = '';
};

//error function
function error(errorId) {
    if (errorId === 1) {
        alert("Please select two different types");
        clear()
    }
    else if(errorId === 2) {
        alert("Please select two types");
        clear()
    }
    else if (errorId === 3) {
        alert("Please select a type");
        clear()
    }
};

//sets type logo and background color for cards
function cardColorPicker(type, card, typeImage) {
    typeImage.style.backgroundImage = `url('pokemonSymbols/${type}.png')`;
    card.style.backgroundColor = typeColorCodes[type] || '#FFF'; // fallback color
};

function moveSorting(movesArray) {

    //sorts moves in ascending order
    movesArray.sort((a, b) => Number(a.level) - Number(b.level));

     // Clear the moves container
     moves.innerHTML = '';
 
     // Display each move
     movesArray.forEach(move => {
         const moveContainer = document.createElement('div');
 
         const name = document.createElement('p');
         const level = document.createElement('p');
         const power = document.createElement('p');
         const acc = document.createElement('p');
         const type = document.createElement('p');
         const pp = document.createElement('p');
 
         name.innerHTML = move.name;
         level.innerHTML = move.level;
         power.innerHTML = move.power;
         acc.innerHTML = move.acc;
         type.innerHTML = move.type;
         pp.innerHTML = move.pp;
 
         moveContainer.append(level, name, type, power, acc, pp);
         moves.appendChild(moveContainer);
     });
     console.log(movesArray);
}

function pokeMoveInfo(pokemonName) {

    //clears name container, displays table header, clears moves container
    nameContainer.innerHTML = '';
    headerContainer.style.display = 'flex';
    moves.innerHTML = '';

    //clears movesArray
    let movesArray = [];

    //uses pokemon name passed by eventListener (click on card)
    fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName)
        .then(res => res.json())
        .then(monData => {

            //creates pokemon name and appends to container
            const pokeName = document.createElement('h2');
            pokeName.innerHTML = pokemonName;
            nameContainer.appendChild(pokeName);

            //creates an array of promises
            //.filter loops through moves array and keeps only the level up learned moves
            //.map loops through the array returned by .filter and attaches a promise to each move
            const moveFetches = monData.moves
                .filter(move => move.version_group_details.at(-1).move_learn_method.name === "level-up")
                .map(move => {
                    //set variables for name and level
                    const moveName = move.move.name;
                    const level = move.version_group_details.at(-1).level_learned_at;

                    //return is necessary here because its async and if there were no return the fetch call would not be included in the .map
                    //resulting moveFetches would contain a bunch of undefined
                    return fetch("https://pokeapi.co/api/v2/move/" + moveName)
                        .then(res => res.json())
                        .then(moveData => {
                            //this return is needed to create the object without it the promise would resolve to undefined
                            return {
                                name: moveName,
                                level: level,
                                acc: moveData.accuracy ?? '--',
                                power: moveData.power ?? '--',
                                pp: moveData.pp,
                                type: moveData.type.name
                            };
                        });
                });

            // Wait for all move fetches to finish
            //The return here lets pokeMoveInfo return moveFetches which we can then use in the .then as fetchedMoves
            return Promise.all(moveFetches);
        })
        .then(fetchedMoves => {
            movesArray = fetchedMoves;
            moveSorting(movesArray);
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
}

//event listener for double typing
doubleTypeForm.addEventListener("submit", function(e) {
    e.preventDefault();

    //check that both values are different
    if (dTypeOne.value === dTypeTwo.value) {
        error(1);
        return;
    }

    //checks that two types have been chosen
    if (!dTypeOne.value || !dTypeTwo.value) {
        error(2);
        return;
    }

    //calls clear function to clean up previous data before displaying new
    clear();

    //promise all makes sure all api data has been collected before running rest of function
    Promise.all([
        fetch('https://pokeapi.co/api/v2/type/' + dTypeOne.value).then(res => res.json()),
        fetch('https://pokeapi.co/api/v2/type/' + dTypeTwo.value).then(res => res.json())
    ]).then(([data1, data2]) => {

        //damage relation arrays for both selected types(double damage, half damage, no damage)
        ddfArray = data1.damage_relations.double_damage_from.map(type => type.name);
        hdfArray = data1.damage_relations.half_damage_from.map(type => type.name);
        ndfArray = data1.damage_relations.no_damage_from.map(type => type.name);
        ddfArray2 = data2.damage_relations.double_damage_from.map(type => type.name);
        hdfArray2 = data2.damage_relations.half_damage_from.map(type => type.name);
        ndfArray2 = data2.damage_relations.no_damage_from.map(type => type.name);

        console.log(ddfArray, ndfArray, hdfArray)
        console.log(ddfArray2, ndfArray2, hdfArray2)

        //takes all type immunities for first typing and adds them to respective section
        //removes immunities from second typing arrays to prevent further interaction with type
        ndfArray.forEach(type => {
            const section = document.createElement("p");
            section.innerHTML = type;

            //filter keeps anything that does not equal to type
            ndfArray2 = ndfArray2.filter(t => t !== type);
            ddfArray2 = ddfArray2.filter(t => t !== type);
            hdfArray2 = hdfArray2.filter(t => t !== type);
            dImmunityContainer2.appendChild(section);
        });

        //takes all immunities from second typing and adds them to respective section
        //removes immunities from first typing arrays to prevent further interaction
        ndfArray2.forEach(type => {
            const section = document.createElement("p");
            section.innerHTML = type;

            ndfArray = ndfArray.filter(t => t !== type);
            ddfArray = ddfArray.filter(t => t !== type);
            hdfArray = hdfArray.filter(t => t !== type);
            dImmunityContainer2.appendChild(section);
        });

        //fills out weakness and 4x weakness sections
        ddfArray.forEach(type => {

            //checks half damage array from second typing
            //double damage from one type and half from the other cancels out so function returns
            if (hdfArray2.includes(type)) {
                return;
            }

            const section = document.createElement("p");
            section.innerHTML = type;
            
            //checks double damage array from second typing
            //if both types are weak against specific type then type is placed in 4x weakness, if not then placed in weakness section
            if (ddfArray2.includes(type)) {
                xdWeaknessesContainer2.appendChild(section);
            } else {
                dWeaknessesContainer2.appendChild(section);
            };
        });

        //fills out strength and 4x strength sections
        hdfArray.forEach(type => {

            //checks double damage from array for second type
            //cancels out if type is in both arrays
            if (ddfArray2.includes(type)) {
                return;
            }

            const section = document.createElement("p");
            section.innerHTML = type;
            
            //checks half damage from array 
            //if type is in both arrays then placed in 4x strength section, else placed in strength section
            if (hdfArray2.includes(type)) {
                xdStrengthsContainer2.appendChild(section);
            } else {
                dStrengthsContainer2.appendChild(section);
            };
        });

        //removes all types from ddfArray2 that are found in hdf and ddf arrays (these interactions have already been taken care of)
        //filter keeps only types NOT matching the specific type
        //this needs to happen because type 2 might have weakness and strength interactions not taken care of when checking first
        ddfArray2 = ddfArray2.filter(type => !hdfArray.includes(type) && !ddfArray.includes(type));

        //prints remaining weaknesses to weaknesses section
        ddfArray2.forEach(type => {

            const section = document.createElement("p");
            section.innerHTML = type;

            dWeaknessesContainer2.appendChild(section);
        });

        //removes all types from hdfArray2 that are found in ddf and hdf arrays (interactions have been taken care of)
        hdfArray2 = hdfArray2.filter(type => !ddfArray.includes(type) && !hdfArray.includes(type));

        //prints remaining strengths to strengths container
        hdfArray2.forEach(type => {

            const section = document.createElement("p");
            section.innerHTML = type;

            dStrengthsContainer2.appendChild(section);
            });
            
        //gathers all pokemon from type one and puts their name into typeArray
        let typeArray = data1.pokemon.map(monInfo => monInfo.pokemon.name);

        //checks every pokemon of the second typing and saves only the names of the ones present in the first list
        doubleArray = data2.pokemon
            .filter(monInfo => typeArray.includes(monInfo.pokemon.name))
            .map(monInfo => monInfo.pokemon.name);

        //checks the length of doubleArray to display the amount of pokemon with selected typing
        const counter = document.createElement("p");
        counter.innerHTML = doubleArray.length;
        dTypeCounter.appendChild(counter);

        //collects data from each pokemon in doubleArray and displays data
        Promise.all(
            doubleArray.map(mon => 
                fetch('https://pokeapi.co/api/v2/pokemon/' + mon)
                    .then(res => res.json())
            )
        )   
        .then(pokemonDataArray => {

            pokemonDataArray.sort((a, b) => a.id - b.id);

            pokemonDataArray.forEach(monData => {
                const card = document.createElement("div");
                card.className = "pokemon-card";
            
                const imageHolder = document.createElement("div");
                imageHolder.className = "image-holder";
                const stats = document.createElement("div");
                stats.className = "stats";
                const typeImage = document.createElement('div');
                typeImage.className = "type-image";
                const image = document.createElement("img");
            
                const hp = document.createElement("p");
                const atk = document.createElement("p");
                const def = document.createElement("p");
                const satk = document.createElement("p");
                const sdef = document.createElement("p");
                const spd = document.createElement("p");
            
                image.src = monData.sprites.front_default;
                image.alt = monData.name;
                hp.innerHTML = "<b>Hp:</b> " + monData.stats[0].base_stat;
                atk.innerHTML = "<b>Atk:</b> " + monData.stats[1].base_stat;
                def.innerHTML = "<b>Def:</b> " + monData.stats[2].base_stat;
                satk.innerHTML = "<b>SpA:</b> " + monData.stats[3].base_stat;
                sdef.innerHTML = "<b>SpD:</b> " + monData.stats[4].base_stat;
                spd.innerHTML = "<b>Spe:</b> " + monData.stats[5].base_stat;
            
                stats.append(hp, atk, def, satk, sdef, spd, typeImage);
                imageHolder.append(image);
                card.append(imageHolder, stats);
                cardContainer.appendChild(card);
            
                cardColorPicker(dTypeOne.value, card, typeImage);
            
                card.addEventListener('click', () => {
                  pokeMoveInfo(monData.name);
                })
            })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        })
    })
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });
});

typeForm.addEventListener("submit", function(e) {
    e.preventDefault();

    //makes sure type is selected
    if (!typeOne.value) {
        error(3);
        return;
    };

    //clears previous data before printing new one
    clear();

    fetch('https://pokeapi.co/api/v2/type/' + typeOne.value)
        .then(response => response.json())
        .then(data => {
            //checks length of list and writes down number (amount of pokemon in chosen type)
            const counter = document.createElement("p");
            counter.innerHTML = data.pokemon.length;
            typeCounter.appendChild(counter);

            //checks each damage relation for chosen type and prints to respective section
            data.damage_relations.double_damage_from.forEach(type => {
                const section = document.createElement("p");
                section.innerHTML = type.name;
                dWeaknessesContainer.appendChild(section);
            });
            data.damage_relations.double_damage_to.forEach(type => {
                const section = document.createElement("p");
                section.innerHTML = type.name;
                aStrengthsContainer.appendChild(section);
            });
            data.damage_relations.half_damage_from.forEach(type => {
                const section = document.createElement("p");
                section.innerHTML = type.name;
                dStrengthsContainer.appendChild(section);
            });
            data.damage_relations.half_damage_to.forEach(type => {
                const section = document.createElement("p");
                section.innerHTML = type.name;
                aWeaknessesContainer.appendChild(section);
            });
            data.damage_relations.no_damage_from.forEach(type => {
                const section = document.createElement("p");
                section.innerHTML = type.name;
                dImmunityContainer.appendChild(section);
            });
            data.damage_relations.no_damage_to.forEach(type => {
                const section = document.createElement("p");
                section.innerHTML = type.name;
                aImmunityContainer.appendChild(section);
            });

            //fetches data for each pokemon in list and prints stats
            singleArray = [];

            const fetches = data.pokemon.map(typeData => 
                fetch(typeData.pokemon.url).then(res => res.json())
            );

            Promise.all(fetches)
                .then(allMonData => {
                    // Now that we have all Pokémon, sort by ID
                    allMonData.sort((a, b) => a.id - b.id);

                    allMonData.forEach(monData => {
                        const card = document.createElement("div");
                        card.className = "pokemon-card";

                        const imageHolder = document.createElement("div");
                        imageHolder.className = "image-holder";
                        const stats = document.createElement("div");
                        stats.className = "stats";
                        const typeImage = document.createElement('div');
                        typeImage.className = "type-image";
                        const image = document.createElement("img");

                        const hp = document.createElement("p");
                        const atk = document.createElement("p");
                        const def = document.createElement("p");
                        const satk = document.createElement("p");
                        const sdef = document.createElement("p");
                        const spd = document.createElement("p");

                        image.src = monData.sprites.front_default;
                        image.alt = monData.name;
                        hp.innerHTML = "<b>Hp:</b> " + monData.stats[0].base_stat;
                        atk.innerHTML = "<b>Atk:</b> " + monData.stats[1].base_stat;
                        def.innerHTML = "<b>Def:</b> " + monData.stats[2].base_stat;
                        satk.innerHTML = "<b>SpA:</b> " + monData.stats[3].base_stat;
                        sdef.innerHTML = "<b>SpD:</b> " + monData.stats[4].base_stat;
                        spd.innerHTML = "<b>Spe:</b> " + monData.stats[5].base_stat;

                        stats.append(hp, atk, def, satk, sdef, spd, typeImage);
                        imageHolder.append(image);
                        card.append(imageHolder, stats);
                        cardContainer.appendChild(card);

                        cardColorPicker(typeOne.value, card, typeImage);

                        card.addEventListener('click', () => {
                            pokeMoveInfo(monData.name);
                        });
                    });
                })
                .catch(error => {
                    console.error('Error fetching or displaying Pokémon:', error);
                });
            });
        });

//creates array from html collection (getbyclassname creates html collection not array)
//now that element is array use for each to add event listener to both buttons
//dont call clear immediately 
Array.from(document.getElementsByClassName("clear")).forEach(button => {
    button.addEventListener("click", clear);
    });