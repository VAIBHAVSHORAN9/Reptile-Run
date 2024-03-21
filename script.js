// Game Constants
const hiScoreBox = document.querySelector("#hiScoreBox");
const scoreBox = document.querySelector("#scoreBox");

let inputDir = {x:0, y:0};
const foodSound = new Audio('../music/food.mp3');
const gameOverSound = new Audio('../music/gameover.mp3');
const moveSound = new Audio('../music/move.mp3');
const musicSound = new Audio('../music/music.mp3');

let speed = 15;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y:15}
]
let food = { x: 6, y: 7 };

// Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed) return;

    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    // If snake bump into itself
    for(let i=1; i<snakeArr.length; i++){
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y) return true;
    }
        
    // If snake bump into the wall
    if (snake[0].x <= 1 || snake[0].x >= 18 || snake[0].y <= 1 || snake[0].y >= 18) return true;
}

function gameEngine(){
    // Part 1: Updating the snake array and food
    // Check collide
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0, y:0};
        alert("Game Over. Press Enter to play again!!!");
        snakeArr = [{x:13, y:15}];
        musicSound.play();
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
    }

    // If you have eaten the food, increment the score and reGenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        scoreBox.innerHTML = "Score: " + score;

        snakeArr.unshift({x: snakeArr[0].x + inputDir.x,  y: snakeArr[0].y + inputDir.y});

        // Just to keep my game easy to play, keeping the range between 2 to 16
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random())  }
    }

    // Moving the snake
    for(let i = snakeArr.length - 2; i >= 0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0) snakeElement.classList.add('head');
        else snakeElement.classList.add('snakeBody');

        board.appendChild(snakeElement);
    });

    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Main logic starts here

window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
    moveSound.play();

    switch(e.key){
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});