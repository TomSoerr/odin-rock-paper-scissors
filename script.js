let computerCounter;
let playerCounter;
let roundCounter;

const computerCounterSpan = document.querySelector('#computer-counter');
const playerCounterSpan = document.querySelector('#player-counter');
const containerEndResult = document.querySelector('#container-end-result');
const containerBtn = document.querySelector('#container-btn');


function computerPlay() {
    return ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)]
}

function firstLetterUp(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase()
}

function addElementWithText(text) {
    const newElement = document.createElement('p');
    const newNode = document.createTextNode(`${text}`);
    newElement.appendChild(newNode);
    containerEndResult.appendChild(newElement);
}

function deleteAllChilds() {
    while (containerEndResult.firstChild) {
        containerEndResult.removeChild(containerEndResult.lastChild);
    }
}


function game() {
    roundCounter = 0;
    playerCounter = 0;
    computerCounter = 0;

    document.querySelector('#computer-counter').textContent = computerCounter;
    document.querySelector('#player-counter').textContent = playerCounter;

    deleteAllChilds();
    addElementWithText('Let\'s play Rock, Paper, Scissors!');
    addElementWithText('Press one of the buttons to start the game!');

    containerBtn.addEventListener('click', submitChoice);
}

function submitChoice(event) {
    switch (event.target.id) {
        case 'rock':
            updateCounterAndCheckWinner(playRound('rock', computerPlay()));
            break;
        case 'paper':
            updateCounterAndCheckWinner(playRound('paper', computerPlay()));
            break;
        case 'scissors':
            updateCounterAndCheckWinner(playRound('scissors', computerPlay()));
            break;
    }
    event.stopPropagation();
}

function playRound(playerSelection, computerSelection) {
    switch (true) {
        case playerSelection === computerSelection:
            deleteAllChilds();
            addElementWithText(`It's a draw! You both chose ${firstLetterUp(playerSelection)}`);
            return null;

        case playerSelection === 'rock' && computerSelection === 'paper':
        case playerSelection === 'paper' && computerSelection === 'scissors':
        case playerSelection === 'scissors' && computerSelection === 'rock':
            deleteAllChilds();
            addElementWithText('You lost!');
            addElementWithText(`You chose ${firstLetterUp(playerSelection)}, 
                    computer chose ${firstLetterUp(computerSelection)}`);
            return false;

        case playerSelection === 'rock' && computerSelection === 'scissors':
        case playerSelection === 'paper' && computerSelection === 'rock':
        case playerSelection === 'scissors' && computerSelection === 'paper':
            deleteAllChilds();
            addElementWithText('You won!');
            addElementWithText(`You chose ${firstLetterUp(playerSelection)},
                    computer chose ${firstLetterUp(computerSelection)}`);
            return true;
    }  
}

function updateCounterAndCheckWinner(value) {
    if (value === true) {
        playerCounter++;
        playerCounterSpan.textContent = playerCounter;
    } else if (value === false) {
        computerCounter++;
        computerCounterSpan.textContent = computerCounter;
    } else {
        return;
    }
    if (playerCounter === 5 || computerCounter === 5) {
        containerBtn.removeEventListener('click', submitChoice);
        deleteAllChilds();
        if (playerCounter > computerCounter) {
            addElementWithText('You are the Winner!');
        } else if (computerCounter > playerCounter) {
            addElementWithText('The Computer is the Winner!');
        } 
        
        addElementWithText('Press r/R to restart the game!');

        document.addEventListener('keydown', event => {
            switch (event.key) {
                case 'r':
                case 'R':
                    game();
                    break;
            }
        }
        );
    }
}

game();