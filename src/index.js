import Render from './render';
import timer from './timer';
import createGame from './game';
const BOMBS_TOTAL = 10;
const DIMENSOES = {rows: 9, columns: 9};


const onClickSquad = (matrix, i, j) => {
    
    if(matrix.IsActiveCount() == 0){
        timerGame.pause();
        timerGame.resume();
    }
    activeSquad(matrix, i, j);
};

const onFlag = (matrix, i, j) => {
    if(matrix[i][j].isActive || matrix[i][j].isFlag)
        matrix[i][j].setIsFlag(false);
    else
        matrix[i][j].setIsFlag(true);

    refresh(matrix);
};

const activeBlankSquad = (matrix, i, j) => {
    if(!matrix[i][j].isActive) {
        matrix[i][j].setIsActive(true);
       
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

const clear = () => {
    document.getElementById('board').innerHTML = '';
};

const refresh = (matrix) => {
    clear();
    if(verifyVictory(matrix)){
        renderVictory(matrix);
    }
    else
        Render(matrix, onClickSquad, onFlag);

};  
  
let count = 0;

const renderClock = () => {
    count++;
    
    let timerElement = document.getElementById('timer-game');

    const minutes = Math.floor(count / 60);
    const seconds = count - (minutes * 60);
    
    timerElement.innerHTML = ((minutes < 10)?'0':'') + minutes + ':' + ((seconds < 10)?'0':'') + seconds;
};

const timerGame = timer(renderClock, 1000);


const start = () => {
    count = 0;
    timerGame.pause();
    let timerElement = document.getElementById('timer-game');
    timerElement.innerHTML = '00:00';
};

const gameOver = (matrix) => {
    timerGame.pause();
    //matrix = activeAllSquad(matrix);
    matrix.ActiveAllSquad();
    refresh(matrix);
    alert('GAME OVER'); 
};

const verifyVictory = (matrix) => {
    
    const squadCount = DIMENSOES.rows * DIMENSOES.columns;

    return squadCount - matrix.IsActiveCount() == BOMBS_TOTAL;
};

const renderVictory = (matrix) => {
    timerGame.pause();
    //matrix = activeAllSquad(matrix);
    matrix.ActiveAllSquad();
    Render(matrix, onClickSquad, onFlag);
    alert('Você venceu');
};

Render(createGame(DIMENSOES.rows, DIMENSOES.columns, BOMBS_TOTAL), onClickSquad, onFlag);

document.getElementById('btn-new-game')
.addEventListener('click', ()=> {
    clear();
    start();
    Render(createGame(DIMENSOES.rows, DIMENSOES.columns, BOMBS_TOTAL), onClickSquad, onFlag);  

});

