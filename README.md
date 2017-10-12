# Memory Game Project

## Table of Contents

* [Rules](#rules)
* [Dependencies](#dependencies)

## Rules

Upon loading the game, a 4x4 grid of cards will appear, and the clock will start.
The player's objective is to find every matching pair of cards. Clicking on a card
will flip it over to reveal its image. Once two cards are flipped over, they will
be compared. If their images are identical, the matched pair will remain
facing up; if they differ, the cards will be flipped to face down again. Once all
matches are found, the player will be presented with a game report card and a prompt
to either play again or return to the completed game's screen.

The player's performance is not evaluated by the time taken to win (though this
may be considered an added challenge), but rather by the number of moves (defined
as an attempted match of two cards) taken per the following ranking system:

8-14  moves  = 3 stars    'excellent!'
15-29 moves  = 2 stars    'good'
30-44 moves  = 1 star     'okay...'
45-?  moves  = 0 stars    'quite bad, really'

## Dependencies
The game is executed via 'index.html'. This file relies on 'css/app.css' and
'js/app.js' for the game's styling and functionality, respectively. It also
uses two external Web-based pre-fetch stylesheets (https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css and https://fonts.googleapis.com/css?family=Coda), and the jQuery library at https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js.
