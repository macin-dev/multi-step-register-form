const fieldSets = document.querySelectorAll(".form__group");
const checkboxElements = document.querySelectorAll('input[type="checkbox"]');
const formEl = document.getElementById("multiStepForm");

let currentStep = 1;

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

function nextStep() {
  currentStep++;

  if (currentStep <= 3) showStep(currentStep);
}

function prevStep() {
  currentStep--;

  if (currentStep >= 1) showStep(currentStep);
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

document.getElementById("multiStepForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const fields = document.querySelectorAll("fieldset:enabled input");
  const errors = validateForm(fields);

  // It evaluates if errors exist to display UI feedback
  if (Object.keys(errors).length > 0) return showError(errors);

  // It validates if previous errors still exist in the DOM
  const errorElements = document.querySelectorAll(".error-message");
  if (errorElements.length > 0) removeError(errorElements);

  nextStep();
});

showStep(currentStep);
