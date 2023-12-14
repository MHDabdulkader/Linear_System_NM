function toggleSections() {
    const calculatorSection = document.getElementById("blogSection2");
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
      toggleBtn.innerHTML = "Jacobic Blog";
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
      toggleBtn.innerHTML = "Gaussian Blog";
      toggleBtn.style.backgroundColor = "rgb(4, 136, 255)";
    }
  }
  