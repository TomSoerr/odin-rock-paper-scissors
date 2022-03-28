const body = document.querySelector('body');

function createDivElement(className, text, id = '') {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    div.className = className;
    div.id = id;
    return div;
}

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
    const containerWantToPlay = createDivElement('container-popup', '');
    containerWantToPlay.appendChild(createDivElement('', 'Want to play some Rock, Paper, Scissors?'));

    const containerButtons = createDivElement('container-buttons', '');
    containerButtons.appendChild(createDivElement('button btn-green', 'Yes'));
    containerButtons.appendChild(createDivElement('button btn-red', 'No'));
    containerWantToPlay.appendChild(containerButtons);

    body.appendChild(containerWantToPlay);

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
    console.log('game');
    const containerPlayers = createDivElement('container-players', '');
    containerPlayers.appendChild(createDivElement('', 'Player', 'player'));
    containerPlayers.appendChild(createDivElement('', 'Computer', 'computer'));

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
    containerGame.appendChild(containerCounter);
    containerGame.appendChild(containerSelectItems);

    body.appendChild(containerGame);

    document.querySelector('#player-2').classList.add('red');

}
game();


