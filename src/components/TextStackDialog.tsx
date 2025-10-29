import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TextStackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TextStackDialog = ({ open, onOpenChange }: TextStackDialogProps) => {
  const techStack = [
    "Next.js 15 - Framework",
    "ShadCN",
    "Vite 5.x - Build tool",
    "Tailwind CSS 3.x - CSS framework",
    "React Flow - Data visualization",
    "Lucide React - Icons",
    "Sonner - Toast notifications",
    "html-to-image - Image export",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Technology Stack</DialogTitle>
          <DialogDescription>
            - Prem Kumar - 
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <ul className="space-y-2">
            {techStack.map((tech, index) => (
              <li key={index} className="text-sm">
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
