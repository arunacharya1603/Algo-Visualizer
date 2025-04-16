interface Step {
  array: number[];
  target: number;
  left: number;
  right: number;
  mid: number;
  found: boolean | null;
  explanation: string;
  currentLine?: number;
}

export function binarySearchSteps(arr: number[], target: number): Step[] {
  // Binary search requires a sorted array
  const array = [...arr].sort((a, b) => a - b);
  const steps: Step[] = [];
  let left = 0;
  let right = array.length - 1;
  let found = null;
  
  // Initial step showing the problem
  steps.push({
    array: [...array],
    target,
    left,
    right,
    mid: -1,
    found: null,
    explanation: `Starting binary search for target value ${target} in a sorted array.`,
    currentLine: 1
  });
  
  // Binary search algorithm
  while (left <= right && found === null) {
    const mid = Math.floor((left + right) / 2);
    
    steps.push({
      array: [...array],
      target,
      left,
      right,
      mid,
      found: null,
      explanation: `Calculating mid index: (${left} + ${right}) / 2 = ${mid}. Comparing ${array[mid]} with target ${target}.`,
      currentLine: 3
    });
    
    if (array[mid] === target) {
      // Found the target
      found = true;
      steps.push({
        array: [...array],
        target,
        left,
        right,
        mid,
        found: true,
        explanation: `Found target ${target} at index ${mid}!`,
        currentLine: 5
      });
    } else if (array[mid] < target) {
      // Target is in the right half
      steps.push({
        array: [...array],
        target,
        left,
        right,
        mid,
        found: null,
        explanation: `${array[mid]} is less than target ${target}. Search the right half.`,
        currentLine: 7
      });
      
      left = mid + 1;
      
      steps.push({
        array: [...array],
        target,
        left,
        right,
        mid,
        found: null,
        explanation: `Setting left boundary to mid + 1 = ${mid} + 1 = ${left}.`,
        currentLine: 8
      });
    } else {
      // Target is in the left half
      steps.push({
        array: [...array],
        target,
        left,
        right,
        mid,
        found: null,
        explanation: `${array[mid]} is greater than target ${target}. Search the left half.`,
        currentLine: 10
      });
      
      right = mid - 1;
      
      steps.push({
        array: [...array],
        target,
        left,
        right,
        mid,
        found: null,
        explanation: `Setting right boundary to mid - 1 = ${mid} - 1 = ${right}.`,
        currentLine: 11
      });
    }
  }
  
  // If we exit the loop without finding the target
  if (found === null) {
    steps.push({
      array: [...array],
      target,
      left,
      right,
      mid: -1,
      found: false,
      explanation: `Target ${target} not found in the array. Search complete.`,
      currentLine: 14
    });
  }
  
  return steps;
}

export function generateRandomBinarySearchExample(): { array: number[], target: number } {
  // Generate a sorted array of 10-15 random numbers between 1-100
  const length = Math.floor(Math.random() * 6) + 10;
  let array = Array.from({ length }, () => Math.floor(Math.random() * 100) + 1).sort((a, b) => a - b);
  
  // Ensure unique values
  array = [...new Set(array)];
  
  // Select either a number from the array or a random number not in the array
  const includeTarget = Math.random() > 0.3; // 70% chance to include target in array
  
  let target: number;
  if (includeTarget && array.length > 0) {
    const randomIndex = Math.floor(Math.random() * array.length);
    target = array[randomIndex];
  } else {
    // Generate a number not in the array
    let randomTarget;
    do {
      randomTarget = Math.floor(Math.random() * 100) + 1;
    } while (array.includes(randomTarget));
    target = randomTarget;
  }
  
  return { array, target };
}
