interface Step {
  array: number[];
  comparing?: [number, number];
  swapping?: [number, number];
  explanation: string;
  currentLine?: number;
}

export function bubbleSortSteps(arr: number[]): Step[] {
  const steps: Step[] = [];
  const array = [...arr];
  
  steps.push({
    array: [...array],
    explanation: "Starting the bubble sort algorithm with the initial array.",
    currentLine: 1
  });

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      steps.push({
        array: [...array],
        comparing: [j, j + 1],
        explanation: `Comparing elements at positions ${j} (${array[j]}) and ${j + 1} (${array[j + 1]})`,
        currentLine: 3
      });

      if (array[j] > array[j + 1]) {
        steps.push({
          array: [...array],
          swapping: [j, j + 1],
          explanation: `${array[j]} is greater than ${array[j + 1]}, swapping them`,
          currentLine: 4
        });

        // Perform the swap
        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        steps.push({
          array: [...array],
          explanation: `Swapped ${array[j + 1]} and ${array[j]}`,
          currentLine: 5
        });
      }
    }
  }

  steps.push({
    array: [...array],
    explanation: "Array is now sorted!",
    currentLine: 7
  });

  return steps;
}