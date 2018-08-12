/*
 * Create a list that holds all of your cards
 */

const shuffleCards=[
  "fa fa-diamond","fa fa-diamond",
  "fa fa-paper-plane-o","fa fa-paper-plane-o",
  "fa fa-anchor","fa fa-anchor",
  "fa fa-bolt","fa fa-bolt",
  "fa fa-cube","fa fa-cube",
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

const newCard= shuffle(shuffleCards);
//global variables

let moves = 0;
let time = 0;
let clockOff = true;
let openCards =[];
let clockId = null;
const cards = document.querySelectorAll('.card');
let matchCard = [];
let matched = 0;
const TOTAL_PAIRS = 8;

//adding number of moves to the game

function addMove(){
  moves++;
  const movesText=document.querySelector('.moves');
  movesText.innerHTML=moves;
}

//adding stars to the game depending on number of moves

function score(){
  if(moves===1){
    starDisplay();
  }

  if(matchCard.length===10){
    starDisplay();

  }
    if(matchCard.length===16){
      starDisplay();
      starDisplay();
    }

}

function removeAllStar(){
  const stars = document.querySelectorAll('.stars li');
  for(star of stars){
    star.style.display = 'none';
  }
}

removeAllStar();

function starDisplay(){
  const stars = document.querySelectorAll('.stars li');

  for(star of stars){
    if(star.style.display === 'none'){
       star.style.display = 'inline-block';
       break;
     }
  }
}

//setting clock functionality
  function startClock(){
    clockId = setInterval(() => {
      ++time;
      displayTime();
      }, 1000);
  }

//startClock();
  function displayTime(){
    const clock = document.querySelector('span.clock');
    let minutes = Math.floor(time/60);
    let seconds = time % 60;

    if(seconds < 10){
      clock.innerHTML =`${minutes}:0${seconds}`;
    } else {
      clock.innerHTML =`${minutes}:${seconds}`;
    }
  }

//displayTime();

function stopClock() {
  clearInterval(clockId);
}

function toggleCard(clickTarget) {
  clickTarget.classList.toggle('show');
  clickTarget.classList.toggle('open');
}

cards.forEach(function(card,index,array){
  card.className = "card";
  card.firstElementChild.className = newCard[index];
  card.addEventListener('click',function(){
    console.log(openCards.length);
    const clickTarget = event.target;
    let isClickValid = true;

    if(isClickValid){
      if(clockOff){
        startClock();
        clockOff = false;
      }
    }
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
        if(matchCard.length===16){
          stopClock();
          toggleModal();
          writeModalData();
        }
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
    matchCard.push(openCards[0]);
    matchCard.push(openCards[1]);
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

document.querySelector('.restart').addEventListener('click',resetGame);

document.querySelector('.modal_replay').addEventListener('click',resetGame);

document.querySelector('.modal_cancel').addEventListener('click', () => {
  toggleModal();
});

document.querySelector('.modal_replay').addEventListener('click', () => {
  console.log('replay');
  replayGame();
});

function resetGame(){
  removeAllStar();
  resetClockAndTime();
  resetMoves();
  //resetStars();
  cards.forEach(function(card,index,array){
    card.className = "card";
    card.firstElementChild.className = newCard[index];

  })
  shuffle(shuffleCards);
  resetCards();

}

function resetCards(){
  const cards = document.querySelectorAll('.deck li');
  for (let card of cards) {
    card.className = 'card';
  }
}

function resetClockAndTime(){
  stopClock();
  clockOff = true;
  time =0;
  displayTime();
}

function resetMoves(){
  moves =0;
  document.querySelector('.moves').innerHTML=moves;
}

function resetStars(){
  stars =0;
  const starList = document.querySelectorAll('.stars li');
  for (star of starList){
    star.style.display = 'inline';
  }
}

function gameOver(){
  ++matched;
  if(matchCard === TOTAL_PAIRS){
    stopClock();
    toggleModal();
    writeModalData();
   }
}

function replayGame(){
  resetGame();
  toggleModal();
}

function toggleModal(){
  const modal = document.querySelector('.modal_background');
  modal.classList.toggle('hide');
}

toggleModal(); //open modal
toggleModal(); //close modal
function writeModalData() {
  const timeData = document.querySelector('.modal_time');
  const clockTime = document.querySelector('.clock').innerHTML;
  const movesData = document.querySelector('.modal_moves');
  const starsData = document.querySelector('.modal_stars');
  const stars = getStars();

  timeData.innerHTML = `Time = ${clockTime}`;
  movesData.innerHTML = `Moves = ${moves}`;
  starsData.innerHTML = `Stars = ${stars}`;
}

function getStars() {
  stars = document.querySelectorAll('.stars li');
  starCount = 0;
  for(star of stars) {
    if(star.style.display !=='none'){
      starCount++;
    }
  }
  console.log(starCount); //2
  return starCount;
}

shuffle(shuffleCards);



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
