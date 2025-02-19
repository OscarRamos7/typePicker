const typeForm = document.getElementById("typeForm");
const typeOne = document.getElementById("typeOne");
const aStrengthsContainer = document.getElementById("attack-strengths-container");
const aWeaknessesContainer = document.getElementById("attack-weaknesses-container");
const aImmunityContainer = document.getElementById("attack-immunity-container");
const dStrengthsContainer = document.getElementById("defensive-strengths-container");
const dWeaknessesContainer = document.getElementById("defensive-weaknesses-container");
const dImmunityContainer = document.getElementById("defensive-immunity-container");


const doubleTypeForm = document.getElementById("double-type-form");
const dTypeOne = document.getElementById("double-type-one");
const dTypeTwo = document.getElementById("double-type-two");
const xdStrengthsContainer2 = document.getElementById("x-defensive-strengths-container2");
const xdWeaknessesContainer2 = document.getElementById("x-defensive-weaknesses-container2");
const dStrengthsContainer2 = document.getElementById("defensive-strengths-container2");
const dWeaknessesContainer2 = document.getElementById("defensive-weaknesses-container2");
const dImmunityContainer2 = document.getElementById("defensive-immunity-container2");

let strengths;
let weaknesses;

doubleTypeForm.addEventListener("submit", function(e) {
    e.preventDefault();

    dStrengthsContainer2.querySelectorAll("p").forEach(p => p.remove());
    dWeaknessesContainer2.querySelectorAll("p").forEach(p => p.remove());
    dImmunityContainer2.querySelectorAll("p").forEach(p => p.remove());
    xdStrengthsContainer2.querySelectorAll("p").forEach(p => p.remove());
    xdWeaknessesContainer2.querySelectorAll("p").forEach(p => p.remove());

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

    // Remove only <p> elements from strengthsContainer
    aStrengthsContainer.querySelectorAll("p").forEach(p => p.remove());
    aWeaknessesContainer.querySelectorAll("p").forEach(p => p.remove());
    aImmunityContainer.querySelectorAll("p").forEach(p => p.remove());

    // Remove only <p> elements from weaknessesContainer
    dStrengthsContainer.querySelectorAll("p").forEach(p => p.remove());
    dWeaknessesContainer.querySelectorAll("p").forEach(p => p.remove());
    dImmunityContainer.querySelectorAll("p").forEach(p => p.remove());

    fetch('strengths.json')
        .then(response => response.json())
        .then(data => {
            strengths = data;
            // Iterate over key-value pairs of typeOneData[typeOne.value]
            Object.entries(strengths[typeOne.value]).forEach(([key, value]) => {
                
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
            weaknesses = data;
            Object.entries(weaknesses[typeOne.value]).forEach(([key, value]) => {

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