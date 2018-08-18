const carriers = [
  "Sigma",
  "Oatna",
  "Green Cross Green Shield",
  "American Healthcare"
];

const plans = [
  "PPO",
  "Choice Fund",
  "Choice Fund PPO",
  "Premium",
  "Open Access",
  "Flex Bronze",
  "Flex Silver",
  "Flex Gold"
];

function fetchList(list) {
  return () =>
    new Promise(resolve => {
      setTimeout(() => resolve(list), 1000);
    });
}

const fetchCarriers = fetchList(carriers);
const fetchPlans = fetchList(plans);

export { fetchCarriers, fetchPlans };
