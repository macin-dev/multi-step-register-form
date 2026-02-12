import { showStep } from "./modules/eventHandlers.js";

export const state = {
  currentStep: 1,
  dotSteps: 1,
  lastStep: 3,
};

showStep(state.currentStep);
