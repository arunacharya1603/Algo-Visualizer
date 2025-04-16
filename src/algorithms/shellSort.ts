interface Step {
    array: number[];
    comparing?: [number, number];
    swapping?: [number, number];
    explanation: string;
    currentLine?: number;
  }
  
  export function shellSortSteps(arr: number[]): Step[] {
    const steps: Step[] = [];
    const array = [...arr];
    
    steps.push({
      array: [...array],
      explanation: "Starting the Shell sort algorithm with the initial array.",
      currentLine: 1
    });
  
    // Calculate initial gap using the Knuth sequence: h = 3h + 1
    let gap = 1;
    while (gap < array.length / 3) {
      gap = 3 * gap + 1;
    }
    
    steps.push({
      array: [...array],
      explanation: `Initial gap size is ${gap}.`,
      currentLine: 2
    });
  
    // Decrease the gap until it becomes 0
    while (gap > 0) {
      steps.push({
        array: [...array],
        explanation: `Current gap size is ${gap}.`,
        currentLine: 3
      });
  
      // Perform insertion sort with the current gap
      for (let i = gap; i < array.length; i++) {
        const temp = array[i];
        let j = i;
        
        steps.push({
          array: [...array],
          comparing: [i, i - gap],
          explanation: `Looking at position ${i} (value ${array[i]}) and comparing with element at position ${i - gap} (value ${array[i - gap]}).`,
          currentLine: 4
        });
        
        // This is similar to insertion sort but with gap
        while (j >= gap && array[j - gap] > temp) {
          steps.push({
            array: [...array],
            comparing: [j, j - gap],
            explanation: `${array[j - gap]} is greater than ${temp}, shifting it forward by ${gap} positions.`,
            currentLine: 5
          });
          
          steps.push({
            array: [...array],
            swapping: [j, j - gap],
            explanation: `Moving element from position ${j - gap} to position ${j}.`,
            currentLine: 6
          });
  
          array[j] = array[j - gap];
          
          steps.push({
            array: [...array],
            explanation: `Shifted element from position ${j - gap} to position ${j}.`,
            currentLine: 7
          });
          
          j -= gap;
          
          if (j >= gap) {
            steps.push({
              array: [...array],
              comparing: [j, j - gap],
              explanation: `Next, comparing positions ${j} and ${j - gap}.`,
              currentLine: 8
            });
          }
        }
        
        if (j !== i || array[j] !== temp) {
          steps.push({
            array: [...array],
            swapping: [j, -1], // Using -1 to indicate insertion rather than swap
            explanation: `Placing ${temp} at position ${j}.`,
            currentLine: 9
          });
          
          array[j] = temp;
          
          steps.push({
            array: [...array],
            explanation: `Placed ${temp} at position ${j}.`,
            currentLine: 10
          });
        }
      }
      
      // Calculate the next gap using Knuth sequence in reverse
      gap = Math.floor(gap / 3);
      
      if (gap > 0) {
        steps.push({
          array: [...array],
          explanation: `Reducing gap size to ${gap}.`,
          currentLine: 11
        });
      }
    }
    
    steps.push({
      array: [...array],
      explanation: "Shell sort complete. Array is now sorted!",
      currentLine: 12
    });
    
    return steps;
  }