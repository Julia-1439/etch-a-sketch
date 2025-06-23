const masterButton = document.querySelector("#generate");
masterButton.addEventListener("click", (e) => {
    clearGrid();
    while (true) {
        const userInputForNewGrid = prompt("Let's make a sketch!\nHow many squares per side would you like?");

        // Check for escape key pressed or cancel button clicked
        if (userInputForNewGrid == null) {
            break;
        }
        // If an input is provided, ensure it is a number between 0 and 100
        if(isNaN(+userInputForNewGrid) || +userInputForNewGrid <= 0 
            || +userInputForNewGrid > 100) {
            alert("Grid size must be at most 100×100. Please try again.");
            continue;
        }
        
        const cellsPerSide = +userInputForNewGrid;
        generateNewGrid(cellsPerSide);
        break;
    }
});

function clearGrid() {
    document.querySelectorAll(".row, .cell").forEach((elem) => {
        elem.parentNode.removeChild(elem)
    });
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
                    const cell = e.target;
                    if (!cell.classList.contains("filled")) {
                        assignRandomColor(cell);
                    }
                    darkenCell(cell);
                });
                
                row.appendChild(cell);
        }
        grid.appendChild(row);
    }
}

function assignRandomColor(cell) {
    const [randR, randG, randB] = 
        Array.from({length: 3}, () => Math.floor(Math.random() * 256));
    cell.style["background-color"] = `rgba(${randR} ${randG} ${randB} / 0.0)`
    cell.classList.add("filled");
}

/**
 * 
 * @param {string} rgbaStr a string of the form "rgba(r, g, b, alpha)" or
 * "rgb(r, g, b)"
 * @returns array containing the r, g, b, alpha values
 */
function rgbaExtractHelper(rgbaStr) {
    const undesiredStrs = ["rgb", "a", "(", ")", " "];
    for (const s of undesiredStrs) {
        rgbaStr = rgbaStr.replace(s, "");
    }
    const [r, g, b, a] = rgbaStr.split(",").map(Number);
    return [r, g, b, a]
}

function darkenCell(cell) {
    const bgColor = getComputedStyle(cell)["background-color"];
    const [r, g, b, currAlpha] = rgbaExtractHelper(bgColor);

    // Alpha value would become 'undefined' once the alpha channel hits 1 since
    // bgColor will omit the alpha channel. In this case, do not darken the 
    // cell. 
    if (currAlpha == null) {
        return;
    }
    
    // The new alpha value is explicitly capped at 1.0 with Math.min() for 
    // safety. 
    const newAlpha = Math.min(currAlpha + 0.10, 1.0);
    cell.style["background-color"] = `rgba(${r} ${g} ${b} / ${newAlpha})`
}
