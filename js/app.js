/*
 * Create a list that holds all of your cards
 */
const CARDS = $('.deck').children();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
shuffle(CARDS);
const SHUFFLED_CARDS = [...CARDS];

for(var i=0; i<CARDS.length; i++) {
  $('.card-'+i).after(SHUFFLED_CARDS[i]);
  $('.card-'+i).addClass('card');
}

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

//This code handles the onscreen timer. When the game is won, the timer is cleared in the announceWin() function below.
let timeInSeconds = 0;
let timerFunction = window.setInterval(setTimer, 1000);
function setTimer() {
  timeInSeconds++;
  $('.time').text(timeInSeconds);
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

 //CARD-CLICK EVENT FUNCTIONS AND GLOBALS
let chosen = [];
let clickDisabled = false;
let movesCount = 0;
let matchCount = 0;

function showCard(cardToShow) {
   cardToShow.addClass('show open');
}

function addOpen(chosenCard) {
   if(chosen[0]) {
     if(chosenCard.attr('class') == chosen[0].attr('class')) {
       return;
     }
   }
   chosen.push(chosenCard);
}

function setMatch() {
   $(chosen[0]).addClass('match');
   $(chosen[1]).addClass('match');
   chosen.pop();
   chosen.pop();
   matchCount++;
   clickDisabled = false;
}

function noMatch() {
   $(chosen[0]).removeClass('show open');
   $(chosen[1]).removeClass('show open');
   chosen.pop();
   chosen.pop();
   clickDisabled = false;
}

function setMovesCount() {
   movesCount++;
   $('.moves').text(movesCount);
   if($('.stars').children().length > 0 && movesCount % 15 == 0) {
     $('.stars').children().first().remove();
   }
}

function announceWin() {
   window.clearInterval(timerFunction);
   let starOrStars = "stars";
   if($('.stars').children().length == 1) {
     starOrStars = "star";
   }

   if(window.confirm("You won in " + movesCount + " moves and with " + timeInSeconds + " seconds on the clock. Your rank is " + $('.stars').children().length + " " + starOrStars + "! Press OK to play again, or Cancel to return to the game screen.")) {
     window.location.reload();
   }
 }

//When a card is clicked, the following will occur
$('.card').click(function() {
   //This prevents the player from opening additional cards until failed matches are re-hidden.
   if(clickDisabled) {return;}

   //The card is shown, or "flipped over".
   showCard($(this));

   //The card is added to the list of open cards in the chosen[] array. Player is prevented from trying to match a card with itself.
   addOpen($(this));

   //Check the cards. Either setMatch for successful matches, or noMatch for failed matches.
   if(chosen.length == 2) {
     if(chosen[0].children().attr('class') == chosen[1].children().attr('class')) {
       setMatch();
     } else {
       clickDisabled = true;
       //setTimeout gives the player some time to see the values of the incorrectly matched cards before being flipped back over.
       window.setTimeout(noMatch, 500);
     }
     setMovesCount();
   }

   //Once all matches are found, announceWin() is called to stop the clock and format the modal.
   if(matchCount == 8) {
     announceWin();
   }
});

$('.restart').click(function() {
  window.location.reload();
});
