// Function to calculate sum from 1 to n using a for loop
export const sum_to_n_a = (n: number): number => {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// Recursive function to calculate sum from 1 to n
export const sum_to_n_b = (n: number): number => {
  if (n < 1) return n;
  return n + sum_to_n_b(n - 1);
};

// Function to calculate sum from 1 to n using the formula
export const sum_to_n_c = (n: number): number => {
  return (n * (n + 1)) / 2;
};
