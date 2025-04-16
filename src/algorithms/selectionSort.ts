interface Step {
    array: number[];
    comparing?: [number, number];
    swapping?: [number, number];
    explanation: string;
    currentLine?: number;
  }
  
  export function selectionSortSteps(arr: number[]): Step[] {
    const steps: Step[] = [];
    const array = [...arr];
    
    steps.push({
      array: [...array],
      explanation: "Starting the selection sort algorithm with the initial array.",
      currentLine: 1
    });
  
    for (let i = 0; i < array.length - 1; i++) {
      let minIndex = i;
      
      steps.push({
        array: [...array],
        explanation: `Looking for the minimum element starting from position ${i}.`,
        currentLine: 2
      });
  
      for (let j = i + 1; j < array.length; j++) {
        steps.push({
          array: [...array],
          comparing: [minIndex, j],
          explanation: `Comparing current minimum ${array[minIndex]} at position ${minIndex} with ${array[j]} at position ${j}.`,
          currentLine: 4
        });
  
        if (array[j] < array[minIndex]) {
          steps.push({
            array: [...array],
            explanation: `Found a new minimum: ${array[j]} at position ${j}.`,
            currentLine: 5
          });
          
          minIndex = j;
        }
      }
  
      if (minIndex !== i) {
        steps.push({
          array: [...array],
          swapping: [i, minIndex],
          explanation: `Swapping ${array[i]} at position ${i} with minimum ${array[minIndex]} at position ${minIndex}.`,
          currentLine: 8
        });
  
        // Perform the swap
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
  
        steps.push({
          array: [...array],
          explanation: `Swapped ${array[i]} and ${array[minIndex]}.`,
          currentLine: 9
        });
      } else {
        steps.push({
          array: [...array],
          explanation: `Element ${array[i]} is already at its correct position ${i}.`,
          currentLine: 8
        });
      }
    }
  
    steps.push({
      array: [...array],
      explanation: "Array is now sorted!",
      currentLine: 13
    });
  
    return steps;
  }