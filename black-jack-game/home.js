
// challenge 1 : cat generator

function photo1(yourchoice){
	
	var choiceid =yourchoice.id;
	
	var image =document.createElement("img");
	var div =document.getElementById('imagediv');


	if(choiceid=="hello"){
	image.src="https://cdn2.thecatapi.com/images/af0.gif";
	image.width="200";
	image.height="200";
    }
	else if(choiceid=="hii"){
	image.src="https://cdn2.thecatapi.com/images/iyFN2mF8l.jpg";
	image.width="200";
	image.height="200";
    }
	else if(choiceid=="hey"){
	image.src="https://cdn2.thecatapi.com/images/-Odoy0Ftv.jpg";
	image.width="200";
	image.height="200";
    }
    else if(choiceid=="hola"){
	image.src="https://cdn2.thecatapi.com/images/3qe.jpg";
	image.width="200";
	image.height="200";
    }

	div.appendChild(image);
}

// challenge 2 : stone paper scissors



function rpsGame(yourChoice){

hitSound.play();
var humanChoice, botChoice;
humanChoice=yourChoice.id;
console.log(humanChoice);
botChoice= numberToChoice(randToRpsInt());
console.log(botChoice);
results=decideWinner(humanChoice, botChoice);
console.log(results);
message= finalMessage(results);
console.log(message);
rpsFrontEnd(yourChoice.id, botChoice, message);
} 

function randToRpsInt(){
	return Math.floor(Math.random()*3);

}

function numberToChoice(number){
	return ["rock","paper","scissors"][number];
}

function decideWinner(yourChoice, computerChoice){

	var rpsDatabase={
		'rock':{'scissors':1, 'rock':0.5, 'paper':0},
		'paper':{'scissors':0, 'rock':1, 'paper':0.5},
		'scissors':{'scissors':0.5, 'rock':0, 'paper':1}
	}

	var yourScore=rpsDatabase[yourChoice][computerChoice];
	var computerScore=rpsDatabase[computerChoice][yourChoice];

return[yourScore,computerScore];
}

function finalMessage([yourScore,computerScore]){
	if(yourScore === 0){
		lossSound.play();
		return{'message': 'YOU LOST !!!', 'color':'red'};
	}	
    else if(yourScore === 0.5){
    	return {'message': 'YOU TIED !!!', 'color':'yellow'};

    }
    else{
        winSound.play();
    	return {'message': 'YOU WON !!!', 'color':'#39ff14'};

    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
 	var imageDatabase={
 		'rock':document.getElementById('rock').src,
 		'paper':document.getElementById('paper').src,
 		'scissors':document.getElementById('scissors').src,

 	};
 	document.getElementById('rock').remove();
 	document.getElementById('paper').remove();
 	document.getElementById('scissors').remove();


 	var humanDiv=document.createElement('div');
 	var botDiv=document.createElement('div');
 	var messageDiv=document.createElement('div');



 	humanDiv.innerHTML="<img src='"+ imageDatabase[humanImageChoice]+"' height=300 width=300 style='box-shadow: -26px 25px 101px 18px rgba(255,255,255,1);'>"   
    messageDiv.innerHTML="<h1 style='color:" + finalMessage['color']+ "; font-size: 60px:  padding: 20px '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML="<img src='"+ imageDatabase[botImageChoice]+"' height=300 width=300 style='box-shadow: 0px 10px 50px rgba(243,38,24,1);'>" 
 

    
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);

}

   


// Challenge 3 : BlackJack Game




var blackjackGame = {
	'you': {'scoreSpan':'#your-blackjack-result','div':'#your-box', 'score':0},
	'dealer': {'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box', 'score':0},
	'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand': false,
    'turnsOver': false,
};

console.log(blackjackGame);

var YOU = blackjackGame['you']
var DEALER = blackjackGame['dealer']


var hitSound = new Audio('blackjack_assets/sounds/swish.m4a');
var winSound =new Audio('blackjack_assets/sounds/cash.mp3');
var lossSound =new Audio('blackjack_assets/sounds/aww.mp3'); 
  


document.querySelector('#blackjack-hit-button').addEventListener('click' , blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click' , dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click' , blackjackDeal);
 


function blackjackHit(){
  if (blackjackGame['isStand']=== false) {
 	  let card=randomCard(); 
	  showCard(card,YOU);
	  updateScore(card, YOU); 
	  showScore(YOU);
  }

}

function randomCard(){
 	let randomIndex=Math.floor(Math.random()*13);
 	return blackjackGame['cards'][randomIndex];
}

