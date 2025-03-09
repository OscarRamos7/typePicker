//make side function to check multiplier (pass value and an identifier variable)
//make double typing match ups based on poke api
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

        ddfArray = data1.damage_relations.double_damage_from.map(type => type.name);
        hdfArray = data1.damage_relations.half_damage_from.map(type => type.name);
        ndfArray = data1.damage_relations.no_damage_from.map(type => type.name);
        ddfArray2 = data2.damage_relations.double_damage_from.map(type => type.name);
        hdfArray2 = data2.damage_relations.half_damage_from.map(type => type.name);
        ndfArray2 = data2.damage_relations.no_damage_from.map(type => type.name);

        console.log(ddfArray, ndfArray, hdfArray)
        console.log(ddfArray2, ndfArray2, hdfArray2)

        ndfArray.forEach(type => {
            const section = document.createElement("p");
            section.innerHTML = type;

            ndfArray2 = ndfArray2.filter(t => t !== type);
            ddfArray2 = ddfArray2.filter(t => t !== type);
            hdfArray2 = hdfArray2.filter(t => t !== type);
            dImmunityContainer2.appendChild(section);
        });

        ndfArray2.forEach(type => {
            const section = document.createElement("p");
            section.innerHTML = type;

            ndfArray = ndfArray.filter(t => t !== type);
            ddfArray = ddfArray.filter(t => t !== type);
            hdfArray = hdfArray.filter(t => t !== type);
            dImmunityContainer2.appendChild(section);
        });

        ddfArray.forEach(type => {

            if (hdfArray2.includes(type)) {
                return;
            }

            const section = document.createElement("p");
            section.innerHTML = type;
            
            if (ddfArray2.includes(type)) {
                xdWeaknessesContainer2.appendChild(section);
            } else {
                dWeaknessesContainer2.appendChild(section);
            };
        });

        hdfArray.forEach(type => {

            if (ddfArray2.includes(type)) {
                return;
            }

            const section = document.createElement("p");
            section.innerHTML = type;
            
            if (hdfArray2.includes(type)) {
                xdStrengthsContainer2.appendChild(section);
            } else {
                dStrengthsContainer2.appendChild(section);
            };
        });

        ddfArray2 = ddfArray2.filter(type => !hdfArray.includes(type) && !ddfArray.includes(type));

        ddfArray2.forEach(type => {

            const section = document.createElement("p");
            section.innerHTML = type;

            dWeaknessesContainer2.appendChild(section);
        });

        hdfArray2 = hdfArray2.filter(type => !ddfArray.includes(type) && !hdfArray.includes(type));

        hdfArray2.forEach(type => {

            const section = document.createElement("p");
            section.innerHTML = type;

            dStrengthsContainer2.appendChild(section);
        });
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });

    /*fetch('weaknesses.json')
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
        }); */
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