import React from 'react';

interface ArrayVisualizerProps {
  array: number[];
  comparing?: [number, number];
  swapping?: [number, number];
}

const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({ array, comparing, swapping }) => {
  const maxValue = Math.max(...array);

  return (
    <div className="flex flex-col items-center space-y-4 sm:space-y-8 w-full overflow-x-hidden">
      {/* Main visualization container */}
      <div className="w-full max-w-full sm:max-w-3xl h-64 sm:h-80 flex items-end justify-center gap-1 xs:gap-2 sm:gap-4 px-1 sm:px-4 overflow-x-auto">
        {array.map((value, index) => {
          const height = (value / maxValue) * 100;
          const isComparing = comparing?.includes(index);
          const isSwapping = swapping?.includes(index);

          return (
            <div
              key={`${index}-${value}`}
              className="group relative flex-1 min-w-[20px] flex flex-col items-center"
              style={{ height: '100%' }}
            >
              {/* Bar */}
              <div 
                className="w-full relative flex flex-col justify-end"
                style={{ height: '90%' }}
              >
                <div
                  style={{ height: `${height}%` }}
                  className={`w-full transition-all duration-300 ${
                    isSwapping
                      ? 'bg-green-500'
                      : isComparing
                      ? 'bg-yellow-400'
                      : 'bg-indigo-500'
                  } rounded-t-lg shadow-lg`}
                >
                  {/* Value label on top of bar */}
                  <div className="absolute bottom-1 sm:bottom-6 left-1/2 -translate-x-1/2 text-xs sm:text-sm font-medium">
                    {value}
                  </div>
                </div>
              </div>

              {/* Index number below bar */}
              <div 
                className={`mt-1 sm:mt-2 w-5 h-5 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xs sm:text-sm font-medium ${
                  isComparing || isSwapping
                    ? 'bg-indigo-100 text-indigo-800 ring-1 sm:ring-2 ring-indigo-500'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {index}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-6 bg-white/50 px-3 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-indigo-500 rounded" />
          <span className="text-gray-600">Normal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400 rounded" />
          <span className="text-gray-600">Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded" />
          <span className="text-gray-600">Swapping</span>
        </div>
      </div>
    </div>
  );
};

export default ArrayVisualizer;