let doc = document;
let start = doc.querySelector('#start');
let game = doc.querySelector('#game');
let time = doc.querySelector('#time');
let result = doc.querySelector('#result');
let timeHeader = doc.querySelector('#time-header');
let resultHeader = doc.querySelector('#result-header');
let gameTime = doc.querySelector('#game-time');
let app = doc.querySelector('#app');

let score = 0;
let isGameStarted = false;

start.addEventListener('click', startGame);
game.addEventListener('click', handleBoxClick);
gameTime.addEventListener('input', setGameTime);

function show(el) {
    el.classList.remove('hide');
}

function hide(el) {
    el.classList.add('hide');
}


function startGame () {
    score = 0;
    isGameStarted = true;
    setGameTime();
    hide(start);
    gameTime.setAttribute('disabled', 'true');
    game.style.background = "#fff";
    app.style.background = "#ccc";

   
    let interval = setInterval(function(){
        let _time = parseFloat(time.textContent)

        if(_time <=0) {
            clearInterval(interval);
            endGame();
        }else {
            time.textContent = (_time - 0.1).toFixed(1);
        }
            },100);

    renderBox();
} 

function endGame() {
    isGameStarted = false;
    setGameScore();
    show(start);
    hide(timeHeader);
    show(resultHeader);
    gameTime.removeAttribute('disabled');
    game.style.background = "#ccc";
    app.style.background = "#fff";
    game.innerHTML = '';
  
}

function setGameScore() {
    result.textContent = score.toString();    
}

function setGameTime() {
    show(timeHeader);
    hide(resultHeader);
    let _time = +gameTime.value;
    time.textContent = _time.toFixed(1) ;
}

function handleBoxClick(event) {
    if(!isGameStarted){
        return;
    }

    if(event.target.dataset.box){
        score ++;
        renderBox();
    }
}

function renderBox() {
    game.innerHTML = '';

    let box = doc.createElement('div');
    let boxSize =  getRandom(25, 100); // размер квадратиков
    let gameSize = game.getBoundingClientRect()
    let maxTop = gameSize.height - boxSize;
    let maxLeft = gameSize.width - boxSize;
    let rc = getRandom(0, 230);
    let gc = getRandom(0, 230);
    let bc = getRandom(0, 230);
    box.style.height = box.style.width = boxSize + 'px';
    box.style.position = 'absolute';
    box.style.backgroundColor =  'rgb(' + rc + ',' + gc + ',' + bc + ')';

    box.style.top = getRandom(0, maxTop) + 'px';
    box.style.left = getRandom(0, maxLeft) + 'px';
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', 'true');
    

    game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
