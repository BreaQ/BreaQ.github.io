// buttons + and - for watter bottle
const addButton = document.querySelector(".add"),
    removeButton = document.querySelector(".remove");

const currentCupsEl = document.querySelector('.current-cups'),
    currentLitersEl= document.querySelector('.current-liters'),
    currentPercentageEl = document.querySelector('.current-percentage'),
    progressArea = document.querySelector('.progress');

const MAX_Cups = 10,
    MIN_Cups = 0;

let cups = 0,
    liters = 0,
    percentage = 0;


addButton.addEventListener('click', addCup);
removeButton.addEventListener('click', removeCup);

function addCup () {
    cups++;
    liters += 250;
    percentage = (cups/MAX_Cups) * 100;

    update();

    if (cups === MAX_Cups){
        addButton.disabled = true;
    } else {
        removeButton.disabled = false;
    }
    goodJob();
}

function removeCup() {
    cups--;
    liters -= 250;
    percentage = (cups/MAX_Cups) * 100;

    update();

    if (cups === MIN_Cups){
        removeButton.disabled = true;
    } else {
        addButton.disabled = false;
    }

}

function update(){
    currentCupsEl.textContent = `${cups}/10`;
    currentLitersEl.textContent = `${liters / 1000}l/2.5l`;
    currentPercentageEl.textContent = `${percentage}%`;
    progressArea.style.height = `${percentage}%`;
}

function goodJob(){
    if (cups === 10){
        alert("Great job! You are properly hydrated today!")
    }
}
