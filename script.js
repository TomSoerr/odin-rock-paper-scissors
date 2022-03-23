// computer picks random item
function computerPlay() {
    return ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)]
}

function firstLetterUp(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase()
}

function playRound(playerSelection, computerSelection) {
    // check which player win's or if it's undecided
    function checkPlayerWin(playerSelection, computerSelection) {
            switch (true) {
                case playerSelection === computerSelection:
                    return null
                case playerSelection === 'rock' && computerSelection === 'paper':
                case playerSelection === 'paper' && computerSelection === 'scissors':
                case playerSelection === 'scissors' && computerSelection === 'rock':
                    return false;
                case playerSelection === 'rock' && computerSelection === 'scissors':
                case playerSelection === 'paper' && computerSelection === 'rock':
                case playerSelection === 'scissors' && computerSelection === 'paper':
                    return true;
                default:
                    console.error('Something went wrong in the switch expression')
            }  
    }
    const playerWin = checkPlayerWin(playerSelection, computerSelection)
    // return a message with the winner
    if (playerWin === null) {
        return `Nobody Win\'s. ${firstLetterUp(computerSelection)} and ${firstLetterUp(playerSelection)}`;
    } else if (!(playerWin)){
        return `You Lose! ${firstLetterUp(computerSelection)} beats ${firstLetterUp(playerSelection)}`;
    } else if (playerWin) {
        return `You Win! ${firstLetterUp(playerSelection)} beats ${firstLetterUp(computerSelection)}`;
    }
}

function game() {
    let computerCounter = 0;
    let playerCounter = 0;
    for (let x = 0; x < 5; x++) {
        // some code
    }
}

const playerSelection = prompt('Rock, Paper or Scissors').toLowerCase();
const computerSelection = computerPlay();
console.log(playRound(playerSelection, computerSelection))