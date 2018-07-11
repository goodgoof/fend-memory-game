/*
 * Create a list that holds all of your cards
 */

const shuffleCards=[
  "fa fa-diamond","fa fa-diamond",
  "fa fa-paper-plane-o","fa fa-paper-plane-o",
  "fa fa-anchor","fa fa-anchor",
  "fa fa-bolt","fa fa-bolt",
  "fa fa-cube","fa fa-paper-cube",
  "fa fa-leaf","fa fa-leaf",
  "fa fa-bicycle","fa fa-bicycle",
  "fa fa-bomb","fa fa-bomb"]


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


//adding number of moves to the game

let moves = 0;

function addMove(){
  moves++;
  const movesText=document.querySelector('.moves');
  movesText.innerHTML=moves;
}

//adding stars to the game depending on number of moves

function score(){
  if(moves===16 || moves===24){
    starDisplay();
    starDisplay();
  }
}

function starDisplay(){
  const stars = document.querySelectorAll('.stars li');
  for(star of stars){
    if(star.style.display !== 'none'){
       star.style.display = 'none';
       break;
      }
  }
}

starDisplay();
starDisplay();


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


let openCards =[];

function toggleCard(clickTarget) {
  clickTarget.classList.toggle('show');
  clickTarget.classList.toggle('open');
}




cards.forEach(function(card){

  card.addEventListener('click',function(){
    const clickTarget = event.target;

    if(clickTarget.classList.contains('card') && !clickTarget.classList.contains('match')
     && openCards.length < 2
     && !openCards.includes(clickTarget)){
      toggleCard(clickTarget)
      addOpenCards(clickTarget);

      if (openCards.length === 2){
        console.log('helloe here r 2 cards');
        cardMatch();
        addMove();
        score();
      }

    }
  });
})

function addOpenCards(clickTarget) {
    openCards.push(clickTarget);
    console.log(openCards);
}

function cardMatch() {
  if (
    openCards[0].firstElementChild.className ===
    openCards[1].firstElementChild.className
  )
    {
      console.log('match')
    openCards[0].classList.toggle('match');
    openCards[1].classList.toggle('match');
    openCards = [];
  } else {
    console.log('no match');
    setTimeout(() => {
      toggleCard(openCards[0]);
      toggleCard(openCards[1]);
      openCards = [];
    }, 1000);

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
