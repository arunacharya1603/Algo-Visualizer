import React, { useEffect, useRef } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
  label?: string;
}

interface Edge {
  source: number;
  target: number;
  weight?: number;
}

interface Graph {
  nodes: Node[];
  edges: Edge[];
}

interface GraphVisualizerProps {
  graph: Graph;
  visitedNodes?: number[];
  currentNode?: number;
  shortestPath?: number[];
}

const GraphVisualizer: React.FC<GraphVisualizerProps> = ({
  graph,
  visitedNodes = [],
  currentNode,
  shortestPath = []
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Node rendering constants
  const NODE_RADIUS = 20;
  const NODE_COLOR = '#4F46E5'; // indigo-600
  const VISITED_NODE_COLOR = '#FBBF24'; // yellow-400
  const CURRENT_NODE_COLOR = '#EF4444'; // red-500
  const PATH_NODE_COLOR = '#10B981'; // emerald-500
  const TEXT_COLOR = '#FFFFFF';
  const EDGE_COLOR = '#94A3B8'; // slate-400
  const PATH_EDGE_COLOR = '#10B981'; // emerald-500
  
  useEffect(() => {
    if (!graph || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw edges
    graph.edges.forEach(edge => {
      const source = graph.nodes.find(n => n.id === edge.source);
      const target = graph.nodes.find(n => n.id === edge.target);
      
      if (!source || !target) return;
      
      ctx.beginPath();
      ctx.moveTo(source.x, source.y);
      ctx.lineTo(target.x, target.y);
      
      // Check if edge is part of shortest path
      const isPathEdge = 
        shortestPath.includes(source.id) && 
        shortestPath.includes(target.id) &&
        Math.abs(shortestPath.indexOf(source.id) - shortestPath.indexOf(target.id)) === 1;
      
      ctx.strokeStyle = isPathEdge ? PATH_EDGE_COLOR : EDGE_COLOR;
      ctx.lineWidth = isPathEdge ? 3 : 2;
      ctx.stroke();
      
      // Draw weight if available
      if (edge.weight !== undefined) {
        const midX = (source.x + target.x) / 2;
        const midY = (source.y + target.y) / 2;
        
        ctx.fillStyle = '#1F2937'; // gray-800
        ctx.font = '12px sans-serif';
        ctx.fillText(edge.weight.toString(), midX, midY);
      }
    });
    
    // Draw nodes
    graph.nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, NODE_RADIUS, 0, Math.PI * 2);
      
      // Determine node color based on its state
      if (currentNode === node.id) {
        ctx.fillStyle = CURRENT_NODE_COLOR;
      } else if (shortestPath.includes(node.id)) {
        ctx.fillStyle = PATH_NODE_COLOR;
      } else if (visitedNodes.includes(node.id)) {
        ctx.fillStyle = VISITED_NODE_COLOR;
      } else {
        ctx.fillStyle = NODE_COLOR;
      }
      
      ctx.fill();
      
      // Draw node label or ID
      ctx.fillStyle = TEXT_COLOR;
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.label || node.id.toString(), node.x, node.y);
    });
  }, [graph, visitedNodes, currentNode, shortestPath]);
  
  return (
    <div className="flex flex-col items-center w-full">
      <canvas 
        ref={canvasRef}
        width={600}
        height={400}
        className="w-full max-w-full h-64 sm:h-80 border border-gray-200 rounded-lg shadow-inner bg-gray-50"
      />
      
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-4 bg-white/50 px-3 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full" style={{backgroundColor: NODE_COLOR}} />
          <span className="text-gray-600">Unvisited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full" style={{backgroundColor: VISITED_NODE_COLOR}} />
          <span className="text-gray-600">Visited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full" style={{backgroundColor: CURRENT_NODE_COLOR}} />
          <span className="text-gray-600">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full" style={{backgroundColor: PATH_NODE_COLOR}} />
          <span className="text-gray-600">Shortest Path</span>
        </div>
      </div>
    </div>
  );
};

export default GraphVisualizer;