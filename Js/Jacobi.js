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

// js funciton 2: jacobiMethod()
function jacobiMethod(matrix, n, iterations) {
  const stepDiv = document.getElementById("innerStep");
  
  stepDiv.innerHTML = ""; // Clear previous content
  innerStep.style.display = "block";
  solutionHead.style.display = "block";
  let x = new Array(n).fill(0);

  for (let iteration = 0; iteration < iterations; iteration++) {
    stepDiv.innerHTML += `<span style="color:rgb(109, 9, 148)">Iteration ${
      iteration + 1
    }: </span>`;
    let newX = new Array(n);

    for (let i = 0; i < n; i++) {
      let sum = matrix[i][n];
      for (let j = 0; j < n; j++) {
        if (i !== j) {
          sum -= matrix[i][j] * x[j];
        }
      }
      newX[i] = sum / matrix[i][i];
      stepDiv.innerHTML += `x${i + 1} = ${newX[i].toFixed(4)} `;
    }

    stepDiv.innerHTML += `<br>`;
    let cnt = 0;
    for (let i = 0; i < n; i++) {
      console.log(`${newX[i]} `);
      if (Math.abs(x[i] - newX[i]) < 0.001) {
        cnt++;
      }
    }
    console.log(`\n`);

    x = [...newX];
    if (cnt == n) {
      break;
    }
  }
  // matrix = x;
  for (let i = 0; i < x.length; i++) {
    matrix[i][n] = x[i];
  }
}
// js funciton 1: solve()
function solve() {
  const matrixRows = document.getElementById("matrixInput").rows;
  const calculatorSection = document.getElementById("calculatorSection");
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
  jacobiMethod(augmentedMatrix, n, 10); // You can adjust the number of iterations

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

    toggleBtn.style.left = "10%";
    toggleBtn.innerHTML = "calculator";
    toggleBtn.style.backgroundColor = "rgb(4, 136, 255)";
  }
}
