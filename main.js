
// < !--Initialize Swiper-- >
var swiper = new Swiper(".mySwiper", {
    effect: 'cards',
    pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});

///---- make cards using cards Array loaded from jokes.js
let cards = [], levelSelected = 'e';

function getCount() {
    let perLoadCount = 30;
    return cards.length >= perLoadCount ? perLoadCount : cards.length
}

function setCards(level) {
    if (level == 'm') cards = gameWords.medium;
    else if (level == 'h') cards = gameWords.hard;
    else cards = gameWords.easy;
    levelSelected = level;
    loadCards();
}

function loadCards() {
    swiper.slideTo(0, 1000);//index, animate time ms
    swiper.removeAllSlides();
    for (let index = 0; index < getCount(); index++) {
        let pos = Math.floor(Math.random() * cards.length);
        let card = cards.splice(pos, 1)[0];
        // let color = getRandomDarkColor();
        swiper.appendSlide([
            `<div class="swiper-slide" style="background-color:${getRandomDarkColor()};">${card}</div>`,
        ]);
    }
    addLastSlide();
}

function addLastSlide() {
    let msg = (getCount() < 1) ? "This is the end. Swipe left." : "Tap for a new set.</br> Or swipe left for new level.";
    swiper.appendSlide([
        `<div id="loadMore" class="swiper-slide intro" onclick="loadCards()"><i>${msg}</i></div>`,
        `<div class="swiper-slide intro"><button onclick="setCards('e')">Easy</button><button onclick="setCards('m')">Medium</button><button onclick="setCards('h')">Hard</button></div>`
    ]);
}

function getRandomDarkColor() {
    let rand = Math.floor(Math.random() * 360);
    return `hsl(${rand}deg, 50%, 10%)`;
}