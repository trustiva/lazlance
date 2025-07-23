import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import type { QuickTool } from "@shared/schema";

interface QuickToolsProps {
  tools: QuickTool[] | undefined;
}

export function QuickTools({ tools }: QuickToolsProps) {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleToolClick = (toolName: string, toolId: number) => {
    // Handle specific tool actions
    if (toolId === 1) { // Outsource Project tool
      setLocation("/outsource");
      return;
    }
    if (toolId === 2) { // Boost Stars/Reviews tool
      setLocation("/review-booster");
      return;
    }
    
    toast({
      title: "ابزار انتخاب شد",
      description: `${toolName} به زودی در دسترس خواهد بود!`,
    });
  };

  const getToolIcon = (iconName: string) => {
    const iconMap: Record<string, string> = {
      "share-alt": "🔄",
      "star": "⭐",
      "thumbs-up": "👍",
      "rocket": "🚀",
      "file-alt": "📄",
      "robot": "🤖",
    };
    return iconMap[iconName] || "🔧";
  };

  if (!tools) {
    return (
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-neon-cyan">🧰 ابزار سریع</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="neon-border rounded-xl p-4 animate-pulse">
              <div className="h-20 bg-gray-800 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold mb-4 text-neon-cyan">🧰 ابزار سریع</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {tools.map((tool) => (
          <Button
            key={tool.id}
            variant="outline"
            className="neon-border rounded-xl p-4 h-auto hover-glow transition-all duration-300 group"
            onClick={() => handleToolClick(tool.name, tool.id)}
          >
            <div className="text-center">
              <span className="text-3xl mb-2 block group-hover:scale-110 transition-transform">
                {getToolIcon(tool.icon)}
              </span>
              <p className="text-sm font-medium">{tool.name}</p>
            </div>
          </Button>
        ))}
      </div>
    </section>
  );
}
