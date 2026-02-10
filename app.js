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
        errors["checkbox"] = "Please, choose one option";
      }
    } else if (!inputEl.value.trim()) {
      errors[inputEl.name] = `The ${inputEl.name} field is required`;
    }
  });

  return errors;
}

function showError(errors) {
  // TODO -> Show UI feedback
  console.log(errors);
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

  nextStep();
});

showStep(currentStep);
