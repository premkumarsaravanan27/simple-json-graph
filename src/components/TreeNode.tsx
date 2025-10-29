import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { toast } from "sonner";

export type NodeData = {
  label: string;
  type: "object" | "array" | "primitive";
  value?: any;
  path: string;
  isHighlighted?: boolean;
};

export const TreeNode = memo(({ data }: NodeProps<NodeData>) => {
  const { label, type, value, path, isHighlighted } = data;

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(path);
      toast.success(`Copied: ${path}`);
    } catch (err) {
      toast.error("Failed to copy path");
    }
  };

  const getNodeStyle = () => {
    if (isHighlighted) {
      return "bg-node-highlight text-node-highlight-foreground border-node-highlight";
    }
    
    switch (type) {
      case "object":
        return "bg-node-object text-node-object-foreground border-node-object";
      case "array":
        return "bg-node-array text-node-array-foreground border-node-array";
      case "primitive":
        return "bg-node-primitive text-node-primitive-foreground border-node-primitive";
      default:
        return "bg-card text-card-foreground border-border";
    }
  };

  const displayValue = () => {
    if (type === "primitive") {
      if (typeof value === "string") return `"${value}"`;
      if (value === null) return "null";
      return String(value);
    }
    return "";
  };

  return (
    <div
      className={`px-4 py-2 rounded-md border-2 shadow-sm min-w-[120px] transition-all cursor-pointer hover:scale-105 ${getNodeStyle()}`}
      title={`${path}\nClick to copy path`}
      onClick={handleClick}
    >
      <Handle type="target" position={Position.Top} className="!bg-border" />
      <div className="font-mono text-sm font-semibold">{label}</div>
      {type === "primitive" && (
        <div className="font-mono text-xs mt-1 opacity-90">{displayValue()}</div>
      )}
      <Handle type="source" position={Position.Bottom} className="!bg-border" />
    </div>
  );
});

TreeNode.displayName = "TreeNode";
