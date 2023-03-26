var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
const path = document.getElementById("sandPath");
const walls = document.getElementById("sandWall");
const walkPath = document.getElementById("walkedPath");
const boulder = document.getElementById("boulder");
let map1 = [
  "M.#############################",
  "....#...#.....#.......#.#...#.#",
  "#.###.###.###.#.#####.#.###.#.#",
  "#.........#.#.......#...#.#...#",
  "###.#######.#.#.#######.#.#.###",
  "#.......#.#...#.....#.#.......#",
  "#.#####.#.#.#####.###.###.#.###",
  "#.#...#...#.#.......#...#.#.#.#",
  "#.###.#.#.###########.#######.#",
  "#.#.....#...#.#.#.#...#...#...#",
  "#.#####.#####.#.#.###.###.###.#",
  "#.....#.#.....#.#.......#.#...#",
  "###.###.#.###.#.#######.#.#.#.#",
  "#...#.....#...#.....#.......#.#",
  "###.#########.#.#######.#.###.#",
  "#.#...#.#...........#...#...#.#",
  "#.#.###.#####.#.###.#####.###.#",
  "#.#.#.......#.#.#.......#...#.#",
  "#.#.#.###.#######.#########.###",
  "#...#.#........................",
  "#############################.E",
];

//variable for storing the number of moves
let moveList = "";

for (let i = 0; i < map1.length; i++) map1[i] = map1[i].split("");
drawLab();
document.onkeydown = checkKey;

//preforms an action based on the key that you press
function checkKey(e) {
  e = e || window.event;
  let coords = findMc("M");

  if (e.keyCode == "38") {
    if (checkMoveUp(coords["i"], coords["j"]) == true) {
      map1[coords["i"] - 1][coords["j"]] = "M";
      map1[coords["i"]][coords["j"]] = "G";
      moveList = moveList + "w";
      if (moveList.length == 10) map1[0][0] = "O";
      if (moveList.length == 20) callStartEnemy();
      drawLab();
    }
  } else if (e.keyCode == "40") {
    if (checkMoveDown(coords["i"], coords["j"]) == true) {
      map1[coords["i"] + 1][coords["j"]] = "M";
      map1[coords["i"]][coords["j"]] = "G";
      moveList = moveList + "s";
      if (moveList.length == 10) map1[0][0] = "O";
      if (moveList.length == 20) callStartEnemy();
      drawLab();
    }
  } else if (e.keyCode == "37") {
    if (checkMoveLeft(coords["i"], coords["j"]) == true) {
      map1[coords["i"]][coords["j"] - 1] = "M";
      map1[coords["i"]][coords["j"]] = "G";
      moveList = moveList + "a";
      if (moveList.length == 10) map1[0][0] = "O";
      if (moveList.length == 20) callStartEnemy();
      drawLab();
    }
  } else if (e.keyCode == "39") {
    if (checkMoveRight(coords["i"], coords["j"]) == true) {
      map1[coords["i"]][coords["j"] + 1] = "M";
      map1[coords["i"]][coords["j"]] = "G";
      moveList = moveList + "d";

      if (moveList.length == 10) map1[0][0] = "O";
      if (moveList.length == 20) callStartEnemy();
      drawLab();
    }
  }
}

document.addEventListener("keypress", (e) => {
  let coords = findMc("M");

  const keyCode = e.key;
  switch (keyCode) {
    case "w":
    case "W":
      if (checkMoveUp(coords["i"], coords["j"]) == true) {
        map1[coords["i"] - 1][coords["j"]] = "M";
        map1[coords["i"]][coords["j"]] = "G";
        moveList = moveList + "w";
        console.log(moveList);
        if (moveList.length == 10) map1[0][0] = "O";
        if (moveList.length == 20) callStartEnemy();
        drawLab();
      }
      break;
    case "a":
    case "A":
      if (checkMoveLeft(coords["i"], coords["j"]) == true) {
        map1[coords["i"]][coords["j"] - 1] = "M";
        map1[coords["i"]][coords["j"]] = "G";
        moveList = moveList + "a";
        console.log(moveList);
        if (moveList.length == 10) map1[0][0] = "O";
        if (moveList.length == 20) callStartEnemy();
        drawLab();
      }

      break;
    case "s":
    case "S":
      if (checkMoveDown(coords["i"], coords["j"]) == true) {
        map1[coords["i"] + 1][coords["j"]] = "M";
        map1[coords["i"]][coords["j"]] = "G";
        moveList = moveList + "s";
        console.log(moveList);
        if (moveList.length == 10) map1[0][0] = "O";
        if (moveList.length == 20) callStartEnemy();
        drawLab();
      }
      break;
    case "d":
    case "D":
      if (checkMoveRight(coords["i"], coords["j"]) == true) {
        map1[coords["i"]][coords["j"] + 1] = "M";
        map1[coords["i"]][coords["j"]] = "G";
        moveList = moveList + "d";

        if (moveList.length == 10) map1[0][0] = "O";
        if (moveList.length == 20) callStartEnemy();
        drawLab();
      }
      break;
    default:
      break;
  }
});

