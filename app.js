const fieldSets = document.querySelectorAll(".form__group");

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

document.getElementById("multiStepForm").addEventListener("submit", (event) => {
  event.preventDefault();
  nextStep();
});

showStep(currentStep);
