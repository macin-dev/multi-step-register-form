import { state } from "../app.js";
import { dotButtons } from "./ui.js";
import { showStep } from "./eventHandlers.js";

export function showDotNavigation(step) {
  dotButtons.forEach((el) => {
    const btnStep = Number(el.dataset.btnStep);

    if (btnStep === step) {
      el.classList.add("btn__dot--active");
      el.ariaCurrent = "step";
    } else {
      el.classList.remove("btn__dot--active");
      el.ariaCurrent = "false";
    }
  });

  // Display number step
  document.getElementById("currentStep").textContent = step;
}

export function nextStep() {
  state.dotSteps++;

  showStep(state.dotSteps);
  showDotNavigation(state.dotSteps);
}

export function prevStep() {
  state.dotSteps--;

  showStep(state.dotSteps);
  showDotNavigation(state.dotSteps);
}
