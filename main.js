var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

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
  let coords = findMc();

  if (e.keyCode == "38") {
    if (checkMoveUp(coords["i"], coords["j"]) == true) {
      map1[coords["i"] - 1][coords["j"]] = "M";
      map1[coords["i"]][coords["j"]] = "G";
      moveList = moveList + "w";
      if (moveList.length == 10) startEnemy();
      drawLab();
    }
  } else if (e.keyCode == "40") {
    if (checkMoveDown(coords["i"], coords["j"]) == true) {
      map1[coords["i"] + 1][coords["j"]] = "M";
      map1[coords["i"]][coords["j"]] = "G";
      moveList = moveList + "s";
      if (moveList.length == 10) startEnemy();
      drawLab();
    }
  } else if (e.keyCode == "37") {
    if (checkMoveLeft(coords["i"], coords["j"]) == true) {
      map1[coords["i"]][coords["j"] - 1] = "M";
      map1[coords["i"]][coords["j"]] = "G";
      moveList = moveList + "a";
      if (moveList.length == 10) startEnemy();
      drawLab();
    }
  } else if (e.keyCode == "39") {
    if (checkMoveRight(coords["i"], coords["j"]) == true) {
      map1[coords["i"]][coords["j"] + 1] = "M";
      map1[coords["i"]][coords["j"]] = "G";
      moveList = moveList + "d";
      if (moveList.length == 10) startEnemy();
      drawLab();
    }
  }
}

document.addEventListener("keypress", (e) => {
  let coords = findMc();
  const keyCode = e.key;
  switch (keyCode) {
    case "w":
    case "W":
      console.log(coords);
      if (checkMoveUp(coords["i"], coords["j"]) == true) {
        map1[coords["i"] - 1][coords["j"]] = "M";
        map1[coords["i"]][coords["j"]] = "G";
        moveList = moveList + "w";
        if (moveList.length == 10) startEnemy();
        drawLab();
      }
      break;
    case "a":
    case "A":
      console.log(coords);
      if (checkMoveLeft(coords["i"], coords["j"]) == true) {
        map1[coords["i"]][coords["j"] - 1] = "M";
        map1[coords["i"]][coords["j"]] = "G";
        moveList = moveList + "a";
        if (moveList.length == 10) startEnemy();
        drawLab();
      }

      break;
    case "s":
    case "S":
      console.log(coords);
      if (checkMoveDown(coords["i"], coords["j"]) == true) {
        map1[coords["i"] + 1][coords["j"]] = "M";
        map1[coords["i"]][coords["j"]] = "G";
        moveList = moveList + "s";
        if (moveList.length == 10) startEnemy();
        drawLab();
      }
      break;
    case "d":
    case "D":
      console.log(coords);
      if (checkMoveRight(coords["i"], coords["j"]) == true) {
        map1[coords["i"]][coords["j"] + 1] = "M";
        map1[coords["i"]][coords["j"]] = "G";
        moveList = moveList + "d";
        if (moveList.length == 10) startEnemy();
        drawLab();
      }
      break;
    default:
      break;
  }
});

function startEnemy() {}

//gets coordinates of the character
function findMc() {
  for (let i = 0; i < map1.length; i++) {
    for (let j = 0; j < map1[i].length; j++) {
      if (map1[i][j] == "M") {
        return { i, j };
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
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.rect(x, y, 20, 20);
        ctx.fill();
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
        ctx.beginPath();
        ctx.fillStyle = "rgb(95, 2, 31)";
        ctx.rect(x, y, 20, 20);
        ctx.fill();
        x = x + 20;
      } else {
        x = x + 20;
      }
    }
  }
}
