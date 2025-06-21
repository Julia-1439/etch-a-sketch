generateNewGrid();
function clearGrid() {
    document.querySelectorAll(".row, .cell").forEach((elem) => {
        elem.parentNode.removeChild(elem)
    });
}

function generateNewGrid() {
    let cellsPerSide = 16; // Temporary value. Will replace with user input
    
    const grid = document.querySelector("#grid");
    for (let r = 0; r < cellsPerSide; r++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (let c = 0; c < cellsPerSide; c++) {
                const cell = document.createElement("div");
                
                cell.classList.add("cell");
                cell.addEventListener("mouseover", (e) => {
                    e.target.classList.add("filled");
                })
                
                row.appendChild(cell);
        }
        grid.appendChild(row);
    }
}

