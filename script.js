var game = document.getElementById('game'),
    snake = document.getElementById('snake'),
    foodSnake = document.querySelector('#food.food'),
    currentScore = document.getElementById('currentScore'),
    HighestScore = document.getElementById('HighestScore'),
    score = 0;
    lastDirection = "",
    snakeBody = [{x:1,y:1}],
    highScore  = localStorage.getItem('High-score'); 

if(highScore != null){
    HighestScore.textContent = highScore;
} 

window.addEventListener('keydown',function(e){
    if(e.key == 'ArrowUp' && lastDirection !== "ArrowDown"){
        update(0,-1);
        lastDirection ="ArrowUp";
    }
    if(e.key == 'ArrowDown' && lastDirection !=="ArrowUp"){
        update(0,1);
        lastDirection ="ArrowDown";
    }
    if(e.key == 'ArrowLeft' && lastDirection !=="ArrowRight"){
        update(-1,0);
        lastDirection ="ArrowLeft";
    }
    if(e.key == 'ArrowRight' && lastDirection !=="ArrowLeft"){
        update(1,0);
        lastDirection ="ArrowRight";
    }
});

function update(x,y){
    'use strict';
    var snakePieces = Array.from(document.querySelectorAll('.snake[data-type="piece"]')),k=0;

    for(var j = snakeBody.length -1; j > 0 ;j--){
        snakeBody[j].x = snakeBody[j-1].x;
        snakeBody[j].y = snakeBody[j-1].y;
        if(k !== snakePieces.length){
            snakePieces[k].style.gridColumn = snakeBody[j].x;
            snakePieces[k].style.gridRow = snakeBody[j].y;
            k++;
        }
    }
    snakeBody[0].x += x;
    snakeBody[0].y += y;
    snake.style.gridColumn = snakeBody[0].x;
    snake.style.gridRow = snakeBody[0].y;
    checkIfEaten();
    checkForBorders();
    checkSnake();
}

function checkIfEaten(){
    if(foodSnake.getAttribute('data-x') == snake.style.gridColumn && foodSnake.getAttribute('data-y') == snake.style.gridRow){
        grow();
        changeFood();
        score++;
        currentScore.textContent = score;
    }
}
function grow(){

    snakeBody.push({x: snakeBody[snakeBody.length -1].x-1  , y: snakeBody[snakeBody.length -1].y});

    var snakePiece = document.createElement('div');
        snakePiece.classList.add('snake');
        snakePiece.style.gridColumn = snakeBody[snakeBody.length -1].x;
        snakePiece.style.gridRow = snakeBody[snakeBody.length -1].y;
        snakePiece.setAttribute('data-type','piece');
        game.appendChild(snakePiece);
}
function changeFood(){
    var xCor = Math.floor(Math.random()*20) +1,
        yCor = Math.floor(Math.random()*20) +1,
        stop = false;
        while(!stop){
            if(in_array(score,{x:xCor,y:yCor}) === -1){
                stop = true;
            }else{
                xCor = Math.floor(Math.random()*20) +1;
                yCor = Math.floor(Math.random()*20) +1;
            }
        }
        foodSnake.setAttribute('data-x',xCor);
        foodSnake.setAttribute('data-y',yCor);
        foodSnake.style.gridColumn = xCor;
        foodSnake.style.gridRow = yCor;
}
function checkForBorders(){
    if(snakeBody[0].x > 20 || snakeBody[0].x <= 0 || snakeBody[0].y > 20 || snakeBody[0].y <= 0){
        game.style.border = "2px inset red";
        setHighScore();
        alert('Oups ! You Have Lost, Try Again');
        window.location = '/';
    }
}
function checkSnake(){
    var slicedSnake = snakeBody.slice(1);
    if(in_array(slicedSnake,snakeBody[0]) === 0){
        snake.style.backgroundColor = "red";
        setHighScore();
        alert('Oups ! You Have Lost, Try Again');
        window.location = '/'; 
    }
}
function in_array(arr,object){
    var counter = 0;
    for(var i = 0; i< arr.length;i++){
        if(arr[i].x === object.x && arr[i].y === object.y ){
            counter++;
        }
    }
    if(counter > 0){
        return 0;
    }else{
        return -1;
    }
}
function  setHighScore(){
    if(highScore === null){
        localStorage.setItem('High-score',score);
    }else{
        if(highScore < score){
            localStorage.setItem('High-score',score);
        }
    }
}