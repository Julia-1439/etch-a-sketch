const masterButton = document.querySelector("#generate");
masterButton.addEventListener("click", (e) => {
    clearGrid();
    const cellsPerSide = promptGridSize();
    generateNewGrid(cellsPerSide);
});

function clearGrid() {
    document.querySelectorAll(".row, .cell").forEach((elem) => {
        elem.parentNode.removeChild(elem)
    });
}

function promptGridSize() {
    while (true) {
        let cellsPerSide = +prompt("Let's make a sketch!\nHow many squares per side would you like?");
        if (cellsPerSide > 100 || !cellsPerSide) {
            alert("Grid size must be at most 100×100. Please try again.");
            continue;
        }
        return cellsPerSide;
    }
}

function generateNewGrid(cellsPerSide) {
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

