// It returns an object if type (text, email, checkbox) inputs are empty
export function validateForm(fields) {
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
export function showError(errors) {
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
export function removeError(errorElements) {
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
