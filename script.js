/* Add event listeners to page elements ===================================== */
const masterButton = document.querySelector("#generate");
masterButton.addEventListener("click", handleMasterBtnClick);

const grid = document.querySelector("#grid");
grid.addEventListener("mouseover", handleGridMouseover);

/* Event handlers =========================================================== */

function handleMasterBtnClick() {
    while (true) {
        const userInputForNewGrid = prompt("Let's make a sketch!\nHow many squares per side would you like?");
        
        /* Input validation */
        // Check for escape key / cancel button / refresh button pressed
        if (userInputForNewGrid == null) {
            break;
        }
        // If an input is provided, ensure it is a number between 0 and 100
        if(isNaN(+userInputForNewGrid) || +userInputForNewGrid <= 0 
        || +userInputForNewGrid > 100) {
            alert("Grid size must be at most 100×100. Please try again.");
            continue;
        }
        
        clearGrid();
        const cellsPerSide = +userInputForNewGrid;
        generateNewGrid(cellsPerSide);
        break;
    }
}

function handleGridMouseover(evt) {
    const target = evt.target; 
    if (target.id === "grid" || target.classList.contains("row")) {
        return;
    }

    const cell = target;
    if (!cell.classList.contains("filled")) {
        assignRandomColor(cell);
    }
    darkenCell(cell);
}

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

    // Alpha value would become 'undefined' once the alpha channel hits or
    // exceeds 1.0 since bgColor will omit the alpha channel. In this case, do 
    // not attempt to darken the cell. 
    if (currAlpha == null) {
        return;
    }
    
    const newAlpha = currAlpha + 0.20;
    cell.style["background-color"] = `rgba(${r} ${g} ${b} / ${newAlpha})`
}
