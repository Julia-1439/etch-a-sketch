const ALPHA_CHANNEL_IDX = 3;

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
                cell.addEventListener("mouseover", darkenCell);
                
                row.appendChild(cell);
        }
        grid.appendChild(row);
    }
}

function darkenCell(e) {
    const cell = e.target;
    cell.classList.add("filled");

    // Extract the background opacity from a style rule of the form
    // "rgba(0, 0, 0, <bg-opacity>)" in order to increase it, darkening the cell
    const currBgOpacity = +getComputedStyle(cell)["background-color"]
        .replace(")", "").split(",").at(ALPHA_CHANNEL_IDX);
    
    // currBgOpacity would be 'undefined' once the alpha channel hits 1 since
    // the rgba string returned will omit the alpha channel. In this case, do
    // nothing to the cell.
    if (currBgOpacity == null) {
        return;
    }
    
    const newBgOpacity = Math.min(currBgOpacity + 0.10, 1.0);
    cell.style["background-color"] = `rgba(0 0 0 / ${newBgOpacity})`
}
