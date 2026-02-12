const fieldSets = document.querySelectorAll(".form__group");
const checkboxElements = document.querySelectorAll('input[type="checkbox"]');
const formEl = document.getElementById("multiStepForm");
const dotButtons = document.querySelectorAll(".btn__dot");

let currentStep = 1;
let dotSteps = currentStep;

function showStep(step) {
  fieldSets.forEach((el) => {
    const stepEl = Number(el.dataset.step);

    if (step === stepEl) {
      el.classList.add("show-step");
      el.disabled = false;
    } else {
      el.classList.remove("show-step");
      el.disabled = true;
    }
  });
}

function showDotNavigation(step) {
  dotButtons.forEach((el) => {
    const btnStep = Number(el.dataset.btnStep);

    if (btnStep === step) {
      el.classList.add("btn__dot--active");
    } else {
      el.classList.remove("btn__dot--active");
    }
  });

  // Display number step
  document.getElementById("currentStep").textContent = step;
}

function continueStep() {
  if (dotSteps !== currentStep) {
    return nextStep();
  }

  if (currentStep === 3) return;

  currentStep++;
  dotSteps = currentStep;

  if (currentStep <= 3) {
    showStep(currentStep);
    showDotNavigation(currentStep);
  }
}

function nextStep() {
  dotSteps++;

  showStep(dotSteps);
  showDotNavigation(dotSteps);
}

function prevStep() {
  dotSteps--;

  showStep(dotSteps);
  showDotNavigation(dotSteps);
}

// It returns an object if type (text, email, checkbox) inputs are empty
function validateForm(fields) {
  const errors = {};
  let checkboxOptions = 0;

  fields.forEach((inputEl, index) => {
    if (inputEl.type === "checkbox") {
      if (inputEl.checked) checkboxOptions++;
      if (checkboxOptions === 0 && index === fields.length - 1) {
        errors["option3"] = "Please, choose one or more options";
      }
    } else if (!inputEl.value.trim()) {
      errors[inputEl.name] = `The ${inputEl.name} field is required`;
    }
  });

  return errors;
}

// Display error UI feedback when inputs are empty
function showError(errors) {
  // Clean previous errors - It updates the DOM if there are valid inputs
  const errorElements = document.querySelectorAll(".error-message");
  if (errorElements.length > 0) {
    removeError(errorElements);
  }

  for (const [key, value] of Object.entries(errors)) {
    const targetInput = document.getElementsByName(key)[0];

    // Create an span element for each invalid input
    const span = document.createElement("span");
    span.className = "error-message";
    span.textContent = value;

    if (targetInput.type === "checkbox") {
      targetInput.parentElement.parentElement.appendChild(span);
    } else {
      targetInput.classList.add("error-outline");
      targetInput.parentElement.appendChild(span);
    }
  }
}

// Removes existing error elements in the DOM
function removeError(errorElements) {
  // Remove elements with the class "error-message"
  errorElements.forEach((el) => {
    const previousElement = el.previousElementSibling;

    // Remove the class "error-outline" from inputs
    if (previousElement.classList.contains("error-outline")) {
      previousElement.classList.remove("error-outline");
    }

    el.remove();
  });
}

// It highlights the checked state of the checkbox input
// wether it is true(add style) or false(remove style)
checkboxElements.forEach((el) => {
  el.addEventListener("change", (e) => {
    if (e.target.checked) {
      el.parentElement.classList.add("option--selected");
    } else {
      el.parentElement.classList.remove("option--selected");
    }
  });
});

// It goes to the next or previous step
// Only if are adjacents of the current dot step
dotButtons.forEach((el) => {
  el.addEventListener("click", () => {
    const btnStep = Number(el.dataset.btnStep);

    // Validate errors first before moving onto another available step
    const errors = document.querySelectorAll(".error-message");
    if (errors.length > 0) return;

    // It calculates the distance of the selected step
    const distance = Math.abs(dotSteps - btnStep);

    if (btnStep < dotSteps && distance === 1) {
      prevStep();
    } else if (
      btnStep > dotSteps &&
      distance === 1 &&
      dotSteps !== currentStep
    ) {
      nextStep();
    }
  });
});

document.getElementById("multiStepForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const fields = document.querySelectorAll("fieldset:enabled input");
  const errors = validateForm(fields);

  // It evaluates if errors exist to display UI feedback
  if (Object.keys(errors).length > 0) return showError(errors);

  // It validates if previous errors still exist in the DOM
  const errorElements = document.querySelectorAll(".error-message");
  if (errorElements.length > 0) removeError(errorElements);

  continueStep();
});

showStep(currentStep);
