const insertBombs = (matrix) => {
    
    let newMatrix = matrix;
    if(matrix.length > 0){
        let bombPositions = [];

        while(bombPositions.length < 10) {
            const i = Math.floor(Math.random() * matrix.length);
            const j = Math.floor(Math.random() * matrix[0].length);

            if(bombPositions.filter((bomb)=>{if(bomb.i == i && bomb.j) return {i, j};}).length == 0) {

                bombPositions.push({i, j});
                newMatrix[i][j].value = 'B'; 
                newMatrix = insertNumbers(newMatrix, i, j);
            }
        }
    }
    return  newMatrix;
};

const insertNumbers = (matrix, i, j) => {
    let newMatrix = matrix;

    let positions = [];

    for(let y = i - 1; y <= i + 1; y++) {
        
        for(let x = j - 1; x <= j + 1; x++) {
            
            positions.push({i: y, j: x});
            if(!(y == i && x == j))
                if((y >= 0 && y < matrix.length) && (x >= 0 && x < matrix[i].length))
                {
                    if(newMatrix[y][x].value != 'B') {
                        if(newMatrix[y][x].value)
                            newMatrix[y][x].value = newMatrix[y][x].value + 1;
                        else
                            newMatrix[y][x].value = 1;
                    }
                }
        }
    }
    
    return newMatrix;
};


const createGame = (rows, columns) => {
    let matrix = [];

    for(let i = 0; i < rows; i++){
        matrix.push([]);
        for(let j = 0; j < columns; j++)
        {
            matrix[i].push({value: undefined, isActive: false});
        }
    }

    matrix = insertBombs(matrix);

    return matrix;
};

const render = (matrix) => {
    
    let boardElement = document.getElementById('board');

    for(let i = 0; i < matrix.length; i++){
        let row = document.createElement('div');
        row.className = 'row';
        boardElement.appendChild(row);
        for(let j = 0; j < matrix[i].length; j++)
        {
            let squad = document.createElement('div');
            squad.className = 'squad';
            
            if(matrix[i][j].isActive) {
                squad.innerHTML = (matrix[i][j].value)?matrix[i][j].value:'';
                squad.className = squad.className + ' isActive';
            }    

            if(matrix[i][j].value == 'B') {
                squad.className = squad.className + ' bomb';
            }
            if(matrix[i][j].value == 1) {
                squad.style.color = 'blue';
            }
            if(matrix[i][j].value == 2) {
                squad.style.color = 'green';
            }
            if(matrix[i][j].value == 3) {
                squad.style.color = 'yellow';
            }

            squad.addEventListener('click', ()=> {
                activeSquad(matrix, i, j);
            });

            row.appendChild(squad);
        }
    }
};

const activeSquad = (matrix, i, j) => {
    if(!matrix[i][j].isActive) {
        if(matrix[i][j].value == 'B')
            gameOver(matrix);

        else if (!matrix[i][j].value)
            activeBlankSquad(matrix, i, j);
        else {
            matrix[i][j].isActive = true;

            refresh(matrix);
        }
    }
};

const activeBlankSquad = (matrix, i, j) => { 
    
    for(let x = j; x < matrix[j].length; x++){
        matrix[i][x].isActive = true;
        if(matrix[i][x].value)
            break;
    }

    for(let x = j; x >= 0; x--){
        matrix[i][x].isActive = true;
        if(matrix[i][x].value)
            break;
    }

    for(let y = i; y < matrix.length; y++){
        matrix[y][j].isActive = true;
        if(matrix[y][j].value)
            break;
    }

    for(let y = i; y >= 0; y--){
        matrix[y][j].isActive = true;
        if(matrix[y][j].value)
            break;
    }

    refresh(matrix);
};

const activeAllSquad = (matrix) => {
    return matrix.map((row)=>(row.map((squad)=> ({...squad, isActive: true}))));
};

const clear = () => {
    document.getElementById('board').innerHTML = '';
};

const refresh = (matrix) => {
    clear();
    render(matrix);
};

const start = () => {
    render(createGame(10, 10)); 
};

const gameOver = (matrix) => {
    matrix = activeAllSquad(matrix);
    refresh(matrix);
    alert('GAME OVER');
};

start();    

document.getElementById('btn-start')
.addEventListener('click', ()=> {
    clear();
    start();
});

