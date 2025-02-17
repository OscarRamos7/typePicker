const typeForm = document.getElementById("typeForm");
const typeOne = document.getElementById("typeOne");
const strengthsContainer = document.getElementById("strengths-container");
const weaknessesContainer = document.getElementById("weaknesses-container");

const doubleTypeForm = document.getElementById("double-type-form");
const dTypeOne = document.getElementById("double-type-one");
const dTypeTwo = document.getElementById("double-type-two");

let strengths;
let weaknesses;

typeForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Remove only <p> elements from strengthsContainer
    strengthsContainer.querySelectorAll("p").forEach(p => p.remove());

    // Remove only <p> elements from weaknessesContainer
    weaknessesContainer.querySelectorAll("p").forEach(p => p.remove());

    fetch('strengths.json')
        .then(response => response.json())
        .then(data => {
            strengths = data;
            // Iterate over key-value pairs of typeOneData[typeOne.value]
            Object.entries(strengths[typeOne.value]).forEach(([key, value]) => {
                if (value > 1) {
                    const type = document.createElement("p");

                    type.innerHTML = key;
                    strengthsContainer.appendChild(type);
                };
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
                if (value > 1) {
                    const type = document.createElement("p");

                    type.innerHTML = key;
                    weaknessesContainer.appendChild(type);
                };
            });
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });

    console.log(typeOne.value);
});