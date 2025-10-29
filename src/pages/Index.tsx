import { useState, useEffect } from "react";
import { JsonInput } from "@/components/JsonInput";
import { TreeVisualization } from "@/components/TreeVisualization";
import { TextStackDialog } from "@/components/TextStackDialog";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { RotateCcw } from "lucide-react";
import { toast } from "sonner";
import sampleData from "../data/sample.json";

const Index = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [jsonData, setJsonData] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const [showTextStackDialog, setShowTextStackDialog] = useState(true);

  // ✅ Load sample JSON automatically when app starts
  useEffect(() => {
    const jsonString = JSON.stringify(sampleData, null, 2);
    setJsonInput(jsonString);
    setJsonData(sampleData);
  }, []);

  const handleVisualize = () => {
    if (!jsonInput.trim()) {
      setError("Please enter some JSON data");
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);
      setJsonData(parsed);
      setError(null);
      toast.success("JSON visualized successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON format");
      setJsonData(null);
    }
  };

  const handleClear = () => {
    setJsonInput("");
    setJsonData(null);
    setError(null);
    toast.info("Cleared all data");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">JSON Tree Visualizer</h1>
            <p className="text-muted-foreground mt-1">
              APIwiz Assessment - Premkumar
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button onClick={handleClear} variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-180px)]">
          <div className="flex flex-col">
            <JsonInput
              value={jsonInput}
              onChange={setJsonInput}
              onVisualize={handleVisualize}
              error={error}
            />
          </div>

          <div className="flex flex-col">
            {jsonData ? (
              <TreeVisualization jsonData={jsonData} />
            ) : (
              <div className="flex-1 border border-dashed border-border rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Enter JSON to visualize</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <TextStackDialog 
        open={showTextStackDialog} 
        onOpenChange={setShowTextStackDialog} 
      />
    </div>
  );
};

export default Index;