let condition = 0;

function callStartEnemy() {
  startEnemy(condition);
  condition++;
  setTimeout(callStartEnemy, 100);
}

function startEnemy(y) {
  let enemyCoords = findMc("O");
  if (moveList.charAt(y) == "w") {
    console.log(enemyCoords);
    map1[enemyCoords["i"] - 1][enemyCoords["j"]] = "O";
    map1[enemyCoords["i"]][enemyCoords["j"]] = ".";
    drawLab();
  } else if (moveList.charAt(y) == "a") {
    console.log(enemyCoords);
    map1[enemyCoords["i"]][enemyCoords["j"] - 1] = "O";
    map1[enemyCoords["i"]][enemyCoords["j"]] = ".";
    drawLab();
  } else if (moveList.charAt(y) == "s") {
    console.log(enemyCoords);
    map1[enemyCoords["i"] + 1][enemyCoords["j"]] = "O";
    map1[enemyCoords["i"]][enemyCoords["j"]] = ".";
    drawLab();
  } else if (moveList.charAt(y) == "d") {
    console.log(enemyCoords);
    map1[enemyCoords["i"]][enemyCoords["j"] + 1] = "O";
    map1[enemyCoords["i"]][enemyCoords["j"]] = ".";
    drawLab();
  }
  drawLab();
}

//gets coordinates of the character
function findMc(type) {
  for (let i = 0; i < map1.length; i++) {
    for (let j = 0; j < map1[i].length; j++) {
      if (type == "M") {
        if (map1[i][j] == "M") {
          return { i, j };
        }
      } else if (type == "O") {
        if (map1[i][j] == "O") {
          return { i, j };
        }
      }
    }
  }
}

//next functions are used to check if a move in a cardinal direction is possible
function checkMoveDown(x, y) {
  if (map1[x + 1][y] == "." || map1[x + 1][y] == "G") {
    return true;
  }
}
function checkMoveLeft(x, y) {
  if (map1[x][y - 1] == "." || map1[x][y - 1] == "G") {
    return true;
  }
}
function checkMoveRight(x, y) {
  if (map1[x][y + 1] == "." || map1[x][y + 1] == "G") {
    return true;
  }
}
function checkMoveUp(x, y) {
  if (map1[x - 1][y] == "." || map1[x - 1][y] == "G") {
    return true;
  }
}

//maze generator!!
function drawLab() {
  for (let i = 0; i < map1.length; i++) {
    let x = 0;
    let y = i * 20;
    for (let j = 0; j < map1[i].length; j++) {
      if (map1[i][j] == "#") {
        ctx.drawImage(walls, x, y);
        x = x + 20;
      } else if (map1[i][j] == "E") {
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.rect(x, y, 20, 20);
        ctx.fill();
        x = x + 20;
      } else if (map1[i][j] == "M") {
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.rect(x, y, 20, 20);
        ctx.fill();
        x = x + 20;
      } else if (map1[i][j] == "G") {
        ctx.drawImage(walkPath, x, y);
        x = x + 20;
      } else if (map1[i][j] == "O") {
        ctx.drawImage(boulder, x, y);
        x = x + 20;
      } else {
        ctx.drawImage(path, x, y);
        x = x + 20;
      }
    }
  }
}
