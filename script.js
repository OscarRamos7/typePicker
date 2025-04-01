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
const dCardContainer = document.getElementById("double-card-container");

let typeArray = [];
let doubleArray = [];

//clearing function
function clear(clearId) {
    if (clearId === 2) {
        dTypeCounter.querySelectorAll("p").forEach(p => p.remove());
        dStrengthsContainer2.querySelectorAll("p").forEach(p => p.remove());
        dWeaknessesContainer2.querySelectorAll("p").forEach(p => p.remove());
        dImmunityContainer2.querySelectorAll("p").forEach(p => p.remove());
        xdStrengthsContainer2.querySelectorAll("p").forEach(p => p.remove());
        xdWeaknessesContainer2.querySelectorAll("p").forEach(p => p.remove());
        dCardContainer.innerHTML = "";
    }
    else if (clearId === 1) {
        typeCounter.querySelectorAll("p").forEach(p => p.remove());
        aStrengthsContainer.querySelectorAll("p").forEach(p => p.remove());
        aWeaknessesContainer.querySelectorAll("p").forEach(p => p.remove());
        aImmunityContainer.querySelectorAll("p").forEach(p => p.remove());
        dStrengthsContainer.querySelectorAll("p").forEach(p => p.remove());
        dWeaknessesContainer.querySelectorAll("p").forEach(p => p.remove());
        dImmunityContainer.querySelectorAll("p").forEach(p => p.remove());
    }
}

//error function
function error(errorId) {
    if (errorId === 1) {
        alert("Please select two different types");
        clear(2)
    }
    else if(errorId === 2) {
        alert("Please select two types");
        clear(2)
    }
    else if (errorId === 3) {
        alert("Please select a type");
        clear(1)
    }
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
    clear(2);

    //promise all makes sure all api data has been collected before running rest of function
    Promise.all([
        fetch('https://pokeapi.co/api/v2/type/' + dTypeOne.value).then(res => res.json()),
        fetch('https://pokeapi.co/api/v2/type/' + dTypeTwo.value).then(res => res.json())
    ]).then(([data1, data2]) => {
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
        doubleArray.forEach(mon => {
            fetch('https://pokeapi.co/api/v2/pokemon/' + mon)
            .then(res => res.json())
            .then(monInfo => {
                const card = document.createElement("div");
                const name = document.createElement("h4");
                const hp = document.createElement("p");
                const atk = document.createElement("p");
                const def = document.createElement("p");
                const satk = document.createElement("p");
                const sdef = document.createElement("p");
                const spd = document.createElement("p");

                name.innerHTML = "Name: " + monInfo.name;
                hp.innerHTML = "Hp: " + monInfo.stats[0].base_stat;
                atk.innerHTML = "Attack: " + monInfo.stats[1].base_stat;
                def.innerHTML = "Defense: " + monInfo.stats[2].base_stat;
                satk.innerHTML = "S.Attack: " + monInfo.stats[3].base_stat;
                sdef.innerHTML = "S.Defense: " + monInfo.stats[4].base_stat;
                spd.innerHTML = "Speed: " + monInfo.stats[5].base_stat;

                card.append(name, hp, atk, def, satk, sdef, spd);
                dCardContainer.appendChild(card);
            })
            .catch(error => {
                console.error('Error fetching JSON:', error);
            });
        });

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
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });
})

typeForm.addEventListener("submit", function(e) {
    e.preventDefault();

    //makes sure type is selected
    if (!typeOne.value) {
        error(3);
        return;
    };

    //clears previous data before printing new one
    clear(1);

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
            data.pokemon.forEach(typeData => {
                fetch(typeData.pokemon.url)
                    .then(res => res.json())
                    .then(monData => {
                        console.log(monData.name)
                        const card = document.createElement("div");
                        const name = document.createElement("h4");
                        const hp = document.createElement("p");
                        const atk = document.createElement("p");
                        const def = document.createElement("p");
                        const satk = document.createElement("p");
                        const sdef = document.createElement("p");
                        const spd = document.createElement("p");

                        name.innerHTML = "Name: " + monData.name;
                        hp.innerHTML = "Hp: " + monData.stats[0].base_stat;
                        atk.innerHTML = "Attack: " + monData.stats[1].base_stat;
                        def.innerHTML = "Defense: " + monData.stats[2].base_stat;
                        satk.innerHTML = "S.Attack: " + monData.stats[3].base_stat;
                        sdef.innerHTML = "S.Defense: " + monData.stats[4].base_stat;
                        spd.innerHTML = "Speed: " + monData.stats[5].base_stat;

                        card.append(name, hp, atk, def, satk, sdef, spd);
                        cardContainer.appendChild(card);
                    })
                    .catch(error => {
                        console.error('Error fetching JSON:', error);
                    });
            })
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
    });