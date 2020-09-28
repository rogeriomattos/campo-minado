
const game = () => {

    const createGame = (rows, columns) => {
        const matrix = [];
        for(let i = 0; i < rows; i++){
            matrix.push([]);
            for(let j = 0; j < columns; j++)
            {
                matrix[i].push('1');
            }
        }
        return matrix;
    };

    let matrix = [];

    const start = () => {
        console.log('start');
        matrix = createGame(10, 10);
        renders().board(matrix); 
    };

    const refresh = () => {
        console.log(matrix);
    };

    const renders = () => {
        const board = (matrix) => {
            console.log(matrix);
        };

        return {
            board
        };
    };

    return { 
        start
    };
};

document.getElementById('btn-start')
.addEventListener('click', ()=>{
    game().start();    
});

