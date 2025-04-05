/**
 * Creates a new card
 * @return the created card
 */
function createNewCard() {
    let cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.innerHTML = `
    <div class="card-down"></div>
    <div class="card-up"></div>`;
    return cardElement;
}

/**
 * Adds a card to an element
 * @param parentElement The element to add the card to
 * @return the card that was added
 */
function appendNewCard(parentElement) {
    let cardElement = createNewCard();
    parentElement.appendChild(cardElement);
    return cardElement;
}

/**
 * Shuffles the cards' images
 * @return the shuffled array of card images
 */
function shuffleCardImageClasses() {
    let cardClasses = [
        "image-1",
        "image-1",
        "image-2",
        "image-2",
        "image-3",
        "image-3",
        "image-4",
        "image-4",
        "image-5",
        "image-5",
        "image-6",
        "image-6",
    ];
    cardClasses = _.shuffle(cardClasses);
    return cardClasses;
}

/**
 * Creates all 12 cards for the game
 * @param parentElement The element to add the cards to
 * @param shuffledImageClasses The array of shuffled card images
 * @return an array of created card objects
 */
function createCards(parentElement, shuffledImageClasses) {
    let cards = [];
    for (let i = 0; i < 12; i++) {
        // add new card and create associated card object
        let newCard = appendNewCard(parentElement);
        newCard.classList.add(shuffledImageClasses[i]);
        let cardObject = {
            index: i,
            element: newCard,
            imageClass: shuffledImageClasses[i],
        };
        cards.push(cardObject);
    }
    return cards;
}

/**
 * Checks to see if two cards match
 * @param cardObject1 The first card
 * @param cardObject2 The second card
 * @return true if the cards match and false otherwise
 */
function doCardsMatch(cardObject1, cardObject2) {
    return cardObject1.imageClass === cardObject2.imageClass;
}

// dictionary to hold the counters for flips and matches
let counters = {};

/**
 * Increments the counter by one
 * @param counterName The name of the counter (flips/matches)
 * @param parentElement The parent of the counter
 */
function incrementCounter(counterName, parentElement) {
    if (counters[counterName] === undefined) {
        counters[counterName] = 0;
    }
    counters[counterName]++;
    parentElement.innerText = counters[counterName];
}

// the card that was last flipped
let lastCardFlipped = null;

/**
 * Increments counters and checks for matches
 * @param newlyFlippedCard The card that was just flipped
 */
function onCardFlipped(newlyFlippedCard) {
    incrementCounter("flips", document.getElementById("flip-count"));

    // card flipped is the first
    if (!lastCardFlipped) {
        lastCardFlipped = newlyFlippedCard;
        return;
    }

    // cards don't match
    if (!doCardsMatch(lastCardFlipped, newlyFlippedCard)) {
        lastCardFlipped.element.classList.remove("flipped");
        newlyFlippedCard.element.classList.remove("flipped");
        lastCardFlipped = null;
        return;
    }

    // cards match
    incrementCounter("matches", document.getElementById("match-count"));
    switch (newlyFlippedCard.imageClass) {
        case "image-1":
            matchAudios[0].play();
            break;
        case "image-2":
            matchAudios[1].play();
            break;
        case "image-3":
            matchAudios[2].play();
            break;
        case "image-4":
            matchAudios[3].play();
            break;
        case "image-5":
            matchAudios[4].play();
            break;
        case "image-6":
            matchAudios[5].play();
            break;
    }
    lastCardFlipped.element.classList.add("glow");
    lastCardFlipped.element.classList.add("border-glow");
    newlyFlippedCard.element.classList.add("glow");
    newlyFlippedCard.element.classList.add("border-glow");

    if (counters["matches"] === 6) {
        openModal();
    }

    lastCardFlipped = null;
}

/**
 * Reset the game back to its default values
 */
function resetGame() {
    let cards = document.getElementById("card-container");
    // remove all cards
    while (cards.firstChild) {
        cards.removeChild(cards.firstChild);
    }

    // reset counters to 0
    document.getElementById("flip-count").innerText = "0";
    document.getElementById("match-count").innerText = "0";
    counters = {};
    lastCardFlipped = null;
    setUpGame();
}

setUpGame();
