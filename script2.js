// ---------------- MAIN -----------------

const gridContainer = document.getElementById("grid-container");
// for button
const btnSingleDiv = document.getElementById("selectNumberBtn");
const btnHouseDiv = document.getElementById("selectRowBtn");
const btnEndingDiv = document.getElementById("selectColumnBtn");

//   for form
const selectedNumberField = document.getElementById("selectedNumber");
const selectedRowField = document.getElementById("selectedRow");
const selectedColumnField = document.getElementById("selectedColumn");

let selectedNumberSpanDiv = document.getElementById("selectedNumberSpan");

const numbers = [];

for (let i = 0; i < 100; i++) {
  numbers.push(i);
}

// creating array with 100 numbers;
for (let number of numbers) {
  const numberElement = document.createElement("div");
  numberElement.classList.add("number");
  numberElement.textContent = number;

  gridContainer.appendChild(numberElement);
}

const numberElementDiv = document.querySelectorAll(".number");

let lastTapElement = null;

let row = 10;
let col = 10;

let storedValue = [];
let houseStoredValue;

numberElementDiv.forEach((element) => {
  // storing element as number for future use
  let numberElement = parseInt(element.textContent);

  // function for double click on single
  const doubleClick = () => {
    houseStoredValue = "Single";

    if (storedValue.includes(numberElement)) {
      const index = storedValue.indexOf(numberElement);
      storedValue.splice(index, 1);
      element.classList.remove("active");
    } else {
      element.classList.add("active");
      storedValue.push(numberElement);
    }
  };

  //  function for double click on house/row
  const rowDoubleClick = () => {
    let rowIndex = Math.floor(numberElement / col);
    storedValue = [];
    houseStoredValue = "";

    numberElementDiv.forEach((element, index) => {
      if (Math.floor(index / col) === rowIndex) {
        element.classList.toggle("active");
        storedValue.push(parseInt(element.innerText));
        houseStoredValue = "House";
      }
    });
  };

  // function for Column click on ending/column
  const colDoubleClick = () => {
    let colIndex = Math.floor(numberElement % 10);

    storedValue = [];
    houseStoredValue = "";

    numberElementDiv.forEach((element, index) => {
      if (Math.floor(index % col) === colIndex) {
        element.classList.toggle("active");
        storedValue.push(parseInt(element.innerText));
        houseStoredValue = "Ending";
      }
    });
  };

  element.addEventListener("click", () => {
    if (btnSingleDiv.classList.contains("active")) {
      doubleClick();
    } else if (btnHouseDiv.classList.contains("active")) {
      removeSelected();

      rowDoubleClick();
    } else if (btnEndingDiv.classList.contains("active")) {
      removeSelected();

      colDoubleClick();
    }
  });
});

//  function to remove selected digits when move to single/house/ending
const removeSelected = () => {
  lastTapElement = null;
  numberElementDiv.forEach((element) => {
    element.classList.remove("active");
  });
};

// Function to create hover effect in Houses

btnSingleDiv.addEventListener("click", () => {
  storedValue = [];
  removeSelected();
  btnSingleDiv.classList.add("active");
  btnHouseDiv.classList.remove("active");
  btnEndingDiv.classList.remove("active");
});
btnHouseDiv.addEventListener("click", () => {
  removeSelected();

  btnSingleDiv.classList.remove("active");
  btnHouseDiv.classList.add("active");
  btnEndingDiv.classList.remove("active");
});
btnEndingDiv.addEventListener("click", () => {
  removeSelected();

  btnSingleDiv.classList.remove("active");
  btnHouseDiv.classList.remove("active");
  btnEndingDiv.classList.add("active");
});

//   for pop up output
const selectedHouseDiv = document.querySelector(".selectedHouseSpan");

selectNumberBtn.addEventListener("click", () => {
  selectedValue.classList.add("selectingSingle");
  selectedValue.classList.remove("selectingRows");
  selectedValue.classList.remove("selectingColumns");

  selectedHouseDiv.innerHTML = "Single";
  clearHoverEffects();
});

