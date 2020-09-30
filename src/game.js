const BOMBS_TOTAL = 4;
const DIMENSOES = {rows: 10, columns: 10};

const insertBombs = (matrix) => {
    
    let newMatrix = matrix;
    if(matrix.length > 0){
        let bombPositions = [];

        while(bombPositions.length < BOMBS_TOTAL) {
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

            squad.addEventListener('click', () => {
                const count = isActiveCount(matrix);

                if(count == 0)
                    start();
                
                activeSquad(matrix, i, j);
            });

            row.appendChild(squad);
        }
    }
};

const isActiveCount =  (matrix) =>{
    let count = 0;
    for(let i = 0; i < matrix.length; i++)
        for(let j = 0; j < matrix[i].length; j++)
            if(matrix[i][j].isActive)
                count++;
    return count;
};

const activeBlankSquad = (matrix, i, j) => {
    if(!matrix[i][j].isActive) {
        matrix[i][j].isActive = true;
       
        if(!matrix[i][j].value){
            if(i >= 0 && i <= matrix.length) {
                activeBlankTop(matrix, i, j);
                activeBlankBottom(matrix, i, j);
            }

            if(j >= 0 && j <= matrix[i].length) {
                activeBlankLeft(matrix, i, j);
                activeBlankRight(matrix, i, j);
            }
        }
        refresh(matrix);
    }
};

const activeBlankTop = (matrix, i, j) => {
    if(i > 0)
    {
        const top = i-1;
        activeBlankSquad(matrix, top, j);
    }
}
const activeBlankBottom = (matrix, i, j) => {
    if(i < matrix.length-1)
    {
        const bottom = i+1;
        activeBlankSquad(matrix, bottom, j);
    }
}
const activeBlankLeft = (matrix, i, j) => {
    if(j > 0)
    {
        const left = j-1;
        activeBlankSquad(matrix, i, left);
    }
}
const activeBlankRight = (matrix, i, j) => {
    if(j < matrix[i].length-1)
    {
        const right = j+1;
        activeBlankSquad(matrix, i, right);
    }
}

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


const timer = (callback, delay) => {
    var timerId;
    var start;
    var remaining = delay;
  
    const pause =  () => {
      window.clearTimeout(timerId);
      remaining -= new Date() - start;
    };
  
    const resume =  () => {
      start = new Date();
      timerId = window.setTimeout(() => {
        remaining = delay;
        resume();
        callback();
      }, remaining);
    };

    
  
    const reset = () => {
      remaining = delay;
    };

    return {
        pause, 
        resume, 
        reset
    };
};
  
  
let count = 0;

const timerGame = timer(() => {
    count++;
    
    let timerElement = document.getElementById('timer-game');

    const minutes = Math.floor(count / 60);
    const seconds = count - (minutes * 60);
    
    timerElement.innerHTML = ((minutes < 10)?'0':'') + minutes + ':' + ((seconds < 10)?'0':'') + seconds;
}, 1000);

const start = () => {
    count = 0;
    timerGame.pause();
    timerGame.resume();
};

const gameOver = (matrix) => {
    timerGame.pause();
    matrix = activeAllSquad(matrix);
    refresh(matrix);
    alert('GAME OVER');
};

render(createGame(DIMENSOES.rows, DIMENSOES.columns));  

document.getElementById('btn-new-game')
.addEventListener('click', ()=> {
    clear();
    start();
    render(createGame(DIMENSOES.rows, DIMENSOES.columns));  

});

