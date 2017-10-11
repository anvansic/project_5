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
 let clickDisabled = false;
 let movesCount = 1;

 function showCard(cardToShow) {
   cardToShow.addClass('show');
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
   clickDisabled = false;
 }

 function noMatch() {
   $(chosen[0]).removeClass('show');
   $(chosen[1]).removeClass('show');
   chosen.pop();
   chosen.pop();
   clickDisabled = false;
 }

 function setMovesCount() {
   $('.moves').text(movesCount++);
 }

//When a card is clicked, the following will occur
 $('.card').click(function() {
   //This prevents the player from opening additional cards until failed matches are re-hidden.
   if(clickDisabled) {return;}

   //The card is shown, or "flipped over".
   showCard($(this));

   //The card is added to the list of open cards in the chosen[] array.
   //Note: Within the addOpen() function the card is checked to prevent the player from adding the same card to the chosen[] array, thus eliminating the risk of matching cards with themselves.
   addOpen($(this));

   //Once two cards are opened, their child elements' class values are evaluated. If they match, setMatch adds 'match' to their classes; if not, they lose their 'show' classes. In both cases, the chosen[] array is cleared.
   if(chosen.length == 2) {
     if(chosen[0].children().attr('class') == chosen[1].children().attr('class')) {
       setMatch();
     } else {
       clickDisabled = true;
       //setTimeout gives the player some time to see the values of the incorrectly matched cards before being flipped back over. Within noMatch() the clickDisabled flag is reset so that the player may start checking cards again.
       window.setTimeout(noMatch, 500);
     }
     setMovesCount();
   }

 });
