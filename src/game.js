import Squad from './squad';

const game = (numberOfRows, numberOfColumns, numberOfBombs) => {
    
    const create = () => {
        let matrix = [];

        for(let i = 0; i < numberOfRows; i++){
            matrix.push([]);
            for(let j = 0; j < numberOfColumns; j++)
            {
                matrix[i].push(new Squad());
            }
        }

        matrix = insertBombs(matrix);

        return matrix;
    };

    const insertBombs = (matrix) => {
    
        let bombInsertedCount = 0;
    
        while(bombInsertedCount < numberOfBombs) {
            
            const row = Math.floor(Math.random() * matrix.length);
            const column = Math.floor(Math.random() * matrix[0].length);
            
            if(doesThisSquareExistInTheMatrix(matrix, row, column) && !isThereABombInThatPosition(matrix, row, column)) {
    
                matrix[row][column].setValue('B'); 
                matrix = insertNumbersAroundTheBomb(matrix, row, column);
                bombInsertedCount++;
            }
        }
        
        return  matrix;
    };

    const insertNumbersAroundTheBomb = (matrix, bombRow, bombColumn) => {

        const ROW_FIRST = bombRow - 1;
        const ROW_LAST = bombRow + 1; 
        const COLUMN_FIRST = bombColumn - 1;
        const COLUMN_LAST = bombColumn + 1;
        
        for(let numberRow = ROW_FIRST; numberRow <= ROW_LAST; numberRow++)
            for(let numberColumn = COLUMN_FIRST; numberColumn <= COLUMN_LAST; numberColumn++)            
            if(doesThisSquareExistInTheMatrix(matrix, numberRow, numberColumn))
                if(!isThereABombInThatPosition(matrix,numberRow, numberColumn))
                        matrix = insertNumberInSquad(matrix, numberRow, numberColumn);
        return matrix;
    };

    const insertNumberInSquad = (matrix, squadRow, squadColumn) => {
        const { value } = matrix[squadRow][squadColumn];
        
        if(value == 'B') return matrix;
        
        let numberInserted = 1;
        
        if(value)
            numberInserted = value + numberInserted;
        
        matrix[squadRow][squadColumn].setValue(numberInserted);
    
        return matrix;
    };

    const doesThisSquareExistInTheMatrix = (matrix, squadRow, squadColumn) => {
        const rowExists = squadRow >= 0 && squadRow < matrix.length;
        const columnExists = rowExists && (squadColumn >= 0 && squadColumn < matrix[squadRow].length);
        
        return rowExists && columnExists;
    };

    const isThereABombInThatPosition = (matrix, row, column) => {
        const { value } = matrix[row][column];
     
         return value == 'B'; 
    };
     
    let matrix = create();

    const insertPropsInArray = () => {
        matrix.IsActiveCount =  () => {
            let count = 0;
            for(let i = 0; i < matrix.length; i++)
                for(let j = 0; j < matrix[i].length; j++)
                    if(matrix[i][j].isActive)
                        count++;
            return count;
        };
    
        matrix.ActiveAllSquad = () => {
            matrix =  matrix.map((row)=>
            (row.map((squad)=> 
                {
                    squad.setIsActive(true);
                    return squad;
                }
            )));
            insertPropsInArray();
        };
    
        matrix.ActiveSquad = (row , column) => {
    
        };
    }

    insertPropsInArray();

    return matrix;
}

export default game;