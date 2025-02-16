const typeForm = document.getElementById("typeForm");
const typeOne = document.getElementById("typeOne");
const typeTwo = document.getElementById("typeTwo");
const strengthsContainer = document.getElementById("strengths-container")
const weaknessesContainer = document.getElementById("weaknesses-container")

let strengths;
let weaknesses;

typeForm.addEventListener("submit", function(e) {
    e.preventDefault();

    fetch('strengths.json')
        .then(response => response.json())
        .then(data => {
            strengths = data;
            // Iterate over key-value pairs of typeOneData[typeOne.value]
            Object.entries(strengths[typeOne.value]).forEach(([key, value]) => {
                if (value > 1) {
                    const type = document.createElement("p")

                    type.innerHTML = key
                    strengthsContainer.appendChild(type)
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
                if (value > 1) {
                    const type = document.createElement("p")

                    type.innerHTML = key
                    weaknessesContainer.appendChild(type)
                }
            });
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });

    console.log(typeOne.value);
})