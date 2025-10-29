import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  useReactFlow,
  getRectOfNodes,
  getTransformForBounds,
} from "reactflow";
import "reactflow/dist/style.css";
import { TreeNode, NodeData } from "./TreeNode";
import { SearchBar } from "./SearchBar";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { toPng } from "html-to-image";

const nodeTypes = {
  treeNode: TreeNode,
};

interface TreeVisualizationProps {
  jsonData: any;
}

const TreeVisualizationContent = ({ jsonData }: TreeVisualizationProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [searchResult, setSearchResult] = useState<string>("");
  const { fitView, setCenter, getNodes } = useReactFlow();

  const downloadImage = () => {
    const nodesBounds = getRectOfNodes(getNodes());
    const transform = getTransformForBounds(nodesBounds, nodesBounds.width, nodesBounds.height, 0.5, 2);

    const viewport = document.querySelector('.react-flow__viewport') as HTMLElement;
    
    if (!viewport) {
      toast.error("Failed to capture tree");
      return;
    }

    toPng(viewport, {
      backgroundColor: '#ffffff',
      width: nodesBounds.width,
      height: nodesBounds.height,
      style: {
        width: `${nodesBounds.width}px`,
        height: `${nodesBounds.height}px`,
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    }).then((dataUrl) => {
      const a = document.createElement('a');
      a.setAttribute('download', 'json-tree.png');
      a.setAttribute('href', dataUrl);
      a.click();
      toast.success("Tree downloaded successfully!");
    }).catch((err) => {
      console.error('Error downloading image:', err);
      toast.error("Failed to download tree");
    });
  };

  const generateTree = useCallback((data: any, parentId: string | null = null, key: string = "$", level: number = 0) => {
    const nodes: Node<NodeData>[] = [];
    const edges: Edge[] = [];
    let nodeId = 0;

    const createNode = (label: string, type: NodeData["type"], value: any, path: string, x: number, y: number): string => {
      const id = `node-${nodeId++}`;
      nodes.push({
        id,
        type: "treeNode",
        position: { x, y },
        data: { label, type, value, path },
      });
      return id;
    };

    const traverse = (obj: any, currentPath: string, parentNodeId: string | null, level: number, indexInLevel: number): number => {
      const x = indexInLevel * 200;
      const y = level * 150;
      let currentNodeId: string;
      let childrenProcessed = 0;

      if (obj === null || typeof obj !== "object") {
        const type = "primitive";
        currentNodeId = createNode(currentPath.split(".").pop() || currentPath, type, obj, currentPath, x, y);
        if (parentNodeId) {
          edges.push({
            id: `edge-${parentNodeId}-${currentNodeId}`,
            source: parentNodeId,
            target: currentNodeId,
            type: "smoothstep",
          });
        }
        return 1;
      }

      if (Array.isArray(obj)) {
        currentNodeId = createNode(`${currentPath.split(".").pop() || currentPath} []`, "array", obj, currentPath, x, y);
        if (parentNodeId) {
          edges.push({
            id: `edge-${parentNodeId}-${currentNodeId}`,
            source: parentNodeId,
            target: currentNodeId,
            type: "smoothstep",
          });
        }

        let childIndex = 0;
        obj.forEach((item, index) => {
          const itemPath = `${currentPath}[${index}]`;
          childrenProcessed += traverse(item, itemPath, currentNodeId, level + 1, indexInLevel + childIndex);
          childIndex += 1;
        });
      } else {
        const label = currentPath === "$" ? "root" : currentPath.split(".").pop() || currentPath;
        currentNodeId = createNode(`${label} {}`, "object", obj, currentPath, x, y);
        if (parentNodeId) {
          edges.push({
            id: `edge-${parentNodeId}-${currentNodeId}`,
            source: parentNodeId,
            target: currentNodeId,
            type: "smoothstep",
          });
        }

        let childIndex = 0;
        Object.entries(obj).forEach(([key, value]) => {
          const childPath = `${currentPath}.${key}`;
          childrenProcessed += traverse(value, childPath, currentNodeId, level + 1, indexInLevel + childIndex);
          childIndex += 1;
        });
      }

      return Math.max(childrenProcessed, 1);
    };

    traverse(data, key, parentId, level, 0);
    return { nodes, edges };
  }, []);

  useEffect(() => {
    if (jsonData) {
      const { nodes: newNodes, edges: newEdges } = generateTree(jsonData);
      setNodes(newNodes);
      setEdges(newEdges);
      setTimeout(() => fitView({ duration: 300 }), 50);
    }
  }, [jsonData, generateTree, setNodes, setEdges, fitView]);

  const handleSearch = (searchPath: string) => {
    if (!searchPath.trim()) {
      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          data: { ...node.data, isHighlighted: false },
        }))
      );
      setSearchResult("");
      return;
    }

    const foundNode = nodes.find((node) => node.data.path === searchPath);

    if (foundNode) {
      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          data: {
            ...node.data,
            isHighlighted: node.id === foundNode.id,
          },
        }))
      );
      setCenter(foundNode.position.x + 60, foundNode.position.y + 20, { zoom: 1.5, duration: 500 });
      setSearchResult("Match found");
    } else {
      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          data: { ...node.data, isHighlighted: false },
        }))
      );
      setSearchResult("No match found");
    }
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Tree Visualization</h2>
        <div className="flex items-center gap-2">
          <SearchBar onSearch={handleSearch} searchResult={searchResult} />
          <Button onClick={downloadImage} size="sm" variant="outline">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 border border-border rounded-md overflow-hidden bg-muted/20">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.1}
          maxZoom={2}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export const TreeVisualization = (props: TreeVisualizationProps) => (
  <ReactFlowProvider>
    <TreeVisualizationContent {...props} />
  </ReactFlowProvider>
);
