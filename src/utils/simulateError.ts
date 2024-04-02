export const simulateError = (errorChance: number = 0.5) => {
  if (Math.random() < errorChance) {
    throw new Error('Simulated API error');
  }
};
