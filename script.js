const typeForm = document.getElementById("typeForm");
const typeOne = document.getElementById("typeOne");
const typeTwo = document.getElementById("typeTwo");

let typeOneData;
let typeTwoData;

typeForm.addEventListener("submit", function(e) {
    e.preventDefault();

    fetch('strengths.json')
        .then(response => response.json())
        .then(data => {
            typeOneData = data;
            console.log(typeOneData.normal.ghost)
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });

    fetch('weaknesses.json')
        .then(response => response.json())
        .then(data => {
            typeTwoData = data;
            console.log(typeTwoData.normal.fighting)
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });

    console.log(typeOne.value, typeTwo.value);
})

