var matriz = [];
var size = 10;

function drawCell(x, y) {
    new Path()
    .moveTo(x * 100, y * 100)
    .lineBy(100, 0)
    .lineBy(0, -100)
    .lineBy(-100, 0)
    .lineBy(0, 100)
    .stroke('black', 1)
    .addTo(stage);
}


function fillboard() {
    for (var x = 0; x != size; x++) {
        matriz[x] = [];
        for (var y = 0; y != size + 1; y++) {
            matriz[x][y] = new Object();
            matriz[x][y].state = false;
            matriz[x][y].uWall = true;
            matriz[x][y].dWall = true;
            matriz[x][y].lWall = true;
            matriz[x][y].rWall = true;
            matriz[x][y].posX = x;
            matriz[x][y].posY = y;
            matriz[x][y].pathState = false;
            drawCell(x, y);
        }
    }
}

function deleteWall(x, y, direction) {
    //new Circle((x * 100) + 50, (y * 100) + 50, 5).fill('red').addTo(stage);
    switch (direction) {
        case "u":
        new Path()
        .moveTo(x * 100, y * 100)
        .lineBy(100, 0)
        .stroke('white', 1)
        .addTo(stage);
        matriz[x][y].uWall = false;
        break;
        case "d":
        new Path()
        .moveTo(x * 100, y * 100 + 100)
        .lineBy(100, 0)
        .stroke('white', 1)
        .addTo(stage);
        matriz[x][y].dWall = false;
        break;
        case "r":
        new Path()
        .moveTo(x * 100 + 100, y * 100)
        .lineBy(0, 100)
        .stroke('white', 1)
        .addTo(stage);
        matriz[x][y].rWall = false;
        break;
        case "l":
        new Path()
        .moveTo(x * 100, y * 100)
        .lineBy(0, 100)
        .stroke('white', 1)
        .addTo(stage);
        matriz[x][y].lWall = false;
        break;
    }
}


function buildLab(entry, matriz) {
    var stack = new Array();
    stack.push(entry);
    var posX = stack[stack.length - 1].posX;
    var posY = stack[stack.length - 1].posY;
    matriz[posX][posY].state = true;

    //new Circle((posX * 100) + 50, (posY * 100) + 50, 5).fill('red').addTo(stage);
    var vUp = false;
    var vDown = false;
    var vLeft = false;
    var vRight = false;

    while (stack.length > 0) {
        var dir = Math.floor((Math.random() * 4) + 1);

        posX = stack[stack.length - 1].posX;
        posY = stack[stack.length - 1].posY;

        if(!(vUp && vDown && vLeft && vRight)){
            switch (dir) {
                case (1):
                    if (posY <= 0 || matriz[posX][posY - 1].state) {
                        vUp = true;
                        break;
                    }

                    deleteWall(posX, posY, "u");
                    stack.push(matriz[posX][posY - 1]);
                    posX = stack[stack.length - 1].posX;
                    posY = stack[stack.length - 1].posY;
                    matriz[posX][posY].state = true;
                    //new Circle((posX * 100) + 50, (posY * 100) + 50, 5).fill('red').addTo(stage);
                    break;
                case (2):
                    if (posY >= size - 1 || matriz[posX][posY + 1].state) {
                        vDown = true;
                        break;
                    }

                    deleteWall(posX, posY, "d");
                    stack.push(matriz[posX][posY + 1]);
                    posX = stack[stack.length - 1].posX;
                    posY = stack[stack.length - 1].posY;
                    matriz[posX][posY].state = true;
                    //new Circle((posX * 100) + 50, (posY * 100) + 50, 5).fill('red').addTo(stage);
                    break;
                case (3):
                    if (posX <= 0 || matriz[posX - 1][posY].state) {
                        vLeft = true;
                        break;
                    }

                    deleteWall(posX, posY, "l");
                    stack.push(matriz[posX - 1][posY]);
                    posX = stack[stack.length - 1].posX;
                    posY = stack[stack.length - 1].posY;
                    matriz[posX][posY].state = true;
                    //new Circle((posX * 100) + 50, (posY * 100) + 50, 5).fill('red').addTo(stage);
                    break;
                case (4):
                    if (posX >= size - 1 || matriz[posX + 1][posY].state) {
                        vRight = true;
                        break;
                    }

                    deleteWall(posX, posY, "r");
                    stack.push(matriz[posX + 1][posY]);
                    posX = stack[stack.length - 1].posX;
                    posY = stack[stack.length - 1].posY;
                    matriz[posX][posY].state = true;
                    //new Circle((posX * 100) + 50, (posY * 100) + 50, 5).fill('red').addTo(stage);
                    break;
            }

        } else {
            stack.pop();
            var vUp = false;
            var vDown = false;
            var vLeft = false;
            var vRight = false;
        }

    }
}

function findPath(entry, goal, matriz){
    var stack = new Array();
    stack.push(entry);
    var posX = stack[stack.length - 1].posX;
    var posY = stack[stack.length - 1].posY;
    matriz[posX][posY].pathState = true;
    new Circle((posX * 100) + 50, (posY * 100) + 50, 5).fill('red').addTo(stage);

    while (stack.length > 0) {

        if (posX == goal.posX && posY == goal.posY) {
            return;
        }

        posX = stack[stack.length - 1].posX;
        posY = stack[stack.length - 1].posY;

        if(posX >= size - 1 || !matriz[posX + 1][posY].pathState){
            stack.push(matriz[posX + 1][posY]);
            posX = stack[stack.length - 1].posX;
            posY = stack[stack.length - 1].posY;
            matriz[posX][posY].pathState = true;
            new Circle((posX * 100) + 50, (posY * 100) + 50, 5).fill('red').addTo(stage);
            continue;

        } else if(posY <= 0 || !matriz[posX][posY - 1].pathState){

            stack.push(matriz[posX][posY - 1]);
            posX = stack[stack.length - 1].posX;
            posY = stack[stack.length - 1].posY;
            matriz[posX][posY].pathState = true;
            new Circle((posX * 100) + 50, (posY * 100) + 50, 5).fill('red').addTo(stage);
            continue;

        } else if (posX <= 0 || !matriz[posX - 1][posY].pathState) {
            stack.push(matriz[posX - 1][posY]);
            posX = stack[stack.length - 1].posX;
            posY = stack[stack.length - 1].posY;
            matriz[posX][posY].pathState = true;
            new Circle((posX * 100) + 50, (posY * 100) + 50, 5).fill('red').addTo(stage);
            continue;

        } else if (posY >= size - 1 || !matriz[posX][posY + 1].pathState) {
            stack.push(matriz[posX][posY + 1]);
            posX = stack[stack.length - 1].posX;
            posY = stack[stack.length - 1].posY;
            matriz[posX][posY].pathState = true;
            new Circle((posX * 100) + 50, (posY * 100) + 50, 5).fill('red').addTo(stage);
            continue;

        } else {
            stack.pop();
        }

    }

}

fillboard();
//deleteWall(2, 2, "u");
//console.log(matriz[4][4]);
buildLab(matriz[0][0], matriz);
findPath(matriz[0][0], matriz[3][3], matriz);
