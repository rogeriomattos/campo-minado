import Render from "./render";

const { default: Squad } = require("./squad");

class Game {
    constructor(options = {numberOfRows: 9, numberOfColumns: 9, numberOfBombs: 10}) {
        const {numberOfRows, numberOfColumns, numberOfBombs} = options;

        this.rows = numberOfRows;
        this.columns = numberOfColumns;
        this.bombs = numberOfBombs;
        this.matrix = this.createMatrix();

        const render = new Render('app', this.matrix);
        console.log(render);
    }
    
    createMatrix() {
        let matrix = [];
        
        for(let i = 0; i < this.rows; i++){
            matrix.push([]);
            for(let j = 0; j < this.columns; j++)
            {
                matrix[i].push(new Squad());
            }
        }
        
        matrix = this.insertBombs(matrix);

        return matrix;
    }

    insertBombs(matrix){
    
        let bombInsertedCount = 0;
    
        while(bombInsertedCount < this.bombs) {
            
            const row = Math.floor(Math.random() * matrix.length);
            const column = Math.floor(Math.random() * matrix[0].length);
            
            if(this.doesThisSquareExistInTheMatrix(matrix, row, column) && !this.isThereABombInThatPosition(matrix, row, column)) {
    
                matrix[row][column].setValue('B'); 
                matrix = this.insertNumbersAroundTheBomb(matrix, row, column);
                bombInsertedCount++;
            }
        }
        
        return  matrix;
    }

    doesThisSquareExistInTheMatrix(matrix, squadRow, squadColumn) {
        const rowExists = squadRow >= 0 && squadRow < matrix.length;
        const columnExists = rowExists && (squadColumn >= 0 && squadColumn < matrix[squadRow].length);
        
        return rowExists && columnExists;
    }

    isThereABombInThatPosition(matrix, row, column) {
        const { value } = matrix[row][column];
     
         return value == 'B'; 
    }

    insertNumbersAroundTheBomb(matrix, bombRow, bombColumn) {

        const ROW_FIRST = bombRow - 1;
        const ROW_LAST = bombRow + 1; 
        const COLUMN_FIRST = bombColumn - 1;
        const COLUMN_LAST = bombColumn + 1;
        
        for(let numberRow = ROW_FIRST; numberRow <= ROW_LAST; numberRow++)
            for(let numberColumn = COLUMN_FIRST; numberColumn <= COLUMN_LAST; numberColumn++)            
                if(this.doesThisSquareExistInTheMatrix(matrix, numberRow, numberColumn))
                    if(!this.isThereABombInThatPosition(matrix,numberRow, numberColumn))
                            matrix = this.insertNumberInSquad(matrix, numberRow, numberColumn);
        return matrix;
    }

    insertNumberInSquad(matrix, squadRow, squadColumn){
        const { value } = matrix[squadRow][squadColumn];
        
        if(value == 'B') return matrix;
        
        let numberInserted = 1;
        
        if(value)
            numberInserted = value + numberInserted;
        
        matrix[squadRow][squadColumn].setValue(numberInserted);
    
        return matrix;
    }
    
    start() {

    }
}

export default Game;
