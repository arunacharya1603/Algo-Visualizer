import React from 'react';

interface CodeBlockProps {
  explanation: string;
  currentLine?: number;
  currentStep: number;
  algorithm: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ explanation, currentLine, algorithm }) => {
  const bubbleSortCode = [
    'function bubbleSort(arr) {',
    '  for (let i = 0; i < arr.length; i++) {',
    '    for (let j = 0; j < arr.length - i - 1; j++) {',
    '      if (arr[j] > arr[j + 1]) {',
    '        // Swap elements',
    '        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];',
    '      }',
    '    }',
    '  }',
    '  return arr;',
    '}'
  ];

  // Sample code for other algorithms
  const insertionSortCode = [
    'function insertionSort(arr) {',
    '  for (let i = 1; i < arr.length; i++) {',
    '    let current = arr[i];',
    '    let j = i - 1;',
    '    while (j >= 0 && arr[j] > current) {',
    '      arr[j + 1] = arr[j];',
    '      j--;',
    '    }',
    '    arr[j + 1] = current;',
    '  }',
    '  return arr;',
    '}'
  ];

  const selectionSortCode = [
    'function selectionSort(arr) {',
    '  for (let i = 0; i < arr.length; i++) {',
    '    let minIndex = i;',
    '    for (let j = i + 1; j < arr.length; j++) {',
    '      if (arr[j] < arr[minIndex]) {',
    '        minIndex = j;',
    '      }',
    '    }',
    '    if (minIndex !== i) {',
    '      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];',
    '    }',
    '  }',
    '  return arr;',
    '}'
  ];

  const quickSortCode = [
    'function quickSort(arr) {',
    '  if (arr.length <= 1) return arr;',
    '  const pivot = arr[Math.floor(arr.length / 2)];',
    '  const left = [];',
    '  const right = [];',
    '  for (let i = 0; i < arr.length; i++) {',
    '    if (i === pivotIndex) continue;',
    '    if (arr[i] < pivot) {',
    '      left.push(arr[i]);',
    '    } else {',
    '      right.push(arr[i]);',
    '  }',
    '  return [...quickSort(left), pivot, ...quickSort(right)];',
    '}',
    'function partition(arr, low, high) {',
    '  const pivot = arr[high];',
    '  let i = low - 1;',
    '  for (let j = low; j < high; j++) {',
    '    if (arr[j] < pivot) {',
    '      i++;',
    '      [arr[i], arr[j]] = [arr[j], arr[i]];',
    '    }',
    '  }',
    '  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];',
    '  return i + 1;',
    '}',
    'quickSort(arr, 0, arr.length - 1);',
    '  return arr;',
    '}'
  ];

  const mergeSortCode = [
    'function mergeSort(arr) {',
    '  if (arr.length <= 1) return arr;',
    '  const middle = Math.floor(arr.length / 2);',
    '  const left = arr.slice(0, middle);',
    '  const right = arr.slice(middle);',
    '  return merge(mergeSort(left), mergeSort(right));',
    '}',
    'function merge(left, right) {',
    '  const result = [];',
    '  while (left.length && right.length) {',
    '    if (left[0] < right[0]) {',
    '      result.push(left.shift());',
    '    } else {',
    '      result.push(right.shift());',
    '    }',
    '  }',
    '  return [...result, ...left, ...right];',
    '}',
    'return mergeSort(arr);',
    '}'
  ];
  

  // Get the appropriate code based on the selected algorithm
  const getAlgorithmCode = () => {
    switch (algorithm) {
      case "bubbleSort":
        return bubbleSortCode;
      case "insertionSort":
        return insertionSortCode;
      case "selectionSort":
        return selectionSortCode;
      case "quickSort":
        return quickSortCode;
      case "mergeSort":
        return mergeSortCode;
      // Add other algorithms as they are implemented
      default:
        return bubbleSortCode;
    }
  };

  const code = getAlgorithmCode();

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <pre className="text-gray-300">
          {code.map((line, index) => (
            <div
              key={index}
              className={`font-mono ${
                currentLine === index ? 'bg-indigo-900 text-white' : ''
              }`}
            >
              {line}
            </div>
          ))}
        </pre>
      </div>
      
      <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-indigo-900 mb-2">Current Step Explanation</h3>
        <p className="text-indigo-800">{explanation}</p>
      </div>
    </div>
  );
};

export default CodeBlock;