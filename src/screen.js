import handleClick from './handle-click';
const click = handleClick();
const BOMB_IMG_BASE_64 = 'data:image/svg+xml;utf8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDYwIDYwIiB2aWV3Qm94PSIwIDAgNjAgNjAiPjxwYXRoIGQ9Ik01MC40NTAyNTYzIDEwLjA3MTQxMTFjLS4xOTAwMDI0LS4zODk5NTM2LS42MTk5OTUxLS41OTk5NzU2LTEuMDQwMDM5MS0uNTM5OTc4bC0zLjk2OTk3MDcuNjE5OTk1MUw0My42MzAyNDkgNi41ODE0MjA5Yy0uMTkwMDAyNC0uMzkwMDE0Ni0uNjA5OTg1NC0uNjA5OTg1NC0xLjAzOTk3OC0uNTM5OTc4LS40MzAwNTM3LjA1OTk5NzYtLjc3MDAxOTUuMzk5OTYzNC0uODQwMDI2OS44MzAwMTcxbC0uNjQwMDE0NiAzLjk0OTk1MTItMy45Njk5NzA3LjYxOTk5NTFjLS40MjAwNDM5LjA3MDAwNzMtLjc2MDAwOTguNDAwMDI0NC0uODMwMDE3MS44MzAwMTcxcy4xNTAwMjQ0Ljg1MDAzNjYuNTMwMDI5MyAxLjA0OTk4NzhsMS4zNTUxNjM2LjY5Mjc0OWMtLjA5ODQ0OTcuMDQ5NjIxNi0uMTk2Nzc3My4xMDgyNzY0LS4yOTUxNjYuMTY3Mjk3NC0yLjEyMDA1NjIgMS4yODk5NzgtMy4zMjAwMDczIDQuMDcwMDA3My0zLjg3MDA1NjIgNS42OTk5NTEybC0yLjkyOTk5MjctMS42NTk5NzMxYy0uNDc5OTgwNS0uMjcwMDE5NS0xLjA4OTk2NTgtLjA5OTk3NTYtMS4zNjk5OTUxLjM4MDAwNDlsLTEuNDUwMDEyMiAyLjU0OTk4NzhjMS44ODAwMDQ5LjM1MDAzNjYgMy43MDAwMTIyIDEuMDIwMDE5NSA1LjM4MDAwNDkgMS45NzAwMzE3IDEuNzEwMDIyLjk2OTk3MDcgMy4yMDAwMTIyIDIuMTkwMDAyNCA0LjQ0MDAwMjQgMy41ODk5NjU4bDEuNDUwMDEyMi0yLjU1OTk5NzZjLjI3MDAxOTUtLjQ3OTk4MDUuMTAwMDM2Ni0xLjA4OTk2NTgtLjM4MDAwNDktMS4zNTk5ODU0bC0zLjM1OTk4NTQtMS45MDAwMjQ0Yy40NTAwMTIyLTEuNDc5OTgwNSAxLjUtNC4wMTAwMDk4IDMuMTQwMDE0Ni01LjAxMDAwOTguNDQ5OTUxMi0uMjc5OTY4My45Mjk5MzE2LS40MTk5ODI5IDEuNDE5ODYwOC0uNDE5OTgyOWwtLjU4OTkwNDggMy42NTAwMjQ0Yy0uMDY5OTQ2My40Mjk5OTI3LjE0MDAxNDYuODQ5OTc1Ni41MzAwMjkzIDEuMDQ5OTg3OC4xNDAwMTQ2LjA3MDAwNzMuMjk5OTg3OC4xMDk5ODU0LjQ1MDAxMjIuMTA5OTg1NC4yNjAwMDk4IDAgLjUxOTk1ODUtLjA5OTk3NTYuNzA5OTYwOS0uMjg5OTc4bDIuODQwMDI2OS0yLjgzMDAxNzEgMy41NzAwMDczIDEuODMwMDE3MWMuMzkwMDE0Ni4yMDAwMTIyLjg1OTk4NTQuMTMwMDA0OSAxLjE1OTk3MzEtLjE3OTk5MjcuMzA5OTk3Ni0uMjk5OTg3OC4zOTAwMTQ2LS43NzAwMTk1LjE5MDAwMjQtMS4xNjAwMzQybC0xLjc5OTk4NzgtMy41Nzk5NTYxIDIuODQwMDI2OS0yLjgzMDAxNzFDNTAuNTcwMjUxNSAxMC45MjE0NDc4IDUwLjY1MDI2ODYgMTAuNDYxNDI1OCA1MC40NTAyNTYzIDEwLjA3MTQxMTF6TTMyLjY3MDIyNzEgMjQuODYxNDUwMmMtNy40Njk5NzA3LTQuMjMwMDQxNS0xNi45ODk5OTAyLTEuNTkwMDI2OS0yMS4yMTk5NzA3IDUuODc5OTQzOC00LjIyMDAzMTcgNy40NzAwMzE3LTEuNTgwMDE3MSAxNi45OTAwNTEzIDUuODkwMDE0NiAyMS4yMjAwMzE3IDIuNDA5OTczMSAxLjM1OTk4NTQgNS4wMzk5NzggMi4wMTAwMDk4IDcuNjM5OTUzNiAyLjAxMDAwOTggNS40Mjk5OTI3IDAgMTAuNzEwMDIyLTIuODQwMDI2OSAxMy41NzAwMDczLTcuOTAwMDI0NEM0Mi43ODAyMTI0IDM4LjYwMTQ0MDQgNDAuMTQwMjU4OCAyOS4wOTE0MzA3IDMyLjY3MDIyNzEgMjQuODYxNDUwMnpNMjAuOTYwMjY2MSA0Ny41OTE0MzA3Yy0uMTgwMDUzNy4zMjAwMDczLS41MjAwMTk1LjUtLjg2OTk5NTEuNS0uMTcwMDQzOSAwLS4zNDAwMjY5LS4wNDAwMzkxLS40OTAwNTEzLS4xMzAwMDQ5LTUuNDQ5OTUxMi0zLjA4MDAxNzEtNy4zODAwMDQ5LTEwLjAyMDAxOTUtNC4yODk5NzgtMTUuNDcwMDMxNy4yNzAwMTk1LS40Nzk5ODA1Ljg4MDAwNDktLjY0OTk2MzQgMS4zNTk5ODU0LS4zNzk5NDM4LjQ4MDA0MTUuMjY5OTU4NS42NTAwMjQ0Ljg3OTk0MzguMzgwMDA0OSAxLjM1OTk4NTQtMi41Mzk5NzggNC40ODk5OTAyLS45NTk5NjA5IDEwLjIwOTk2MDkgMy41MzAwMjkzIDEyLjc1QzIxLjA2MDI0MTcgNDYuNDkxMzk0IDIxLjIzMDIyNDYgNDcuMTAxNDQwNCAyMC45NjAyNjYxIDQ3LjU5MTQzMDd6Ii8+PC9zdmc+';
const FLAG_IMG_BASE_64 = 'data:image/svg+xml;utf8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBkPSJNMjMuMjgsMTRsMy41LTQuMzc1QTEsMSwwLDAsMCwyNiw4SDlWN0ExLDEsMCwwLDAsOSw1SDdBMSwxLDAsMCwwLDcsN1YyNUg2YTEsMSwwLDAsMCwwLDJoNGExLDEsMCwwLDAsMC0ySDlWMjBIMjZhMSwxLDAsMCwwLC43ODEtMS42MjVaTTksMThWMTBIMjMuOTE5bC0yLjcsMy4zNzVhMSwxLDAsMCwwLDAsMS4yNUwyMy45MTksMThaIi8+PC9zdmc+';

