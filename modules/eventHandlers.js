// Modules
import { state } from "../app.js";
import { checkboxElements, dotButtons, fieldSets, formEl } from "./ui.js";
import { removeError, showError, validateForm } from "./formValidation.js";
import { nextStep, prevStep, showDotNavigation } from "./stepNavigation.js";

function continueStep() {
  if (state.dotSteps !== state.currentStep) {
    return nextStep();
  }

  if (state.currentStep === state.lastStep) return;

  state.currentStep++;
  state.dotSteps++;

  if (state.currentStep <= state.lastStep) {
    showStep(state.currentStep);
    showDotNavigation(state.currentStep);
  }
}

export function showStep(step) {
  fieldSets.forEach((el) => {
    const stepEl = Number(el.dataset.step);
    if (step === stepEl) {
      el.classList.add("show-step");
      el.disabled = false;
      el.ariaHidden = "false";
    } else {
      el.classList.remove("show-step");
      el.disabled = true;
      el.ariaHidden = "true";
    }
  });
}

export function submitHandler(event) {
  event.preventDefault();

  const fields = document.querySelectorAll("fieldset:enabled input");
  const errors = validateForm(fields);

  // It evaluates if errors exist to display UI feedback
  if (Object.keys(errors).length > 0) return showError(errors);

  // It validates if previous errors still exist in the DOM
  const errorElements = document.querySelectorAll(".error-message");
  if (errorElements.length > 0) removeError(errorElements);

  continueStep();
}

export function changeHandler(event) {
  const el = event.target;
  if (el.checked) {
    el.parentElement.classList.add("option--selected");
  } else {
    el.parentElement.classList.remove("option--selected");
  }
}

function clickHandler(event) {
  const btnStep = Number(event.target.dataset.btnStep);

  // Validate errors first before moving onto another available step
  const errors = document.querySelectorAll(".error-message");
  if (errors.length > 0) return;

  // It calculates the distance of the selected step
  const distance = Math.abs(state.dotSteps - btnStep);

  if (btnStep < state.dotSteps && distance === 1) {
    prevStep();
  } else if (
    btnStep > state.dotSteps &&
    distance === 1 &&
    state.dotSteps !== state.currentStep
  ) {
    nextStep();
  }
}

formEl.addEventListener("submit", submitHandler);

// It highlights the checked state of the checkbox input
// wether it is true(add style) or false(remove style)
checkboxElements.forEach((el) => {
  el.addEventListener("change", changeHandler);
});

// It goes to the next or previous step
// Only if are adjacents of the current dot step
dotButtons.forEach((el) => {
  el.addEventListener("click", clickHandler);
});
