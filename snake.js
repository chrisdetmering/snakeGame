const canvas = document.querySelector("#snake-canvas");
const context = canvas.getContext("2d"); 
const GAME_HEIGHT = canvas.height; 
const GAME_WIDTH = canvas.width; 
const ITEMS_HEIGHT = 10; 
const ITEMS_WIDTH = 10; 

let score = 0; 

const snake = [{ 
  x: GAME_WIDTH / 2, 
  y: GAME_HEIGHT / 2, 
  height: ITEMS_HEIGHT, 
  width: ITEMS_WIDTH, 
}]; 

let delta = 5; 
let dx = delta; 
let dy = delta; 
let up = false; 
let down = false; 
let right = false; 
let left = false; 


const apple = { 
  x: getRandomX(), 
  y: getRandomY(), 
  height: ITEMS_HEIGHT, 
  width: ITEMS_WIDTH, 
}



document.addEventListener('keydown', e => { 
  e.preventDefault(); 

  if (e.key === 'ArrowUp') { 
    up = true; 
    down = false; 
    right = false; 
    left = false; 
    return; 
  }

  if (e.key === 'ArrowDown') { 
    up = false; 
    down = true; 
    right = false; 
    left = false; 
    return; 
  }

  if (e.key === 'ArrowRight') { 
    up = false; 
    down = false; 
    right = true; 
    left = false; 
    return; 
  }

  if (e.key === 'ArrowLeft') { 
    up = false; 
    down = false; 
    right = false; 
    left = true; 
  }
})


function getRandomX() { 
  let randomNumber = Math.round(Math.random() * (GAME_WIDTH - ITEMS_WIDTH) / delta); 
  randomNumber = randomNumber === 0 ? 1 : randomNumber;
  return randomNumber * delta; 
}

function getRandomY() { 
  let randomNumber = Math.round(Math.random() * (GAME_HEIGHT - ITEMS_HEIGHT) / delta); 
  randomNumber = randomNumber === 0 ? 1 : randomNumber;
  return randomNumber * delta; 
}

function drawApple() { 
  context.beginPath(); 
  context.fillStyle = 'red'; 
  context.rect(apple.x, apple.y, apple.height, apple.width); 
  context.fill(); 
  context.closePath(); 
}



function drawSnake() { 
  snake.forEach(snakeSection => { 
    context.beginPath(); 
    context.fillStyle = 'black'; 
    context.rect(snakeSection.x, snakeSection.y, snakeSection.height, snakeSection.width); 
    context.fill(); 
    context.closePath();
  })
}

function moveSnake() { 
  if (up) { 
    addNewSnakePart(-5, 'y');
    return;
  }

  if (down) { 
    addNewSnakePart(5, 'y');
    return;
  }

  if (left) { 
    addNewSnakePart(-5, 'x');
    return;
  }

  if (right) { 
    addNewSnakePart(5, 'x');
    return;
  }
}

function addNewSnakePart(delta, direction) { 
  let snakeHead = snake[snake.length - 1];
    let newHead = {
      height: ITEMS_HEIGHT,
      width: ITEMS_WIDTH,
     };
  
  if (direction === 'x') { 
      newHead.x = snakeHead.x + delta; 
      newHead.y = snakeHead.y
    }

  if (direction === 'y') { 
    newHead.x = snakeHead.x;
    newHead.y = snakeHead.y + delta;
  }

  snake.push(newHead);
}


function hitWallDetection() { 
  let snakeHead = snake[snake.length - 1]; 
  if (snakeHead.x < 0 || snakeHead.y < 0) { 
    gameOver("hit a wall");
  }
  if (snakeHead.x + snakeHead.width > GAME_WIDTH) { 
    gameOver("hit a wall");
  }

  if (snakeHead.y + snakeHead.height > GAME_HEIGHT) { 
    gameOver("hit a wall");
  }
}

function eatAppleDetection() { 
  let snakeHead = snake[snake.length - 1]; 
  if (snakeHead.x === apple.x && snakeHead.y === apple.y) { 
    moveApple();
    score += 1; 
  }
}

function hitSelfDetection() { 
  let snakeHead = snake[snake.length - 1]; 

  for (let i = 0; i < snake.length - 1; i++) { 
    let snakeSection = snake[i]; 
    if (snakeSection.x === snakeHead.x && snakeSection.y === snakeHead.y) { 
      gameOver("hit yourself"); 
    }
  }

}

function gameOver(message) { 
  alert("Game over. You " + message);
  clearInterval(interval); 
  window.location.reload(); 
}

function drawScore() { 
  context.font = "20px Times New Roman";
  context.fillText("Score: " + score, 20, 20);
}

function moveApple() { 
  apple.x = getRandomX(); 
  apple.y = getRandomY(); 
}

function trimSnakeTail() { 
  if (snake.length - 1 > score) { 
    snake.shift(); 
  }
}

function drawSnakeGame() { 
  context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT); 
  drawScore(); 
  moveSnake();
  trimSnakeTail(); 
  drawSnake(); 
  drawApple();
  hitSelfDetection(); 
  hitWallDetection(); 
  eatAppleDetection(); 
}

drawSnakeGame();
let interval = setInterval(drawSnakeGame, 50);

document.addEventListener("DOMContentLoaded", () => { 
  alert(`Ready to play Snake? Rules:
  \n 1. Use arrow keys to move 
  \n 2. Eat apples 
  \n 3. Don't hit the wall 
  \n 4. Don't hit yourself`)
})