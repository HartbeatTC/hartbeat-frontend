// utils/wait.ts
export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
