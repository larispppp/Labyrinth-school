
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
const path = document.getElementById("sandPath");
const walls = document.getElementById("sandWall");
const walkPath = document.getElementById("walkedPath");
const boulder = document.getElementById("boulder");
const finish = document.getElementById("finish");
let mapEasy = [
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
let mapMedium=[
  "M.#############################",
  "..........#.#.....#.#...#...#.#",
  "###.###.#.#.#.#####.#.###.###.#",
  "#...#...#.#.....#.......#.....#",
  "#.#####.#.#.#######.#.#.#####.#",
  "#.#...#.#...........#.#.....#.#",
  "###.#.#####.###.#.#######.###.#",
  "#...#.#...#.#.#.#.#...#.#...#.#",
  "#.#######.#.#.###.###.#.#.#.#.#",
  "#.....#.....#...#.....#.#.#...#",
  "#.###.#.###.###.#.#####.###.###",
  "#.#.#.....#.#.#.....#...#.#...#",
  "#.#.#.###.###.###.#####.#.#####",
  "#...#...#.......#.............#",
  "#.#.#.#.###.###########.#####.#",
  "#.#.#.#...#.....#.#...#.#.....#",
  "###.#########.###.###.#.#.###.#",
  "#...#.......#...#.....#.#.#.#.#",
  "###.#####.###.#####.#.###.#.###",
  "#.....#.......#.....#..........",
  "#############################.E",
];

let mapHard=[
  "M.#############################",
  "......#.#.........#.#.....#...#",
  "#.#####.###.#.#.###.#.###.#.###",
  "#.......#...#.#.#...#...#.#...#",
  "#.#.#######.#####.###.###.###.#",
  "#.#.......#...#.#.#.#.#.#.....#",
  "#.###########.#.#.#.###.#.#.###",
  "#.#...#.......#.....#...#.#.#.#",
  "#.#.###.#####.#.#.#.###.###.#.#",
  "#.#.#.#.....#.#.#.#.#.....#...#",
  "#.#.#.#.###.#.#####.#.#####.#.#",
  "#.#.......#.#.......#.#...#.#.#",
  "#.#.#.#.#####.###.###.###.###.#",
  "#...#.#...#.#.#...............#",
  "#.#.###.###.#.###.#.#######.#.#",
  "#.#...#.#.....#...#.#...#...#.#",
  "#.#################.###.#.#.###",
  "#.#.......#.......#.#.....#.#.#",
  "#.#.#.#.###.###.#.###.#######.#",
  "#...#.#...#.#...#..............",
  "#############################.E",
];
function onLoad(){
  Swal.fire({
    title: 'How old are you?',
    icon: 'question',
    input: 'range',
    inputLabel: 'Your age',
    inputAttributes: {
      min: 1,
      max: 3,
      step: 1
    },
    inputValue: 1
  })
}
//variable for storing the number of moves
let moveList = "";

for (let i = 0; i < mapMedium.length; i++) mapMedium[i] = mapMedium[i].split("");
drawLab();
document.onkeydown = checkKey;

//preforms an action based on the key that you press
function checkKey(e) {
  e = e || window.event;
  let coords = findMc("M");

  if (e.keyCode == "38") {
    if (checkMoveUp(coords["i"], coords["j"]) == 1) {
      mapMedium[coords["i"] - 1][coords["j"]] = "M";
      mapMedium[coords["i"]][coords["j"]] = "G";
      moveList = moveList + "w";
      if (moveList.length == 10) mapMedium[0][0] = "O";
      if (moveList.length == 20) callStartEnemy();
      drawLab();
    } else if (checkMoveUp(coords["i"], coords["j"]) == 2) {
      mapMedium[coords["i"] - 1][coords["j"]] = "M";
      mapMedium[coords["i"]][coords["j"]] = "G";
      victory();
      drawLab();
    }
  } else if (e.keyCode == "40") {
    if (checkMoveDown(coords["i"], coords["j"]) == 1) {
      mapMedium[coords["i"] + 1][coords["j"]] = "M";
      mapMedium[coords["i"]][coords["j"]] = "G";
      moveList = moveList + "s";
      if (moveList.length == 10) mapMedium[0][0] = "O";
      if (moveList.length == 20) callStartEnemy();
      drawLab();
    } else if (checkMoveDown(coords["i"], coords["j"]) == 2) {
      mapMedium[coords["i"] + 1][coords["j"]] = "M";
      mapMedium[coords["i"]][coords["j"]] = "G";
      victory();
      drawLab();
    }
  } else if (e.keyCode == "37") {
    if (checkMoveLeft(coords["i"], coords["j"]) == 1) {
      mapMedium[coords["i"]][coords["j"] - 1] = "M";
      mapMedium[coords["i"]][coords["j"]] = "G";
      moveList = moveList + "a";
      if (moveList.length == 10) mapMedium[0][0] = "O";
      if (moveList.length == 20) callStartEnemy();
      drawLab();
    } else if (checkMoveLeft(coords["i"], coords["j"]) == 2) {
      mapMedium[coords["i"]][coords["j"] - 1] = "M";
      mapMedium[coords["i"]][coords["j"]] = "G";
      victory();
      drawLab();
    }
  } else if (e.keyCode == "39") {
    if (checkMoveRight(coords["i"], coords["j"]) == 1) {
      mapMedium[coords["i"]][coords["j"] + 1] = "M";
      mapMedium[coords["i"]][coords["j"]] = "G";
      moveList = moveList + "d";
      if (moveList.length == 10) mapMedium[0][0] = "O";
      if (moveList.length == 20) callStartEnemy();
      drawLab();
    } else if (checkMoveRight(coords["i"], coords["j"]) == 2) {
      mapMedium[coords["i"]][coords["j"] + 1] = "M";
      mapMedium[coords["i"]][coords["j"]] = "G";
      victory();
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
      if (checkMoveUp(coords["i"], coords["j"]) == 1) {
        mapMedium[coords["i"] - 1][coords["j"]] = "M";
        mapMedium[coords["i"]][coords["j"]] = "G";
        moveList = moveList + "w";
        console.log(moveList);
        if (moveList.length == 10) mapMedium[0][0] = "O";
        if (moveList.length == 20) callStartEnemy();
        drawLab();
      } else if (checkMoveUp(coords["i"], coords["j"]) == 2) {
        mapMedium[coords["i"] - 1][coords["j"]] = "M";
        mapMedium[coords["i"]][coords["j"]] = "G";
        victory();
        drawLab();
      }
      break;
    case "a":
    case "A":
      if (checkMoveLeft(coords["i"], coords["j"]) == 1) {
        mapMedium[coords["i"]][coords["j"] - 1] = "M";
        mapMedium[coords["i"]][coords["j"]] = "G";
        moveList = moveList + "a";
        console.log(moveList);
        if (moveList.length == 10) mapMedium[0][0] = "O";
        if (moveList.length == 20) callStartEnemy();
        drawLab();
      } else if (checkMoveLeft(coords["i"], coords["j"]) == 2) {
        mapMedium[coords["i"]][coords["j"] - 1] = "M";
        mapMedium[coords["i"]][coords["j"]] = "G";
        victory();
        drawLab();
      }

      break;
    case "s":
    case "S":
      if (checkMoveDown(coords["i"], coords["j"]) == 1) {
        mapMedium[coords["i"] + 1][coords["j"]] = "M";
        mapMedium[coords["i"]][coords["j"]] = "G";
        moveList = moveList + "s";
        console.log(moveList);
        if (moveList.length == 10) mapMedium[0][0] = "O";
        if (moveList.length == 20) callStartEnemy();
        drawLab();
      } else if (checkMoveDown(coords["i"], coords["j"]) == 2) {
        mapMedium[coords["i"] + 1][coords["j"]] = "M";
        mapMedium[coords["i"]][coords["j"]] = "G";
        victory();
        drawLab();
      }
      break;
    case "d":
    case "D":
      if (checkMoveRight(coords["i"], coords["j"]) == 1) {
        mapMedium[coords["i"]][coords["j"] + 1] = "M";
        mapMedium[coords["i"]][coords["j"]] = "G";
        moveList = moveList + "d";

        if (moveList.length == 10) mapMedium[0][0] = "O";
        if (moveList.length == 20) callStartEnemy();
        drawLab();
      } else if (checkMoveRight(coords["i"], coords["j"]) == 2) {
        mapMedium[coords["i"]][coords["j"] + 1] = "M";
        mapMedium[coords["i"]][coords["j"]] = "G";
        victory();
        drawLab();
      }
      break;
    default:
      break;
  }
});

let condition = 0;
let to = null;

function callStartEnemy() {
  startEnemy(condition);
  condition++;
  to = setTimeout(callStartEnemy, 200);
}

function startEnemy(y) {
  let enemyCoords = findMc("O");
  if (moveList.charAt(y) == "w") {
    console.log(enemyCoords);
    mapMedium[enemyCoords["i"] - 1][enemyCoords["j"]] = "O";
    mapMedium[enemyCoords["i"]][enemyCoords["j"]] = ".";
    drawLab();
  } else if (moveList.charAt(y) == "a") {
    console.log(enemyCoords);
    mapMedium[enemyCoords["i"]][enemyCoords["j"] - 1] = "O";
    mapMedium[enemyCoords["i"]][enemyCoords["j"]] = ".";
    drawLab();
  } else if (moveList.charAt(y) == "s") {
    console.log(enemyCoords);
    mapMedium[enemyCoords["i"] + 1][enemyCoords["j"]] = "O";
    mapMedium[enemyCoords["i"]][enemyCoords["j"]] = ".";
    drawLab();
  } else if (moveList.charAt(y) == "d") {
    console.log(enemyCoords);
    mapMedium[enemyCoords["i"]][enemyCoords["j"] + 1] = "O";
    mapMedium[enemyCoords["i"]][enemyCoords["j"]] = ".";
    drawLab();
  }
  drawLab();
}

//gets coordinates of the character
function findMc(type) {
  for (let i = 0; i < mapMedium.length; i++) {
    for (let j = 0; j < mapMedium[i].length; j++) {
      if (type == "M") {
        if (mapMedium[i][j] == "M") {
          return { i, j };
        }
      } else if (type == "O") {
        if (mapMedium[i][j] == "O") {
          return { i, j };
        }
      }
    }
  }
}

//next functions are used to check if a move in a cardinal direction is possible
function checkMoveDown(x, y) {
  if (mapMedium[x + 1][y] == "." || mapMedium[x + 1][y] == "G") {
    return 1;
  }
  if (mapMedium[x + 1][y] == "E") {
    return 2;
  }
}

function checkMoveLeft(x, y) {
  if (mapMedium[x][y - 1] == "." || mapMedium[x][y - 1] == "G") {
    return 1;
  }
  if (mapMedium[x][y - 1] == "E") {
    return 2;
  }
}
function checkMoveRight(x, y) {
  if (mapMedium[x][y + 1] == "." || mapMedium[x][y + 1] == "G") {
    return 1;
  }
  if (mapMedium[x][y + 1] == "E") {
    return 2;
  }
}
function checkMoveUp(x, y) {
  if (mapMedium[x - 1][y] == "." || mapMedium[x - 1][y] == "G") {
    if (mapMedium[x - 1][y] == "E") {
      return 2;
    }
    return 1;
  }
  if (mapMedium[x - 1][y] == "E") {
    return 2;
  }
}

function victory() {
  clearTimeout(to);
  Swal.fire({
    imageUrl:
      "https://cdn.dribbble.com/users/2157206/screenshots/15756062/media/74963d0afeda20ccb60d92d4ac84afd4.gif",
    imageWidth: 300,
    imageHeight: 225,
    imageAlt: "gifič",
    background:
      "url(http://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/6b5b87ade3ed58e.png)",
  });
}

//maze generator!!
function drawLab() {
  for (let i = 0; i < mapMedium.length; i++) {
    let x = 0;
    let y = i * 20;
    for (let j = 0; j < mapMedium[i].length; j++) {
      if (mapMedium[i][j] == "#") {
        ctx.drawImage(walls, x, y);
        x = x + 20;
      } else if (mapMedium[i][j] == "E") {
        ctx.drawImage(finish, x, y);
        x = x + 20;
      } else if (mapMedium[i][j] == "M") {
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.rect(x, y, 20, 20);
        ctx.fill();
        x = x + 20;
      } else if (mapMedium[i][j] == "G") {
        ctx.drawImage(walkPath, x, y);
        x = x + 20;
      } else if (mapMedium[i][j] == "O") {
        ctx.drawImage(boulder, x, y);
        x = x + 20;
      } else {
        ctx.drawImage(path, x, y);
        x = x + 20;
      }
    }
  }
}
