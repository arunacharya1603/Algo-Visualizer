import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, StepForward } from 'lucide-react';
import ArrayVisualizer from './components/ArrayVisualizer';
import CodeBlock from './components/CodeBlock';
import { bubbleSortSteps } from './algorithms/bubbleSort';
import { insertionSortSteps } from './algorithms/insertionSort';
import { selectionSortSteps } from './algorithms/selectionSort';
import { quickSortSteps } from './algorithms/quickSort';
import { mergeSortSteps } from './algorithms/mergeSort';
function App() {
  const [array, setArray] = useState<number[]>([]);
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1000);
  const [algorithm, setAlgorithm] = useState<string>("bubbleSort");

  useEffect(() => {
    generateNewArray();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStep < steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep((prev) => prev + 1);
      }, speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, steps.length, speed]);

  const generateNewArray = () => {
    const newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 50) + 1);
    setArray(newArray);
    generateSteps(newArray);
  };

  const generateSteps = (arr: number[]) => {
    let sortSteps;
    switch (algorithm) {
      case "bubbleSort":
        sortSteps = bubbleSortSteps([...arr]);
        break;
      case "insertionSort":
        sortSteps = insertionSortSteps([...arr]);
        break;
      case "selectionSort":
        sortSteps = selectionSortSteps([...arr]);
        break;
      case "quickSort":
        sortSteps = quickSortSteps([...arr]);
        break;
      case "mergeSort":
        sortSteps = mergeSortSteps([...arr]);
        break;
      // Add other cases
      default:
        sortSteps = bubbleSortSteps([...arr]);
        break;
    }
    setSteps(sortSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleAlgorithmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAlgorithm(e.target.value);
    generateSteps(array);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleStepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-indigo-900 mb-8">
          Algorithm Visualizer
        </h1>
        
        <div className="flex justify-center mb-6">
          <select
            value={algorithm}
            onChange={handleAlgorithmChange}
            className="px-4 py-2 flex justify-center items-center border rounded-md bg-white"
          >
            <option value="bubbleSort">Bubble Sort</option>
            <option value="insertionSort">Insertion Sort</option>
            <option value="selectionSort">Selection Sort</option>
            <option value="quickSort">Quick Sort</option>
            <option value="mergeSort">Merge Sort</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="md:text-2xl text-xl font-semibold text-indigo-800 mb-6">
              {algorithm === "bubbleSort" ? "Bubble Sort" : 
               algorithm === "insertionSort" ? "Insertion Sort" : 
               algorithm === "selectionSort" ? "Selection Sort" : 
               algorithm === "quickSort" ? "Quick Sort" : 
               algorithm === "mergeSort" ? "Merge Sort" : ""} Visualization
            </h2>
            <div className="mb-8">
              <ArrayVisualizer 
                array={steps[currentStep]?.array || array}
                comparing={steps[currentStep]?.comparing}
                swapping={steps[currentStep]?.swapping}
              />
            </div>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={handleReset}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                title="Reset"
              >
                <RotateCcw className="w-6 h-6 text-gray-700" />
              </button>
              <button
                onClick={handlePlayPause}
                className="p-3 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-indigo-700" />
                ) : (
                  <Play className="w-6 h-6 text-indigo-700" />
                )}
              </button>
              <button
                onClick={handleStepForward}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                title="Step Forward"
              >
                <StepForward className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={generateNewArray}
                className="sm:px-4 px-1.5 sm:py-2 py-1.5 text-sm sm:text-lg bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Generate New Array
              </button>
              <select
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="sm:px-4 px-1.5 sm:py-2 py-1.5 text-sm sm:text-lg border rounded-md bg-white"
              >
                <option value={2000}>Slow</option>
                <option value={1000}>Normal</option>
                <option value={500}>Fast</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg sm:p-6 p-2">
            <h2 className="text-2xl font-semibold text-indigo-800 mb-4">Code Explanation</h2>
            <CodeBlock 
              currentStep={currentStep}
              explanation={steps[currentStep]?.explanation || "Click play to start the visualization"}
              currentLine={steps[currentStep]?.currentLine}
              algorithm={algorithm}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;