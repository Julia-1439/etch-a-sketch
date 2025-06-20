const GRID_WIDTH = 512; // how do u get the value in the stylesheet :3
let cellsPerSide; 

generateNewGrid();

const masterButton = document.querySelector("#generate-new-grid");
console.log(masterButton);
masterButton.addEventListener("click", (e) => {
    resetGrid();
    generateNewGrid();
});



function generateNewGrid() {
    cellsPerSide = +prompt();

    const cellWidth = Math.floor(GRID_WIDTH / cellsPerSide);

    // Add to grid
    const grid = document.querySelector("#grid");

    for (let i = 0; i < cellsPerSide; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < cellsPerSide; j++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.style["width"] = `${cellWidth}px`;
                cell.style["height"] = `${cellWidth}px`;

                cell.addEventListener("mouseover", (e) => {
                    e.target.classList.add("filled-cell");
                });

                row.appendChild(cell);
        }
        grid.appendChild(row);
    }

    
}

function resetGrid() {
    const grid = document.querySelector("#grid");
    const toRemove = document.querySelectorAll(".cell");
    toRemove.forEach((cell) => {cell.parentNode.removeChild(cell); })
}
