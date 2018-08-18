const carriers = [
  "Sigma",
  "Oatna",
  "Green Cross Green Shield",
  "American Healthcare"
];

export function fetchCarriers() {
  return new Promise(resolve => {
    setTimeout(() => resolve(carriers), 1000);
  });
}
