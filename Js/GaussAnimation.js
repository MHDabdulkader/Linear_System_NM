let matrix = [
    [2, 1, -1, 8],
    [-3, -1, 2, -11],
    [-2, 1, 2, -3]
];

function displayMatrix() {
    const matrixContainer = d3.select("#matrix-container");

    matrixContainer.selectAll("*").remove();

    matrix.forEach((row, i) => {
        const rowContainer = matrixContainer.append("div").classed("row", true);
        row.forEach((cell, j) => {
            const cellDiv = rowContainer.append("div").classed("cell", true).text(cell);
            if (i === pivotRow) {
                cellDiv.classed("highlight", true);
            }
        });
    });
}

function animateGaussianElimination() {
    animatePivotSelection(0); // Animation for the first pivot selection
}

function animatePivotSelection(pivotRow) {
    gsap.to("#matrix-container .row:nth-child(" + (pivotRow + 1) + ") .cell", {
        backgroundColor: "#ffcc00", // Highlight the pivot row
        duration: 0.5,
        onComplete: function () {
            animateRowOperations(pivotRow);
        }
    });
}

function animateRowOperations(pivotRow) {
    gsap.to("#matrix-container .row", {
        y: function (_, index) {
            return index === pivotRow ? 0 : 40; // Move non-pivot rows down
        },
        duration: 0.5,
        onComplete: function () {
            solveForVariables(pivotRow);
        }
    });
}

function solveForVariables(pivotRow) {
    // Implement solving for variables animation
    // You can use GSAP to animate the variable values or any other visual representation
    gsap.to("#matrix-container .cell", {
        scale: 1.2,
        duration: 0.5,
        onComplete: function () {
            // Further animations or actions
            gsap.to("#matrix-container .cell", {
                scale: 1, // Scale back to the original size
                duration: 0.5,
                onComplete: function () {
                    // Additional animations or actions can be added here
                    console.log("Animation complete!");
                }
            });
        }
    });
}

// Initial display
displayMatrix();
