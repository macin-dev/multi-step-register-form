const fieldSets = document.querySelectorAll(".form__group");
const checkboxElements = document.querySelectorAll('input[type="checkbox"]');

let currentStep = 1;

function showStep(step) {
  fieldSets.forEach((el) => {
    const stepEl = Number(el.dataset.step);

    if (step === stepEl) {
      el.classList.add("show-step");
    } else {
      el.classList.remove("show-step");
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
  nextStep();
});

showStep(currentStep);
