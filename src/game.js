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
            matrix[i].push({value: undefined, isActive: false, isFlaged: false});
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

            if(!matrix[i][j].isActive && matrix[i][j].isFlaged){
                squad.innerHTML = '';
                squad.className = squad.className + ' isFlaged';
                
                let flagImg = document.createElement('img');
                
                flagImg.src = 'data:image/svg+xml;utf8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBkPSJNMjMuMjgsMTRsMy41LTQuMzc1QTEsMSwwLDAsMCwyNiw4SDlWN0ExLDEsMCwwLDAsOSw1SDdBMSwxLDAsMCwwLDcsN1YyNUg2YTEsMSwwLDAsMCwwLDJoNGExLDEsMCwwLDAsMC0ySDlWMjBIMjZhMSwxLDAsMCwwLC43ODEtMS42MjVaTTksMThWMTBIMjMuOTE5bC0yLjcsMy4zNzVhMSwxLDAsMCwwLDAsMS4yNUwyMy45MTksMThaIi8+PC9zdmc+';
                squad.appendChild(flagImg);
            }else {
                squad.classList.remove('isFlaged');
            }
            
            if(matrix[i][j].value == 'B' && matrix[i][j].isActive) {
                squad.className = squad.className + ' bomb';
                squad.innerHTML = '';
                let bombImg = document.createElement('img');
                bombImg.src = 'data:image/svg+xml;utf8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDYwIDYwIiB2aWV3Qm94PSIwIDAgNjAgNjAiPjxwYXRoIGQ9Ik01MC40NTAyNTYzIDEwLjA3MTQxMTFjLS4xOTAwMDI0LS4zODk5NTM2LS42MTk5OTUxLS41OTk5NzU2LTEuMDQwMDM5MS0uNTM5OTc4bC0zLjk2OTk3MDcuNjE5OTk1MUw0My42MzAyNDkgNi41ODE0MjA5Yy0uMTkwMDAyNC0uMzkwMDE0Ni0uNjA5OTg1NC0uNjA5OTg1NC0xLjAzOTk3OC0uNTM5OTc4LS40MzAwNTM3LjA1OTk5NzYtLjc3MDAxOTUuMzk5OTYzNC0uODQwMDI2OS44MzAwMTcxbC0uNjQwMDE0NiAzLjk0OTk1MTItMy45Njk5NzA3LjYxOTk5NTFjLS40MjAwNDM5LjA3MDAwNzMtLjc2MDAwOTguNDAwMDI0NC0uODMwMDE3MS44MzAwMTcxcy4xNTAwMjQ0Ljg1MDAzNjYuNTMwMDI5MyAxLjA0OTk4NzhsMS4zNTUxNjM2LjY5Mjc0OWMtLjA5ODQ0OTcuMDQ5NjIxNi0uMTk2Nzc3My4xMDgyNzY0LS4yOTUxNjYuMTY3Mjk3NC0yLjEyMDA1NjIgMS4yODk5NzgtMy4zMjAwMDczIDQuMDcwMDA3My0zLjg3MDA1NjIgNS42OTk5NTEybC0yLjkyOTk5MjctMS42NTk5NzMxYy0uNDc5OTgwNS0uMjcwMDE5NS0xLjA4OTk2NTgtLjA5OTk3NTYtMS4zNjk5OTUxLjM4MDAwNDlsLTEuNDUwMDEyMiAyLjU0OTk4NzhjMS44ODAwMDQ5LjM1MDAzNjYgMy43MDAwMTIyIDEuMDIwMDE5NSA1LjM4MDAwNDkgMS45NzAwMzE3IDEuNzEwMDIyLjk2OTk3MDcgMy4yMDAwMTIyIDIuMTkwMDAyNCA0LjQ0MDAwMjQgMy41ODk5NjU4bDEuNDUwMDEyMi0yLjU1OTk5NzZjLjI3MDAxOTUtLjQ3OTk4MDUuMTAwMDM2Ni0xLjA4OTk2NTgtLjM4MDAwNDktMS4zNTk5ODU0bC0zLjM1OTk4NTQtMS45MDAwMjQ0Yy40NTAwMTIyLTEuNDc5OTgwNSAxLjUtNC4wMTAwMDk4IDMuMTQwMDE0Ni01LjAxMDAwOTguNDQ5OTUxMi0uMjc5OTY4My45Mjk5MzE2LS40MTk5ODI5IDEuNDE5ODYwOC0uNDE5OTgyOWwtLjU4OTkwNDggMy42NTAwMjQ0Yy0uMDY5OTQ2My40Mjk5OTI3LjE0MDAxNDYuODQ5OTc1Ni41MzAwMjkzIDEuMDQ5OTg3OC4xNDAwMTQ2LjA3MDAwNzMuMjk5OTg3OC4xMDk5ODU0LjQ1MDAxMjIuMTA5OTg1NC4yNjAwMDk4IDAgLjUxOTk1ODUtLjA5OTk3NTYuNzA5OTYwOS0uMjg5OTc4bDIuODQwMDI2OS0yLjgzMDAxNzEgMy41NzAwMDczIDEuODMwMDE3MWMuMzkwMDE0Ni4yMDAwMTIyLjg1OTk4NTQuMTMwMDA0OSAxLjE1OTk3MzEtLjE3OTk5MjcuMzA5OTk3Ni0uMjk5OTg3OC4zOTAwMTQ2LS43NzAwMTk1LjE5MDAwMjQtMS4xNjAwMzQybC0xLjc5OTk4NzgtMy41Nzk5NTYxIDIuODQwMDI2OS0yLjgzMDAxNzFDNTAuNTcwMjUxNSAxMC45MjE0NDc4IDUwLjY1MDI2ODYgMTAuNDYxNDI1OCA1MC40NTAyNTYzIDEwLjA3MTQxMTF6TTMyLjY3MDIyNzEgMjQuODYxNDUwMmMtNy40Njk5NzA3LTQuMjMwMDQxNS0xNi45ODk5OTAyLTEuNTkwMDI2OS0yMS4yMTk5NzA3IDUuODc5OTQzOC00LjIyMDAzMTcgNy40NzAwMzE3LTEuNTgwMDE3MSAxNi45OTAwNTEzIDUuODkwMDE0NiAyMS4yMjAwMzE3IDIuNDA5OTczMSAxLjM1OTk4NTQgNS4wMzk5NzggMi4wMTAwMDk4IDcuNjM5OTUzNiAyLjAxMDAwOTggNS40Mjk5OTI3IDAgMTAuNzEwMDIyLTIuODQwMDI2OSAxMy41NzAwMDczLTcuOTAwMDI0NEM0Mi43ODAyMTI0IDM4LjYwMTQ0MDQgNDAuMTQwMjU4OCAyOS4wOTE0MzA3IDMyLjY3MDIyNzEgMjQuODYxNDUwMnpNMjAuOTYwMjY2MSA0Ny41OTE0MzA3Yy0uMTgwMDUzNy4zMjAwMDczLS41MjAwMTk1LjUtLjg2OTk5NTEuNS0uMTcwMDQzOSAwLS4zNDAwMjY5LS4wNDAwMzkxLS40OTAwNTEzLS4xMzAwMDQ5LTUuNDQ5OTUxMi0zLjA4MDAxNzEtNy4zODAwMDQ5LTEwLjAyMDAxOTUtNC4yODk5NzgtMTUuNDcwMDMxNy4yNzAwMTk1LS40Nzk5ODA1Ljg4MDAwNDktLjY0OTk2MzQgMS4zNTk5ODU0LS4zNzk5NDM4LjQ4MDA0MTUuMjY5OTU4NS42NTAwMjQ0Ljg3OTk0MzguMzgwMDA0OSAxLjM1OTk4NTQtMi41Mzk5NzggNC40ODk5OTAyLS45NTk5NjA5IDEwLjIwOTk2MDkgMy41MzAwMjkzIDEyLjc1QzIxLjA2MDI0MTcgNDYuNDkxMzk0IDIxLjIzMDIyNDYgNDcuMTAxNDQwNCAyMC45NjAyNjYxIDQ3LjU5MTQzMDd6Ii8+PC9zdmc+';
                squad.appendChild(bombImg);
            }
            if(matrix[i][j].value == 1 && matrix[i][j].isActive) {
                squad.style.color = 'blue';
            }
            if(matrix[i][j].value == 2 && matrix[i][j].isActive) {
                squad.style.color = 'green';
            }
            if(matrix[i][j].value == 3 && matrix[i][j].isActive) {
                squad.style.color = 'yellow';
            }

            squad.addEventListener('click', ( event) => {
                
                const count = isActiveCount(matrix);

                if(count == 0){
                    timerGame.pause();
                    timerGame.resume();
                }
                activeSquad(matrix, i, j);
            });
            squad.addEventListener('contextmenu', (e)=>{
                e.preventDefault();
                
                if(matrix[i][j].isActive || matrix[i][j].isFlaged)
                    matrix[i][j].isFlaged = false;
                else
                    matrix[i][j].isFlaged = true;

                refresh(matrix);
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
    if(verifyVictory(matrix)){
        renderVictory(matrix);
    }
    else
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
    let timerElement = document.getElementById('timer-game');
    timerElement.innerHTML = '00:00';
};

const gameOver = (matrix) => {
    timerGame.pause();
    matrix = activeAllSquad(matrix);
    refresh(matrix);
    alert('GAME OVER'); 
};

const verifyVictory = (matrix) => {
    const activeCount = isActiveCount(matrix);

    const squadCount = DIMENSOES.rows * DIMENSOES.columns;

    return squadCount - activeCount == BOMBS_TOTAL;
};

const renderVictory = (matrix) => {
    timerGame.pause();
    matrix = activeAllSquad(matrix);
    render(matrix);
    alert('Você venceu');
};

render(createGame(DIMENSOES.rows, DIMENSOES.columns));  

document.getElementById('btn-new-game')
.addEventListener('click', ()=> {
    clear();
    start();
    render(createGame(DIMENSOES.rows, DIMENSOES.columns));  

});

