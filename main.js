var canvas = document.getElementById("myCanvas");
console.log(canvas);
var ctx = canvas.getContext("2d");

let map1 = ["M.#############################",
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
    "#...#.#.......................",
    "#############################.E"
];




drawLab();

document.addEventListener("keypress",(e) => {
    const key = e.key;
    switch (key) {
        case 's':
            console.log("tine lize kurce");
            break;
    
        default:
            break;
    }
});


//maze generator!!
function drawLab(){
    for(let i=0; i<map1.length; i++){
        let x=0;
        let y=i*20;
        for(let j=0; j<map1[i].length; j++){
            if(map1[i][j]=="#"){
                ctx.fillStyle='black';
                ctx.beginPath();
                ctx.rect(x, y, 20, 20);
                ctx.fill();
                x=x+20
                
            }
            else if(map1[i][j]=="E"){
                ctx.beginPath();
                ctx.fillStyle='green';
                ctx.rect(x, y, 20, 20);
                ctx.fill();
                x=x+20 
            }
            else if(map1[i][j]=="M"){
                ctx.beginPath();
                ctx.fillStyle='red';
                ctx.rect(x, y, 20, 20);
                ctx.fill();
                x=x+20   
            }
            else{
                x=x+20
            }
        } 
    }
}
