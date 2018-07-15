//this is my Card class, I call this in a for loop to create all 16 cards
var Card = function(index) {
	//this is a pool of eight symbols
	const symbols = ['&diams;','&hearts;', '&clubs;', '&spades;', '&#9858;', '&#9859;', '&#9857;', '&#9856;'];
	while (true){
    			var randomIndex = Math.floor(Math.random() * 8);
    			if (pickedSymbols[randomIndex] >= 2) {
    				continue;
    			}
    			else {
    				this.symbol = symbols[randomIndex];
    				pickedSymbols[randomIndex]++;
    				break;
    			}
    };
};
//This method is for fliping a card
Card.prototype.flip = function(index){
	$('#' + index).toggleClass('card-flip')
	}
//this method will check if 1 or 2 cards are up and if so are they the same
Card.prototype.check = function(index, symbol){
	if (cardsUp == 0){
		currentIndex = index;
		currentSymbol = symbol;
		cardsUp++;
	}
	else if (cardsUp == 1){
		cardsUp++
		if (symbol == currentSymbol){
			matched++;
			cardsUp = 0;
		}
		else if (symbol != currentSymbol){
			setTimeout(function(){
				cards[currentIndex].flip(currentIndex)
				cards[index].flip(index);
				cardsUp = 0;
			}, 1000);
		}
		moves++
		$('.moves').html(moves);
	};
}

//all my global varibles
var pickedSymbols = [0,0,0,0,0,0,0,0];
var currentSymbol = '';
var currentIndex = 0;
var cardsUp = 0;
var matched = 0;
var moves = 0;
var cards = [];
var now = 0;

//this will run when the page is loaded!!!!
$( document ).ready(function() {
	//newGame() creates a new game, runs at when the document is loaded and everytime the refresh bttn is pressed.
	var newGame = function() {
		pickedSymbols = [0,0,0,0,0,0,0,0];
		flipedCardSymbol = '';
		cardsUp = 0;
		indexOfCardFlipped = 0;
        matched = 0;
        moves = 0;
        now = new Date().getTime();
	    for (i = 0; i != 16; i++) { 
		cards[i] = new Card(i);
		$('#gamefield').append('<div id="card-container" class="card-container"><div class="card" id="'+ i +'"><div class="card-front"><span class="card-content">&#10068;</span></div><div class="card-back"><span class="card-content">' + cards[i].symbol +'</span></div></div></div>');

	}

	//when a card is clicked, do this
	$('.card-front').click(function(){
		if (cardsUp <= 1){
			var index = $(this).parent().attr('id');
			cards[index].flip(index);
			cards[index].check(index, cards[index].symbol)
			updateScoreBoard();
		}
		})
	//this is for the timer.
	var x = setInterval(function() {
		  var distance = new Date().getTime() - now;
		  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		  $("#timer").html(minutes + "m " + seconds + "s ");
		  if (matched == 8) {
				console.log('test')
			  	var finalTime = $('#timer').html()
			  	$("#time").html(finalTime);
			  	$("#timer").html(finalTime);
			  	clearTimeout(x);
	      }
	}, 1000);

	}
	//updates the scoreboard either after cards are checked or on refresh
	var updateScoreBoard = function(){
		$('#matches').html(matched);
		$('.moves').html(moves);
		if (moves == 0) {
			$('.level1').html('&#9733;')
			$('.level2').html('&#9733;')
			$('.level3').html('&#9733;')
		}
		else if (moves > 6) {$('.level2').html('&#9734;')}
		else if (moves > 0) {$('.level3').html('&#9734;')}
		if (matched == 8) {
			$('.modal').css("display", "block");
			$('#moves').html(moves)
		}
}

	newGame();

	//refresh page when a refresh button is clicked
	$('.refresh').click(function(){
		$('#gamefield').empty();
		$('#matches').html(matched)
		$('.modal').css("display", "none");
		newGame();
		moves = 0;
		updateScoreBoard();
	})

}); 