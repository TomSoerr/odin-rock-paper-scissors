const body = document.querySelector('body');

function createDivElement(className, text, id = '') {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    div.className = className;
    div.id = id;
    return div;
}

// move the container to the left and delete it
function deleteAnimation(current, next, optional = '') {
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
        (optional) ? next(optional) : next();
    }, 500);
}

function ifNot() {
    window.open("https://github.com/TomSoerr/odin-rock-paper-scissors","_self")
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
    document.querySelector('.container-buttons').addEventListener('mouseup', (event) => {
        if (event.target.classList.contains('btn-green')) {
            event.stopPropagation();
            deleteAnimation(containerWantToPlay, showRules);
        } else if (event.target.classList.contains('btn-red')) {
            event.stopPropagation();
            deleteAnimation(containerWantToPlay, ifNot);
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
    
    document.querySelector('.button.btn-green').addEventListener('mouseup', (event) => {
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
    const roundPlayer = document.querySelector('#round-player');
    const roundComputer = document.querySelector('#round-computer');

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
            document.querySelector(`#player-${playerCounter}`).classList.add('green');
        } else if (value === false) {
            computerCounter++;
            document.querySelector(`#computer-${computerCounter}`).classList.add('red');
        } 
        if (playerCounter === 5 || computerCounter === 5) {
            if (playerCounter > computerCounter) {
                deleteAnimation(containerGame, askToPlayAgain, 'You won!');
            } else if (computerCounter > playerCounter) {
                deleteAnimation(containerGame, askToPlayAgain, 'You lost!');
            } 

        }
    }

    function playRound(playerSelection, computerSelection) {
        roundPlayer.textContent = firstLetterUp(playerSelection);
        roundPlayer.animate([
            { transform: 'scale(1.1)', opacity: '0' },
            { transform: 'scale(1.3)' },
            { transform: 'scale(1)' }
            ], {
            duration: 500,
            easing: 'ease-out'
            });
        roundComputer.textContent = firstLetterUp(computerSelection);
        roundComputer.animate([
            { transform: 'scale(1.1)', opacity: '0' },
            { transform: 'scale(1.3)' },
            { transform: 'scale(1)'}
            ], {
            duration: 500,
            easing: 'ease-out'
            });

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
                event.stopPropagation();
                updateCounterAndCheckWinner(playRound('rock', computerPlay()));
                event.stopPropagation();
                break;
            case 'paper':
                updateCounterAndCheckWinner(playRound('paper', computerPlay()));
                event.stopPropagation();
                break;
            case 'scissors':
                updateCounterAndCheckWinner(playRound('scissors', computerPlay()));
                break;
        }
    }

    containerSelectItems.addEventListener('mouseup', itemChoice);
}

function askToPlayAgain(message) {
    const containerWantToPlay = createDivElement('container-popup', '');
    containerWantToPlay.appendChild(createDivElement('', message));
    containerWantToPlay.appendChild(createDivElement('', 'Want to play again?'));

    const containerButtons = createDivElement('container-buttons', '');
    containerButtons.appendChild(createDivElement('button btn-green', 'Yes'));
    containerButtons.appendChild(createDivElement('button btn-red', 'No'));
    containerWantToPlay.appendChild(containerButtons);

    body.appendChild(containerWantToPlay);

    // add event listeners to the Yes and No buttons
    document.querySelector('.container-buttons').addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-green')) {
            event.stopPropagation();
            deleteAnimation(containerWantToPlay, game);
        } else if (event.target.classList.contains('btn-red')) {
            event.stopPropagation();
            deleteAnimation(containerWantToPlay, ifNot);
        }
    });
}


wantToPlay();