/*
 * Create a list that holds all of your cards
 */
const cards = $('.deck').children();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
shuffle(cards);
const shuffledCards = [...cards];

for(var i=0; i<cards.length; i++) {
  $('.card-'+i).after(shuffledCards[i]);
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
 let chosen = [];

 function showCard(cardToShow) {
   cardToShow.addClass('show');
 }

 function addOpen(chosenCard) {
   chosen.push(chosenCard);
 }

 function setMatch() {
   $(chosen[0]).addClass('match');
   $(chosen[1]).addClass('match');
   chosen.pop();
   chosen.pop();
 }

 function noMatch() {
   $(chosen[0]).removeClass('show');
   $(chosen[1]).removeClass('show');
   chosen.pop();
   chosen.pop();
 }

 $('.card').click(function() {
   showCard($(this));

   if(chosen.length == 0 || chosen.length == 1) {
     addOpen($(this));
   }

   if(chosen.length == 2) {
     if(chosen[0] == chosen[1]) {
       setMatch();
     } else {
       noMatch();
     }
   }

 });
