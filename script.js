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

let strengths;
let weaknesses;

doubleTypeForm.addEventListener("submit", function(e) {
    e.preventDefault();

    fetch('weaknesses.json')
        .then(response => response.json())
        .then(data => {
            Object.entries(data[dTypeOne.value]).forEach(([key, value]) => {
                console.log(key, value)
            })
        })
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