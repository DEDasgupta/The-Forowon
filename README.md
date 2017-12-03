# The Forowon Clue-Less

This is Team Forowon version of clue-less ( basic networking skeleton)

We are using the Isogenic game engine: http://www.isogenicengine.com/
please follow their tutorials and look at the examples in the engine to learn how to use it.

## Setup Instructions

Install nodeJS and npm (make sure npm is accessible by command line)

Navigate to ige/server. Then do "npm install"

Go back to root directory in the command line/terminal:

run the command "npm install"

run start-game-server.sh

run start-web-server.sh

############################## Demo Scenario + Instructions: 

Use Firefox for this since it seems to be the only one that works perfectly.


## Startup Instructions

Open the Firefox at http://localhost:8080/

The pop-up window will display to enter the character name. There's lit of available characters from the server

The character name can be short or full. For example: "Miss Scarlet" or "Scarlet" are both acceptable

You need to open at least 3 more windows to register for 3 more players - Choose Plum, Peacock and White

After that, the game will auto start for 4 people. 

For the demo purpose, we want all players are connected. So keep open more windows and register until we get all 6 players.

The notification is 2 kinds: popup dialog for important and red sentence on the very top of the windows for action
On the upper left corner is the player character
All the buttons and dropdown menu are straight forward
The lower left corner is the player hand card

For demo purpose, the CASE FILE is printed out in the terminal of the game server. This will be helpful for demo accusation

## Player Turn + Rountable

The player's seat are defined as below:
Miss Scarlet
Professor Plum
Mrs. Peacock
Mr. Green
Mrs. White
Col. Mustard

The player turn order will follow the above list and start from Scarlet. It will skip the inactive and wrong-accusation one.

The player position on the rountable will be the same and going counter clockwise. For such: Plum is on the left of Scarlet, Peacock is on the left of Plum and go on. This order will be used for proving suggestion.

## Player Move

Scarlet should be the one get the first turn

Player can only move once per turn - see the project description for more info

This should be straight forward: you can move anywhere in the grid, and can't move to the hall that already had player in it

Note: for demo purpose: 
 - make the invalid move first, then press "Right" to move the player to right, then press move again to prove that people can't move anymore after they already did.
 - Navigate to other windows of other players to see the player position is updated.
 - press end turn

## Player Suggestion
Make the suggestion by choosing from the dropdown menu.

The room must be the current room where the player is in. So that the room dropdown is not accountable in this case

Note: for demo purpose: look to the left player (see the list from #Player Order)
 - Make a suggestion that has only one card on his/her hand. This will be automatic disprove since the player has only one card
 - Make the suggestion again, the popup window will display that you already made suggestion
 - Make a suggestion that has 2 of his/her card on hand. This will be manual proving. A dialog will popup in that player to ask for the card selection to show. Typing one of them in the popup window and hit ok
 - Make a suggestion that match the CASE FILE and see the auto disprove that no one has those cards
 
 ## Player Turn
 Press "end turn" button to see the player turn is change
 
 Press any button to see popup window display "It's not your turn"
 
 ## Next Player
 The turn is changed to the next player
 
 MOVING: 
 - Scarlet already in the right corner, try to move other people to the other closet corner. We want to try out the secret passage later
 
 SUGGESTION
 Note: for demo purpose: look to the left player (see the list from #Player Order)

 - Make a suggestion that has 2 of his/her card on hand. This will be manual proving. A dialog will popup in that player to ask for the card selection to show. Typing one of them in the popup window and hit ok
 
 - Press end turn
 
  ## Next Player
 The turn is changed to the next player
 
 MOVING: 
 - Same here, try to move player to different corner
 
 SUGGESTION
 Note: for demo purpose: look to the left player (see the list from #Player Order)

 - Make a suggestion that has 2 of his/her card on hand. This will be manual proving. A dialog will popup in that player to ask for the card selection to show. Typing one of them in the popup window and hit ok
 
 - Press end turn
 
   ## Next Player
 The turn is changed to the next player
 
 MOVING: 
 - Same here, try to move player to different corner
 
 SUGGESTION
 Note: for demo purpose: look to the left player (see the list from #Player Order)
 - Make a suggestion that match the CASE FILE and see the auto disprove that no one has those cards
 
 ## Scarlet turn - the turn should go back to Scarlet
 Moving:
 From now one, press "center" button to try the secrect passages
 
 ## Player Accusation
 Make the wrong accusation that does not match CASE FILE. This will give popup window and auto change player turn
 
 press end turn
 
 # Next Player
 - Keep press "center" button to try the secrect passages
 - press end turn
 Repeat the whole process until loop back again
 
 # Scarlet is skipped
 Since Scarlet make the wrong accusation, she is not allow to move any more.
 
 # Connect more people
 - Open 2 more windows and connect the rest of players
 - Move player to hall way that block the other player
 - Keep pressing the "end turn" to see the turn is changed
 
 # Quiting
 Close one of the windows, the popup message is displayed all player indicating the player is left
 
 # Win the game
 Make the accusation that match the CASE FILE