function showCard(card,activePlayer) {
   if (activePlayer['score']<=21) {
     let cardImage = document.createElement('img');
 	 cardImage.src=`blackjack_assets/images/${card}.png`;
 	 document.querySelector(activePlayer['div']).appendChild(cardImage);
 	 hitSound.play();
   }
}

function blackjackDeal(){
    
    //  showResult(computeWinner());
  
    if(blackjackGame['turnsOver']===true){

    	blackjackGame['isStand']=false;



    let yourImages=document.querySelector('#your-box').querySelectorAll('img');  
    let dealerImages=document.querySelector('#dealer-box').querySelectorAll('img');       
        for (i=0; i<yourImages.length;i++)
          {
 	          yourImages[i].remove();
          }
        for (i=0; i<dealerImages.length;i++)
          {
 	          dealerImages[i].remove();
          }
        YOU['score'] =0;
        DEALER['score'] =0;

        document.querySelector('#your-blackjack-result').textContent =0;
        document.querySelector('#your-blackjack-result').style.color ='white';
        document.querySelector('#dealer-blackjack-result').textContent =0;
        document.querySelector('#dealer-blackjack-result').style.color ='white';
        document.querySelector('#blackjack-result').textContent ="Let's Play Again";
        document.querySelector('#blackjack-result').style.color ='black';
    
     blackjackGame['turnsOver']=true;
    }
}


function updateScore(card, activePlayer){
   if (card ==='A') {
   // if adding 11 keeps me below 21, and 11 otherwise, and 1 
       if (activePlayer['score'] + blackjackGame['cardsMap'][card][1]<=21) {
   	    activePlayer['score'] += blackjackGame['cardsMap'][card][1];
       } 
       else {
	      activePlayer['score'] += blackjackGame['cardsMap'][card][0];
       }

    }else{
 	   activePlayer['score'] += blackjackGame['cardsMap'][card];
     }
}

function showScore(activePlayer){
   if (activePlayer['score'] > 21) {
   	   document.querySelector(activePlayer['scoreSpan']).textContent ='BUST!!!';
   	   document.querySelector(activePlayer['scoreSpan']).style.color ='red';
   }else{
  	   document.querySelector(activePlayer['scoreSpan']).textContent =activePlayer['score'];
    }
}

function sleep(ms){
 
 return new Promise(resolve=>setTimeout(resolve, ms));
}

async function dealerLogic(){

	blackjackGame['isStand'] = true;

	while(DEALER['score']< 16 && blackjackGame['isStand']==true){
		let card = randomCard(); 
		showCard(card,DEALER);
		updateScore(card, DEALER); 
		showScore(DEALER);
		await sleep(1000);
	}


		blackjackGame['turnsOver']=true;
		//blackjackGame['isStand'] = false;
		let winner=computeWinner();
		showResult(winner);
	

}

// compute winner and return who just won
// update the wins, draws, and losses
function computeWinner(){

	let winner;

	if (YOU['score']<=21){
		// condition : higher score than dealer or when dealer busts but you're 21 or under
		if (YOU['score']>DEALER['score'] || (DEALER['score']>21)){
			blackjackGame['wins']++;
			winner=YOU;

		}else if(YOU['score']<DEALER['score']){
			blackjackGame['losses']++;
		    winner=DEALER;
         
		}else if(YOU['score'] === DEALER['score']){
			blackjackGame['draws']++;
			//drew condition  
            console.log('draw');
		}
	}
	// condition : when user busts but dealer doesn't
		
	else if(YOU['score']>21 && DEALER['score']<=21){
		    blackjackGame['losses']++;
		    winner=DEALER;
	}
    
    // condition : when you and the dealer both busts
    else if (YOU['score']>21 && DEALER['score']>21){
    	     blackjackGame['draws']++;
             //drew condition
             console.log('draw');
    }
    
 console.log(winner);
 
  return winner;
  
	
}

function showResult(winner){
  let message,messageColor;

  if(blackjackGame['turnsOver']===true){

	  if(winner===YOU) {
	  	document.querySelector('#wins').textContent=blackjackGame['wins'];
		message='You Won!';
		messageColor ='#39ff14';
		winSound.play();
	   }

	  else if(winner=== DEALER){ 
	  	document.querySelector('#losses').textContent=blackjackGame['losses'];
	  	message='You Lost!';
	  	messageColor='red';
	  	lossSound.play();
	  }
	  else{
	  	document.querySelector('#draws').textContent=blackjackGame['draws'];
	  	message='You Drew!';
	  	messageColor='black';
	  }
	  document.querySelector('#blackjack-result').textContent=message;
	  document.querySelector('#blackjack-result').style.color=messageColor;

     }
}

