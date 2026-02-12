import { showStep } from "./modules/eventHandlers.js";

export const state = {
  currentStep: 1,
  dotSteps: 1,
  lastStep: 3,
};

const formData = { name: "", email: "", topics: [] };

export function setFormData(inputs) {
  inputs.forEach((element) => {
    if (element.type === "checkbox" && element.checked) {
      formData.topics.push(element.value);
    } else {
      formData[element.name] = element.value;
    }
  });
}

export function getFormData() {
  return formData;
}

showStep(state.currentStep);
