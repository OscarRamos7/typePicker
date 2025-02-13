const typeForm = document.getElementById("typeForm");
const typeOne = document.getElementById("typeOne");
const typeTwo = document.getElementById("typeTwo")

typeForm.addEventListener("submit", function(e) {
    e.preventDefault();

    console.log(typeOne.value, typeTwo.value);
})