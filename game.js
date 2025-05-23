// variables storing audio objects to make the various sounds
let clickAudio = new Audio("audio/click.wav");
let matchAudios = [
    new Audio("audio/wi-wi-wi.mp3"),
    new Audio("audio/oo-ee-aa.mp3"),
    new Audio("audio/boom.mp3"),
    new Audio("audio/scream.mp3"),
    new Audio("audio/huh.mp3"),
    new Audio("audio/awo.mp3")
];

/**
 * Attaches a mouseclick listener to a card, flips the card when clicked, and calls the function 'onCardFlipped' after the flip is complete
 * @param cardObject A custom card object created in the 'createCards' function
 */
function flipCardWhenClicked(cardObject) {
    // Adds an "onclick" attribute/listener to the element that will call the function below.
    cardObject.element.onclick = function () {
        // card is already flipped
        if (cardObject.element.classList.contains("flipped")) {
            return;
        }

        clickAudio.play();

        // add the flipped class immediately after a card is clicked
        cardObject.element.classList.add("flipped");
        setTimeout(function () {
            onCardFlipped(cardObject);
        }, 500);
    };
}

/**
 * Set up the game - calls createCards() and adds onclick to each card created
 */
function setUpGame() {
    let cardObjects = createCards(
        document.getElementById("card-container"),
        shuffleCardImageClasses()
    );

    if (cardObjects != null) {
        for (let i = 0; i < cardObjects.length; i++) {
            flipCardWhenClicked(cardObjects[i]);
        }
    }

    for (let i = 0; i < matchAudios.length; i++) {
        matchAudios[i].volume = 0.8;
    }
}

const modal = document.getElementById("win-modal");
const newGameBtn = document.querySelector(".new-game-btn");

function openModal() {
    modal.style.display = "block";
}

newGameBtn.addEventListener("click", () => {
    resetGame();
    modal.style.display = "none";
});