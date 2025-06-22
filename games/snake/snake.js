const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 400;
let snake = [{ x: 200, y: 200 }];
let food = getRandomFood();
let direction = "RIGHT";
let score = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  const key = event.key;
  if (key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  if (key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function getRandomFood() {
  return {
    x: Math.floor(Math.random() * (canvasSize / box)) * box,
    y: Math.floor(Math.random() * (canvasSize / box)) * box,
  };
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  ctx.fillStyle = "#00ff99";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Move snake
  const head = { ...snake[0] };
  if (direction === "UP") head.y -= box;
  if (direction === "DOWN") head.y += box;
  if (direction === "LEFT") head.x -= box;
  if (direction === "RIGHT") head.x += box;

  // Game over conditions
  if (
    head.x < 0 || head.x >= canvasSize ||
    head.y < 0 || head.y >= canvasSize ||
    snake.some(seg => seg.x === head.x && seg.y === head.y)
  ) {
    alert("💀 Game Over! Your score: " + score);
    document.location.reload();
    return;
  }

  // Eat food
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").innerText = score;
    food = getRandomFood();
  } else {
    snake.pop();
  }

  snake.unshift(head);
}

setInterval(drawGame, 150);