selectRowBtn.addEventListener("click", () => {
  selectedValue.classList.add("selectingRows");
  selectedValue.classList.remove("selectingSingle");
  selectedValue.classList.remove("selectingColumns");
  selectedHouseDiv.innerHTML = "House";
  clearHoverEffects();
});

selectColumnBtn.addEventListener("click", () => {
  selectedValue.classList.add("selectingColumns");
  selectedValue.classList.remove("selectingSingle");
  selectedValue.classList.remove("selectingRows");
  selectedHouseDiv.innerHTML = "Ending";

  clearHoverEffects();
});

//   function to clear existing hover effects
function clearHoverEffects() {
  const allNumbers = document.querySelectorAll(".number");
  allNumbers.forEach((element) => {
    element.classList.remove("rowHover", "columnHover", "singleHover");
  });
}

function selectItem(element) {
  // remove active class from all items
  const items = document.querySelectorAll(".btn");
  items.forEach((item) => item.classList.remove("active"));

  // add "active " class to the clicked item
  element.classList.add("active");
}

// ! ------------------ ONCLICK ON NUMBERS ----------------------

// popup
const bookBtn = document.querySelector(".bookBtn");
const formDiv = document.querySelector(".formContainer");
const mainDiv = document.querySelector(".containerMain");
const closeDiv = document.querySelector(".close");

bookBtn.addEventListener("click", () => [
  formDiv.classList.add("addForm"),
  mainDiv.classList.add("blurBody"),

  selectedNumberSpanDiv.innerText = storedValue

  
]);

closeDiv.addEventListener("click", () => {
  formDiv.classList.remove("addForm"), mainDiv.classList.remove("blurBody");
});

//   ------- FOR RESULT 5 = 400, 10 = 800

// Get a reference to the input element and the result div
const amountInput = document.getElementById("amountInput");
const resultDiv = document.getElementById("resultDiv");

//  -------adding 1st round and 2nd round --------
const firstRoundDiv = document.querySelector(".firstRound");
const secondRoundDiv = document.querySelector(".secondRound");

firstRoundDiv.addEventListener("click", () => {
  firstRoundDiv.classList.add("active");
  secondRoundDiv.classList.remove("active");
  resultDiv.innerText = "0";
});

secondRoundDiv.addEventListener("click", () => {
  firstRoundDiv.classList.remove("active");
  secondRoundDiv.classList.add("active");

  resultDiv.innerText = "0";
});

// Get a reference to the input element and the result div
amountInput.addEventListener("input", function () {
  // Get the current value from the input
  let currentValue = parseInt(amountInput.value);

  // if 1st round is click
  if (firstRoundDiv.classList.contains("active")) {
    // check if the value is a valid number

    if (!isNaN(currentValue)) {
      // calculate the result
      let result = currentValue * 80; //assuming 5=400,10=800
      // update the result Div
      resultDiv.textContent = `${result}`;
    }
  }
  if (secondRoundDiv.classList.contains("active")) {
    // check if the value is a valid number

    if (!isNaN(currentValue)) {
      // calculate the result

      let result = currentValue * 60; //assuming 5=400,10=800
      // update the result Div
      resultDiv.textContent = `${result}`;
    }
  }
});

//  to limit the input in amount not go below 0
function validateInput() {
  let inputElement = document.getElementById("amountInput");
  let minValue = 0;
  let step = parseFloat(inputElement.getAttribute("step"));

  if (inputElement.value < minValue) {
    inputElement.value = minValue;
  }
}

// validate form
function validateForm() {
  let numberDiv = document.querySelector(".numberInput").value;
  let nameDiv = document.querySelector(".nameInput").value;
  let amountDiv = document.querySelector("#amountInput").value;
  var phonePattern = /^\d{10}$/;

  if (numberDiv === "" || nameDiv === "" || amountDiv === "") {
    alert("all fields are required");
    return false;
  }
  if (!phonePattern.test(numberDiv)) {
    alert("Please enter a valide 10-digit phone number.");
    return false;
  }
  return true;
}
