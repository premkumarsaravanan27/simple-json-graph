import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface JsonInputProps {
  value: string;
  onChange: (value: string) => void;
  onVisualize: () => void;
  error: string | null;
}

export const JsonInput = ({ value, onChange, onVisualize, error }: JsonInputProps) => {
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">JSON Input</h2>
        <Button onClick={onVisualize} size="sm">
          Visualize Tree
        </Button>
      </div>
      
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 font-mono text-sm resize-none"
      />
      
      {error && (
        <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-destructive">Invalid JSON</p>
            <p className="text-sm text-destructive/80 mt-1">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};
