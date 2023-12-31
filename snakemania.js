                               //game variable and consts
let inputDir = {x:0 , y:0};                        //initial direction for snake
const foodSound = new Audio('food.mp3');           //sound whene snake eat food
const gameOverSound = new Audio('gameOverSound.mp3');   //sound for game over
const moveSound = new Audio('move.mp3');           //sound whene snake move
const musicSound = new Audio('musicSound.mp3');        //game music
let speed = 8 ;
let score = 0;                                    //initial speed of snake
let lastPaintTime = 0;
let snakeArr = [                                   //snake initial position.
    {x: 13, y:15}
]
let food = {x: 6, y: 7}


                                            //game function
function main(ctime){
    window.requestAnimationFrame(main);
    console.log(ctime)    //ctime is current time of the game
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
    
}

function isCollide(snake){
    //if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true
        }
    }
    // if you bump into the wall
        if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <=0){
            return true;
        }
       
    
}

function gameEngine(){
                                  //Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0, y:0};
        alert("Game Over. Press any Key to play again!");
        snakeArr = [{x: 13, y: 15}];
       // musicSound.play()
        score = 0;
    }

    //if you have eaten the food, increament the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play()
        score += 1;
        scoreBox.innerHTML = "SCORE: " + score ;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})
        let a = 2 ;
        let b = 16 ;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0 ; i--) {
        snakeArr[i+1] = {...snakeArr[i]}

        
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

                                  //Part 2: Display the snake and Food
    //display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) =>{
        snakeElement = document.createElement('div');   //creating new element
        snakeElement.style.gridRowStart = e.y;          //setting the position at row
        snakeElement.style.gridColumnStart = e.x;       //setting position at column
        
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //display the food
    foodElement = document.createElement('div');   
        foodElement.style.gridRowStart = food.y;          
        foodElement.style.gridColumnStart = food.x;       
        foodElement.classList.add('food')
        board.appendChild(foodElement);


}










//main logic start here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{ //start the game whene any butten will press
    inputDir = {x: 0, y:1} 
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown" :
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1; 
            break;
        case "ArrowLeft" :
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight" :
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break ;
    }
})



