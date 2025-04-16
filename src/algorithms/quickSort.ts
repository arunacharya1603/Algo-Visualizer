interface Step {
  array: number[];
  comparing?: [number, number];
  swapping?: [number, number];
  explanation: string;
  currentLine?: number;
  pivot?: number;
  partitionRange?: [number, number];
}

export function quickSortSteps(arr: number[]): Step[] {
  const steps: Step[] = [];
  const array = [...arr];
  
  steps.push({
    array: [...array],
    explanation: "Starting the quicksort algorithm with the initial array.",
    currentLine: 1
  });

  // Main quicksort function
  function quickSort(arr: number[], low: number, high: number) {
    if (low < high) {
      steps.push({
        array: [...array],
        partitionRange: [low, high],
        explanation: `Partitioning the array from index ${low} to ${high}.`,
        currentLine: 2
      });
      
      // Partition the array and get the pivot index
      const pivotIndex = partition(arr, low, high);
      
      // Recursively sort elements before and after the pivot
      quickSort(arr, low, pivotIndex - 1);
      quickSort(arr, pivotIndex + 1, high);
    }
  }

  // Partition function
  function partition(arr: number[], low: number, high: number): number {
    // Choose the rightmost element as the pivot
    const pivot = arr[high];
    
    steps.push({
      array: [...array],
      pivot: high,
      explanation: `Selected pivot ${pivot} at position ${high}.`,
      currentLine: 5
    });
    
    // Index of smaller element
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      steps.push({
        array: [...array],
        comparing: [j, high],
        pivot: high,
        explanation: `Comparing element ${arr[j]} at position ${j} with pivot ${pivot}.`,
        currentLine: 7
      });
      
      // If current element is smaller than or equal to the pivot
      if (arr[j] <= pivot) {
        i++;
        
        if (i !== j) {
          steps.push({
            array: [...array],
            swapping: [i, j],
            pivot: high,
            explanation: `Swapping ${arr[i]} at position ${i} with ${arr[j]} at position ${j}.`,
            currentLine: 9
          });
          
          // Swap elements
          [arr[i], arr[j]] = [arr[j], arr[i]];
          
          steps.push({
            array: [...array],
            pivot: high,
            explanation: `Swapped ${arr[i]} and ${arr[j]}.`,
            currentLine: 10
          });
        } else {
          steps.push({
            array: [...array],
            pivot: high,
            explanation: `Element ${arr[j]} at position ${j} is already in the correct position.`,
            currentLine: 9
          });
        }
      }
    }
    
    // Swap the pivot element with the element at (i + 1)
    if (i + 1 !== high) {
      steps.push({
        array: [...array],
        swapping: [i + 1, high],
        pivot: high,
        explanation: `Swapping pivot ${arr[high]} with element ${arr[i + 1]} at position ${i + 1}.`,
        currentLine: 12
      });
      
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      
      steps.push({
        array: [...array],
        explanation: `Placed pivot ${arr[i + 1]} at its correct position ${i + 1}.`,
        currentLine: 13
      });
    } else {
      steps.push({
        array: [...array],
        explanation: `Pivot ${arr[high]} is already at its correct position.`,
        currentLine: 12
      });
    }
    
    return i + 1;
  }

  // Start the quicksort process
  quickSort(array, 0, array.length - 1);
  
  steps.push({
    array: [...array],
    explanation: "Array is now sorted!",
    currentLine: 14
  });

  return steps;
}
