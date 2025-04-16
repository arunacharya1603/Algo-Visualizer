interface Step {
  array: number[];
  comparing?: [number, number];
  explanation: string;
  currentLine?: number;
  mergeRange?: [number, number];
  leftArray?: number[];
  rightArray?: number[];
  merging?: boolean;
}

export function mergeSortSteps(arr: number[]): Step[] {
  const steps: Step[] = [];
  const array = [...arr];
  
  steps.push({
    array: [...array],
    explanation: "Starting the merge sort algorithm with the initial array.",
    currentLine: 1
  });

  // Main mergeSort function
  function mergeSort(arr: number[], left: number, right: number) {
    if (left < right) {
      steps.push({
        array: [...array],
        mergeRange: [left, right],
        explanation: `Splitting the array from index ${left} to ${right}.`,
        currentLine: 2
      });
      
      // Find the middle point
      const middle = Math.floor((left + right) / 2);
      
      // Recursively sort first and second halves
      mergeSort(arr, left, middle);
      mergeSort(arr, middle + 1, right);
      
      // Merge the sorted halves
      merge(arr, left, middle, right);
    }
  }

  // Merge function
  function merge(arr: number[], left: number, middle: number, right: number) {
    const leftSize = middle - left + 1;
    const rightSize = right - middle;
    
    // Create temporary arrays
    const leftArray = arr.slice(left, middle + 1);
    const rightArray = arr.slice(middle + 1, right + 1);
    
    steps.push({
      array: [...array],
      leftArray: [...leftArray],
      rightArray: [...rightArray],
      mergeRange: [left, right],
      explanation: `Merging subarrays: left [${leftArray.join(', ')}] and right [${rightArray.join(', ')}].`,
      currentLine: 6,
      merging: true
    });
    
    // Merge the temporary arrays back into arr[left...right]
    let i = 0; // Initial index of left subarray
    let j = 0; // Initial index of right subarray
    let k = left; // Initial index of merged subarray
    
    while (i < leftSize && j < rightSize) {
      steps.push({
        array: [...array],
        comparing: [left + i, middle + 1 + j],
        leftArray: [...leftArray],
        rightArray: [...rightArray],
        mergeRange: [left, right],
        explanation: `Comparing ${leftArray[i]} from left array with ${rightArray[j]} from right array.`,
        currentLine: 8,
        merging: true
      });
      
      if (leftArray[i] <= rightArray[j]) {
        steps.push({
          array: [...array],
          leftArray: [...leftArray],
          rightArray: [...rightArray],
          mergeRange: [left, right],
          explanation: `Taking ${leftArray[i]} from left array.`,
          currentLine: 9,
          merging: true
        });
        
        arr[k] = leftArray[i];
        i++;
      } else {
        steps.push({
          array: [...array],
          leftArray: [...leftArray],
          rightArray: [...rightArray],
          mergeRange: [left, right],
          explanation: `Taking ${rightArray[j]} from right array.`,
          currentLine: 11,
          merging: true
        });
        
        arr[k] = rightArray[j];
        j++;
      }
      
      // Show the current state of the array after each merge step
      const arrayCopy = [...array];
      arrayCopy[k] = arr[k]; // Update the array copy with the merged value
      
      steps.push({
        array: arrayCopy,
        leftArray: [...leftArray],
        rightArray: [...rightArray],
        mergeRange: [left, right],
        explanation: `Placed ${arr[k]} at position ${k}.`,
        currentLine: 12,
        merging: true
      });
      
      k++;
    }
    
    // Copy remaining elements of leftArray[] if any
    while (i < leftSize) {
      steps.push({
        array: [...array],
        leftArray: [...leftArray],
        rightArray: [...rightArray],
        mergeRange: [left, right],
        explanation: `Copying remaining element ${leftArray[i]} from left array.`,
        currentLine: 14,
        merging: true
      });
      
      arr[k] = leftArray[i];
      
      // Show the current state of the array
      const arrayCopy = [...array];
      arrayCopy[k] = arr[k];
      
      steps.push({
        array: arrayCopy,
        leftArray: [...leftArray],
        rightArray: [...rightArray],
        mergeRange: [left, right],
        explanation: `Placed ${arr[k]} at position ${k}.`,
        currentLine: 15,
        merging: true
      });
      
      i++;
      k++;
    }
    
    // Copy remaining elements of rightArray[] if any
    while (j < rightSize) {
      steps.push({
        array: [...array],
        leftArray: [...leftArray],
        rightArray: [...rightArray],
        mergeRange: [left, right],
        explanation: `Copying remaining element ${rightArray[j]} from right array.`,
        currentLine: 17,
        merging: true
      });
      
      arr[k] = rightArray[j];
      
      // Show the current state of the array
      const arrayCopy = [...array];
      arrayCopy[k] = arr[k];
      
      steps.push({
        array: arrayCopy,
        leftArray: [...leftArray],
        rightArray: [...rightArray],
        mergeRange: [left, right],
        explanation: `Placed ${arr[k]} at position ${k}.`,
        currentLine: 18,
        merging: true
      });
      
      j++;
      k++;
    }
    
    // Update the main array with the merged subarray
    for (let m = left; m <= right; m++) {
      array[m] = arr[m];
    }
    
    steps.push({
      array: [...array],
      mergeRange: [left, right],
      explanation: `Merged subarray from index ${left} to ${right}.`,
      currentLine: 19
    });
  }

  // Start the mergeSort process
  mergeSort(array, 0, array.length - 1);
  
  steps.push({
    array: [...array],
    explanation: "Array is now sorted!",
    currentLine: 20
  });

  return steps;
}
