// Topping Data
const toppings = [
  "Pepperoni",
  "Canadian Bacon",
  "Bacon",
  "Banana Peppers",
  "Black Olives",
  "Mushrooms",
  "Onions",
  "Bell Peppers",
  "Pineapple",
];

// Initialize Selected Options
const selectedOptions = {
  size: "",
  crust: "",
  toppings: [],
};

// Populate Toppings Section
const toppingList = document.querySelector(".topping-list");
toppings.forEach((topping) => {
  const toppingElement = document.createElement("div");
  toppingElement.classList.add("topping");
  toppingElement.setAttribute("data-value", topping);

  toppingElement.innerHTML = `
    <span>${topping}</span>
    <div class="extra-options">
      <label>Coverage:
        <input type="radio" name="coverage-${topping}" value="Whole" checked> Whole
        <input type="radio" name="coverage-${topping}" value="Left"> Left
        <input type="radio" name="coverage-${topping}" value="Right"> Right
      </label>
      <label>
        Extra:
        <input type="checkbox" name="extra-${topping}">
      </label>
    </div>
  `;

  toppingElement.addEventListener("click", (e) => {
    // Prevent deselecting topping when interacting with inputs
    if (e.target.tagName === "INPUT") return;

    toggleTopping(toppingElement);
  });

  // Add event listeners for changes in coverage and extra options
  const inputs = toppingElement.querySelectorAll(".extra-options input");
  inputs.forEach((input) => {
    input.addEventListener("change", () => updateToppingDetails(topping));
  });

  toppingList.appendChild(toppingElement);
});

// Handle Topping Selection
function toggleTopping(toppingElement) {
  toppingElement.classList.toggle("selected");
  const topping = toppingElement.getAttribute("data-value");

  if (toppingElement.classList.contains("selected")) {
    // Add topping if selected
    if (!selectedOptions.toppings.find((t) => t.name === topping)) {
      selectedOptions.toppings.push({
        name: topping,
        coverage: "Whole",
        extra: false,
      });
    }
  } else {
    // Remove topping if deselected
    selectedOptions.toppings = selectedOptions.toppings.filter(
      (t) => t.name !== topping
    );
  }

  updateOrderSummary();
}

// Update Individual Topping Details
function updateToppingDetails(topping) {
  const toppingData = selectedOptions.toppings.find((t) => t.name === topping);

  if (toppingData) {
    const coverageInput = document.querySelector(
      `input[name="coverage-${topping}"]:checked`
    );
    const extraInput = document.querySelector(
      `input[name="extra-${topping}"]`
    );

    toppingData.coverage = coverageInput ? coverageInput.value : "Whole";
    toppingData.extra = extraInput ? extraInput.checked : false;

    updateOrderSummary();
  }
}

// Handle Size and Crust Selection
document.querySelectorAll(".option").forEach((option) => {
  option.addEventListener("click", () => {
    const parent = option.closest("section").id;
    document
      .querySelectorAll(`#${parent} .option`)
      .forEach((btn) => btn.classList.remove("selected"));

    option.classList.add("selected");
    selectedOptions[parent] = option.getAttribute("data-value");
    updateOrderSummary();
  });
});

// Update Order Summary
function updateOrderSummary() {
  const summaryText = document.getElementById("order-summary-text");
  const { size, crust, toppings } = selectedOptions;

  const toppingsText = toppings
    .map(
      (topping) =>
        `${topping.name} (${topping.coverage}${
          topping.extra ? ", Extra" : ""
        })`
    )
    .join(", ");

  summaryText.textContent = `${size || "Size?"}, ${crust || "Crust?"}, ${
    toppingsText || "No toppings"
  }`;
}

// Make Pizza Button
document.getElementById("make-pizza-button").addEventListener("click", () => {
  alert(`Your pizza is ready to order!`);
});
