// js funciton 1: createMatrixInput()
function createMatrixInput() {
  const equationCountInput = document.getElementById("equationCount");
  const n = parseInt(equationCountInput.value);
  if (isNaN(n) || n <= 0) {
    alert("Please enter a valid number of equations.");
    return;
  }
  
  const matrixContainer = document.getElementById("matrixContainer");
  matrixContainer.innerHTML = "";

  const table = document.createElement("table");
  table.id = "matrixInput";

  for (let i = 0; i < n; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j <= n; j++) {
      const cell = document.createElement("td");
      const input = document.createElement("input");
      input.type = "number";
      input.step = "any";
      input.placeholder = `Element ${i + 1}${j + 1}`;
      cell.appendChild(input);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  matrixContainer.appendChild(table);
}

// js funciton 2: gaussianElimination()
function gaussianElimination(matrix, n) {
  const stepDiv = document.getElementById("innerStep");
  stepDiv.innerHTML = ""; // Clear the content before starting
  innerStep.style.display = "block";
  solutionHead.style.display = "block";
  let stage = "a";
  for (let i = 0; i < n; i++) {
    // Partialstyleg to avoid division by small numbers
    console.log(i);

    // Create a new div for each step
    const stepContainer = document.createElement("div");
    stepContainer.innerHTML = ` Step${i + 1}: <br>`;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j <= n; j++) {
        stepContainer.innerHTML += `${matrix[i][j]
          .toFixed(4)
          .padStart(
            8
          )} <span style="font-weight: bold; color:#D4AF37">(${stage}${i + 1}${
          j + 1
        })</span>   `;
        let incrementedChar = String.fromCharCode(stage.charCodeAt(0) + 1);
        stage = incrementedChar;
        console.log(stage);
      }
      stepContainer.innerHTML += `<br>`;
      stage = "a";
    }
    stepContainer.innerHTML += `Step${i + 1} end: <br> <hr>`;

    stepDiv.appendChild(stepContainer);

    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(matrix[k][i]) > Math.abs(matrix[maxRow][i])) {
        maxRow = k;
      }
    }

    [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];

    // Make the diagonal element 1
    const pivot = matrix[i][i];
    if (Math.abs(pivot) < 0.0005) {
      // Matrix is singular or nearly singular
      console.log("Matrix is singular or nearly singular.");
      return;
    }

    for (let j = i; j <= n; j++) {
      matrix[i][j] /= pivot;
    }

    // Make other elements in the column zero
    for (let k = 0; k < n; k++) {
      if (k !== i) {
        const factor = matrix[k][i];
        for (let j = i; j <= n; j++) {
          matrix[k][j] -= factor * matrix[i][j];
        }
      }
    }
  }
}

// js funciton 1: solve()
function solve() {
  const matrixRows = document.getElementById("matrixInput").rows;
  const n = matrixRows.length;

  const augmentedMatrix = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j <= n; j++) {
      const input = matrixRows[i].cells[j].children[0];
      row.push(parseFloat(input.value));
    }
    console.log(row);
    augmentedMatrix.push(row);
  }
  console.log(augmentedMatrix);
  // Perform Jacobi's Method
  gaussianElimination(augmentedMatrix, n); // You can adjust the number of iterations

  // Display solutions
  solutions.style.display = "block";
  const solutionsDiv = document.getElementById("solutions");
  solutionsDiv.innerHTML = "Final Solutions: <br>";
  for (let i = 0; i < n; i++) {
    solutionsDiv.innerHTML += `x${i + 1} = ${augmentedMatrix[i][n].toFixed(
      4
    )}<br>`;
  }
}

function toggleSections() {
  const calculatorSection = document.getElementById("calculatorSection");
  const blogSection = document.getElementById("blogSection");
  const toggleBtn = document.querySelector(".toggle-btn");
  const blogDetails = document.getElementById("blogDetailsID");

  if (
    calculatorSection.style.display === "none" ||
    calculatorSection.style.display === ""
  ) {
    // Show calculator, hide blog
    calculatorSection.style.display = "flex";
    // main.style.display = 'inline-block';
    blogSection.style.display = "none";
    // Adjust padding for a centered look
    calculatorSection.style.padding = "20px";
    calculatorSection.style.justifyContent = "center";
    calculatorSection.style.alignItems = "center";

    toggleBtn.style.left = "10%";
    toggleBtn.innerHTML = "blog";
    toggleBtn.style.backgroundColor = "rgb(199, 81, 245)";
  } else {
    // Show blog, hide calculator
    calculatorSection.style.display = "none";
    blogSection.style.display = "flex";
    // main.style.display = 'inline-block';
    // Adjust padding for a centered look
    blogSection.style.padding = "20px";
    blogSection.style.justifyContent = "center";
    blogSection.style.alignItems = "center";
    blogDetails.style.marginLeft = "15%";
    blogDetails.style.marginRight = "15%";

    toggleBtn.style.left = "10%";
    toggleBtn.innerHTML = "calculator";
    toggleBtn.style.backgroundColor = "rgb(4, 136, 255)";
  }
}
