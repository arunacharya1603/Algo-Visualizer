interface Step {
    array: number[];
    comparing?: [number, number];
    swapping?: [number, number];
    explanation: string;
    currentLine?: number;
  }
  
  export function insertionSortSteps(arr: number[]): Step[] {
    const steps: Step[] = [];
    const array = [...arr];
    
    steps.push({
      array: [...array],
      explanation: "Starting the insertion sort algorithm with the initial array.",
      currentLine: 1
    });
  
    for (let i = 1; i < array.length; i++) {
      const current = array[i];
      let j = i - 1;
      
      steps.push({
        array: [...array],
        comparing: [i, j],
        explanation: `Current element is ${current} at position ${i}. Starting comparison with element at position ${j}.`,
        currentLine: 2
      });
      
      while (j >= 0 && array[j] > current) {
        steps.push({
          array: [...array],
          comparing: [j + 1, j],
          explanation: `${array[j]} is greater than ${current}, shifting it to the right.`,
          currentLine: 5
        });
        
        array[j + 1] = array[j];
        
        steps.push({
          array: [...array],
          explanation: `Shifted ${array[j]} to position ${j + 1}.`,
          currentLine: 6
        });
        
        j--;
      }
      
      if (j + 1 !== i) {
        steps.push({
          array: [...array],
          swapping: [j + 1, -1], // Use -1 to indicate we're not actually swapping but inserting
          explanation: `Placing ${current} at position ${j + 1}.`,
          currentLine: 8
        });
        
        array[j + 1] = current;
        
        steps.push({
          array: [...array],
          explanation: `Placed ${current} at position ${j + 1}.`,
          currentLine: 8
        });
      }
    }
    
    steps.push({
      array: [...array],
      explanation: "Array is now sorted!",
      currentLine: 11
    });
    
    return steps;
  }