const Clear = () => {
    document.getElementById('board').innerHTML = '';
};

const Refresh = (matrix,onClickSquad) =>{
    Clear();
    Render(matrix,onClickSquad);
}

const Render = (matrix, onClickSquad) => {
    
    let boardElement = document.getElementById('board');

    for(let i = 0; i < matrix.length; i++){
        let row = document.createElement('div');
        row.className = 'row';
        boardElement.appendChild(row);
        for(let j = 0; j < matrix[i].length; j++)
        {
            let squadElement = document.createElement('div');
            squadElement.className = 'squad';
            
            if(matrix[i][j].isActive) {
                squadElement.innerHTML = (matrix[i][j].value)?matrix[i][j].value:'';
                squadElement.className = squadElement.className + ' isActive';
            }    

            if(!matrix[i][j].isActive && matrix[i][j].isFlag){
                squadElement.innerHTML = '';
                squadElement.className = squadElement.className + ' isFlaged';
                
                let flagImg = document.createElement('img');
                
                flagImg.src = FLAG_IMG_BASE_64;
                squadElement.appendChild(flagImg);
            }else {
                squadElement.classList.remove('isFlaged');
            }
            
            if(matrix[i][j].value == 'B' && matrix[i][j].isActive) {
                squadElement.className = squadElement.className + ' bomb';
                squadElement.innerHTML = '';
                let bombImg = document.createElement('img');
                bombImg.src = BOMB_IMG_BASE_64;
                squadElement.appendChild(bombImg);
            }
            if(matrix[i][j].value == 1 && matrix[i][j].isActive) {
                squadElement.style.color = 'blue';
            }
            if(matrix[i][j].value == 2 && matrix[i][j].isActive) {
                squadElement.style.color = 'green';
            }
            if(matrix[i][j].value == 3 && matrix[i][j].isActive) {
                squadElement.style.color = 'yellow';
            }

            squadElement.addEventListener('click', ( event) => {
                onClickSquad(matrix, i, j);
            });
            squadElement.addEventListener('contextmenu', () => {
                matrix[i][j] = click.onFlag(matrix[i][j]);
                Refresh(matrix,onClickSquad);
            });
            row.appendChild(squadElement);
        }

    }
};

export  { Render, Clear, Refresh };