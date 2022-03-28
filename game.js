const body = document.querySelector('body');

function createDivElement(className, text, id = '') {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    div.className = className;
    div.id = id;
    return div;
}

// move the container to the left and delete it
function deleteAnimation(current, next) {
    current.animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(-130%)', opacity: '0' }
            ], {
            duration: 500,
            fill: 'forwards',
            easing: 'ease-in'
            });
    setTimeout(() => {
        current.remove();
        next();
    }, 500);
}

function wantToPlay() {
    // build the ui for the game start
    const containerWantToPlay = createDivElement('container-popup', '');
    containerWantToPlay.appendChild(createDivElement('', 'Want to play some Rock, Paper, Scissors?'));

    const containerButtons = createDivElement('container-buttons', '');
    containerButtons.appendChild(createDivElement('button btn-green', 'Yes'));
    containerButtons.appendChild(createDivElement('button btn-red', 'No'));
    containerWantToPlay.appendChild(containerButtons);

    body.appendChild(containerWantToPlay);

    // add event listeners to the Yes and No buttons
    document.querySelector('.container-buttons').addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-green')) {
            event.stopPropagation();
            deleteAnimation(containerWantToPlay, showRules);
        } else if (event.target.classList.contains('btn-red')) {
            event.stopPropagation();
            deleteBody();
            window.open("https://youtu.be/dQw4w9WgXcQ","_self")
        }
    });
}

function showRules() {
    // build the ui for the rules
    const containerShowRules = createDivElement('container-popup', '');
    containerShowRules.appendChild(createDivElement('', 'First to 5 wins!'));
    containerShowRules.appendChild(createDivElement('', 'Rock > Scissors > Paper'));
    containerShowRules.appendChild(createDivElement('button btn-green', 'Ok'));

    body.appendChild(containerShowRules);
    
    document.querySelector('.button.btn-green').addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-green')) {
            event.stopPropagation();
            deleteAnimation(containerShowRules, game);
        }
    });
}

function game() {
    // build the ui for the game
    const containerPlayers = createDivElement('container-players', '');
    containerPlayers.appendChild(createDivElement('', 'Player', 'player'));
    containerPlayers.appendChild(createDivElement('', 'Computer', 'computer'));

    const containerPlayerRound = createDivElement('container-players', '');
    containerPlayerRound.appendChild(createDivElement('', '', 'round-player'));
    containerPlayerRound.appendChild(createDivElement('', '', 'round-computer'));


    const containerCounter = createDivElement('container-counter', '');
    for (let i = 1; i < 6; i++) {
        containerCounter.appendChild(createDivElement('', '', `player-${i}`));
    }
    for (let i = 5; i > 0; i--) {
        containerCounter.appendChild(createDivElement('', '', `computer-${i}`));
    }

    const containerSelectItems = createDivElement('container-weapons', '');
    containerSelectItems.appendChild(createDivElement('weapon', 'Rock', 'rock'));
    containerSelectItems.appendChild(createDivElement('weapon', 'Paper', 'paper'));
    containerSelectItems.appendChild(createDivElement('weapon', 'Scissors', 'scissors'));

    const containerGame = createDivElement('container-game', '');
    containerGame.appendChild(containerPlayers);
    containerGame.appendChild(containerPlayerRound);
    containerGame.appendChild(containerCounter);
    containerGame.appendChild(containerSelectItems);

    body.appendChild(containerGame);

    // add the game logic
    let computerCounter = 0;
    let playerCounter = 0;

    function computerPlay() {
        return ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)]
    }

    function firstLetterUp(str) {
        return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase()
    }

    function updateCounterAndCheckWinner(value) {
        if (value === null) {
            return;
        } else if (value === true) {
            playerCounter++;
            console.log('playerCounter', playerCounter);
            document.querySelector(`#player-${playerCounter}`).classList.add('green');
        } else if (value === false) {
            computerCounter++;
            document.querySelector(`#computer-${computerCounter}`).classList.add('red');
        } 
        if (playerCounter === 5 || computerCounter === 5) {
            if (playerCounter > computerCounter) {
                console.log('Player wins!');
            } else if (computerCounter > playerCounter) {
                console.log('Computer wins!');
            } 
            deleteAnimation(containerGame, askToPlayAgain);
        }
    }

    function playRound(playerSelection, computerSelection) {
        switch (true) {    
            case playerSelection === computerSelection:
                return null;
            case playerSelection === 'rock' && computerSelection === 'paper':
            case playerSelection === 'paper' && computerSelection === 'scissors':
            case playerSelection === 'scissors' && computerSelection === 'rock':
                return false;
    
            case playerSelection === 'rock' && computerSelection === 'scissors':
            case playerSelection === 'paper' && computerSelection === 'rock':
            case playerSelection === 'scissors' && computerSelection === 'paper':
                return true;
        }  
    }

    function itemChoice(event) {
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

    containerSelectItems.addEventListener('click', itemChoice);

}

function askToPlayAgain() {
    console.log('askToPlayAgain');
}
game();




