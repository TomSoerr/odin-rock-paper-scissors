// computer picks random item
function computerPlay() {
    return ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)]
}

// make the first letter uppercase and the rest lowercase independent of the input
function firstLetterUp(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase()
}

// check which player win's or if it's undecided
// return a message with the winner
function playRound(playerSelection, computerSelection) {
    switch (true) {
        case playerSelection === computerSelection:
            return [null, `Nobody Win\'s this Round. ${firstLetterUp(computerSelection)} and ${firstLetterUp(playerSelection)}`];
        case playerSelection === 'rock' && computerSelection === 'paper':
        case playerSelection === 'paper' && computerSelection === 'scissors':
        case playerSelection === 'scissors' && computerSelection === 'rock':
            return [false, `You Lose this Round! ${firstLetterUp(computerSelection)} beats ${firstLetterUp(playerSelection)}`];
        case playerSelection === 'rock' && computerSelection === 'scissors':
        case playerSelection === 'paper' && computerSelection === 'rock':
        case playerSelection === 'scissors' && computerSelection === 'paper':
            return [true, `You Win this Round! ${firstLetterUp(playerSelection)} beats ${firstLetterUp(computerSelection)}`];
        default:
            console.error('Something went wrong in the playRound function');
    }  
}

// call for user input and call computerPlay()
// iterate 5 times means 5 rounds
function game() {
    let computerCounter = 0;
    let playerCounter = 0;

    // group the rounds together
    console.group('Rounds');
    for (let x = 0; x < 5; x++) {
        const result = playRound(prompt(`Rock Pager Scissors\r\nRound: ${x + 1}`).toLowerCase(), computerPlay());
        console.log(result[1]);
        if (result[0] === null) {
            continue;
        } else if (result[0]) {
            playerCounter++;
        } else if (!(result[0])) {
            computerCounter++;
        } else {
            console.error('Something went wrong in the game function\'s for loop')
        }
    }
    console.groupEnd('Rounds')

    // announce the winner of the 5 rounds
    if (playerCounter > computerCounter) {
        console.log(`You are the Winner! ${playerCounter} > ${computerCounter}`)
    } else if (computerCounter > playerCounter) {
        console.log(`You are the Looser! ${playerCounter} < ${computerCounter}`)
    } else if (playerCounter === computerCounter) {
        console.log(`Nobody is the Winner! ${playerCounter} = ${computerCounter}`)
    } else {
        console.error('Something went wrong in the game function')
    }

}

// call the game function and start the game something
game();