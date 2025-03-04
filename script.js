//add checker to see how many types of pokemon have same typing as double type variables
//make side function to check multiplier (pass value and an identifier variable)
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

const dCardContainer = document.getElementById("double-card-container");

let typeArray = [];
let doubleArray = [];

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

doubleTypeForm.addEventListener("submit", function(e) {
    e.preventDefault();

    if (dTypeOne.value === dTypeTwo.value) {
        error(1);
        return;
    }

    if (!dTypeOne.value || !dTypeTwo.value) {
        error(2);
        return;
    }

    clear(2);

    Promise.all([
        fetch('https://pokeapi.co/api/v2/type/' + dTypeOne.value).then(res => res.json()),
        fetch('https://pokeapi.co/api/v2/type/' + dTypeTwo.value).then(res => res.json())
    ]).then(([data1, data2]) => {
        let typeArray = data1.pokemon.map(monInfo => monInfo.pokemon.name);

        doubleArray = data2.pokemon
            .filter(monInfo => typeArray.includes(monInfo.pokemon.name))
            .map(monInfo => monInfo.pokemon.name);

        const counter = document.createElement("p");
        counter.innerHTML = doubleArray.length;
        dTypeCounter.appendChild(counter);
        console.log(doubleArray)
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
                console.log(monInfo.name, monInfo.types[0].type.name, monInfo.types[1].type.name)
            })
            .catch(error => {
                console.error('Error fetching JSON:', error);
            })
        })
    }).catch(error => {
        console.error('Error fetching JSON:', error);
    });

    fetch('weaknesses.json')
        .then(response => response.json())
        .then(data => {
            Object.entries(data[dTypeOne.value]).forEach(([key, multiplier]) => {

                const type = document.createElement("p");
                type.innerHTML = key;

                if (multiplier == 0) {
                    dImmunityContainer2.appendChild(type);
                } 
                else if(multiplier == 0.5) {
                    if (data[dTypeTwo.value][key] == 0) {
                        dImmunityContainer2.appendChild(type);
                    }
                    else if (data[dTypeTwo.value][key] == 0.5) {
                        xdStrengthsContainer2.appendChild(type)
                    }
                    else if (data[dTypeTwo.value][key] == 1) {
                        dStrengthsContainer2.appendChild(type)
                    }
                }
                else if(multiplier == 2) {
                    if (data[dTypeTwo.value][key] == 0) {
                        dImmunityContainer2.appendChild(type);
                    }
                    else if (data[dTypeTwo.value][key] == 1) {
                        dWeaknessesContainer2.appendChild(type);
                    }
                    else if (data[dTypeTwo.value][key] == 2) {
                        xdWeaknessesContainer2.appendChild(type);
                    }
                }
                else if(multiplier == 1) {
                    if (data[dTypeTwo.value][key] == 0) {
                        dImmunityContainer2.appendChild(type);
                    }
                    else if (data[dTypeTwo.value][key] == 0.5) {
                        dStrengthsContainer2.appendChild(type);
                    }
                    else if (data[dTypeTwo.value][key] == 2) {
                        dWeaknessesContainer2.appendChild(type);
                    }
                }
            })
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
})

typeForm.addEventListener("submit", function(e) {
    e.preventDefault();

    if (!typeOne.value) {
        error(3);
        return;
    };

    clear(1);

    fetch('https://pokeapi.co/api/v2/type/' + typeOne.value)
        .then(response => response.json())
        .then(data => {
            const counter = document.createElement("p");
            counter.innerHTML = data.pokemon.length;
            typeCounter.appendChild(counter);
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });


    fetch('strengths.json')
        .then(response => response.json())
        .then(data => {
            // Iterate over key-value pairs of typeOneData[typeOne.value]
            Object.entries(data[typeOne.value]).forEach(([key, value]) => {
                
                const type = document.createElement("p");
                type.innerHTML = key;
                
                if (value > 1) {
                    aStrengthsContainer.appendChild(type);
                } 
                else if (value < 1 && value > 0) {
                    aWeaknessesContainer.appendChild(type);
                } 
                else if (value == 0) {
                    aImmunityContainer.appendChild(type);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });

    fetch('weaknesses.json')
        .then(response => response.json())
        .then(data => {
            Object.entries(data[typeOne.value]).forEach(([key, value]) => {

                const type = document.createElement("p");
                type.innerHTML = key;

                if (value < 1 && value > 0) {
                    dStrengthsContainer.appendChild(type);
                }
                else if (value > 1) {
                    dWeaknessesContainer.appendChild(type);
                }
                else if (value == 0) {
                    dImmunityContainer.appendChild(type);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });

    console.log(typeOne.value);
});