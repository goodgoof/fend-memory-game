/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const cards = document.querySelectorAll('.card');
// console.log(cards);
//
// for(card of cards) {
//   card.addEventListener('click', () => {
//     const clickTarget = event.target;
//
//        if(clickTarget.classList.contains('card')){
//          card.classList.toggle('open');
//          card.classList.toggle('show');
//          console.log('helloe I am a card');
//        }
//         });
//       }

// for(card of cards) {
//
//   cards.addEventListener('click', () => {
//     const clickTarget = event.target;
//
//     // if(clickTarget.classList.contains('card')){
//       console.log('helloe I am a card');
//     // }
//     // console.log('helloe I am a card');
//     // card.classList.add('open','show')
//   });
// }


var openCards =[];

function toggleCard(clickTarget) {
  clickTarget.classList.toggle('show');
 clickTarget.classList.toggle('open');
}


function addOpenCards(clickTarget) {
    openCards.push(clickTarget);
    console.log(openCards);
}

function cardMatch() {
  if (openCards[0].firstElementChild.className ===
    openCards[1].firstElementChild.className)
    {
    openCards[0].classList.toggle('match');
    openCards[1].classList.toggle('match');
    openCards = [];
  } else {
    console.log('no match');
    openCards = [];
  }

}

cards.forEach(function(card){
  card.addEventListener('click',function(){
    const clickTarget = event.target;

    if(clickTarget.classList.contains('card') && openCards.length < 2){
      toggleCard(clickTarget)
      addOpenCards(clickTarget);
      if (openCards.length === 2){
        console.log('helloe here r 2 cards');
      }

    }
  });
})

function addOpenCards(clickTarget) {
    openCards.push(clickTarget);
    console.log(openCards);
}

function cardMatch() {
  if (openCards[0].firstElementChild.className ===
    openCards[1].firstElementChild.className)
    {
    openCards[0].classList.toggle('match');
    openCards[1].classList.toggle('match');
    openCards = [];
  } else {
    console.log('no match');
    openCards = [];
  }

}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
