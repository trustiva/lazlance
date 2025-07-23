import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { TodoItem } from "@shared/schema";

interface SmartTodoProps {
  todoItems: TodoItem[] | undefined;
}

export function SmartTodo({ todoItems }: SmartTodoProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const completeTodoMutation = useMutation({
    mutationFn: async (todoId: number) => {
      const response = await apiRequest("POST", `/api/todo/${todoId}/complete`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard"] });
      toast({
        title: "تبریک!",
        description: "کار با موفقیت تکمیل شد و امتیاز شما افزایش یافت!",
      });
    },
    onError: () => {
      toast({
        title: "خطا",
        description: "مشکلی در تکمیل کار پیش آمد",
        variant: "destructive",
      });
    },
  });

  const handleTodoAction = (todoId: number) => {
    completeTodoMutation.mutate(todoId);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-400";
      case "medium":
        return "text-yellow-400";
      case "low":
        return "text-green-400";
      default:
        return "text-gray-400";
    }
  };

  const getPriorityDot = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-400";
      case "medium":
        return "bg-yellow-400";
      case "low":
        return "bg-green-400";
      default:
        return "bg-gray-400";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "اولویت بالا";
      case "medium":
        return "اولویت متوسط";
      case "low":
        return "اولویت پایین";
      default:
        return "عادی";
    }
  };

  if (!todoItems) {
    return (
      <section>
        <h3 className="text-xl font-semibold mb-4 text-neon-cyan">📍 تو‌دوی سریع</h3>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="neon-border rounded-xl p-4 animate-pulse">
              <div className="h-20 bg-gray-800 rounded"></div>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  const incompleteTodos = todoItems.filter(item => !item.isCompleted);

  return (
    <section>
      <h3 className="text-xl font-semibold mb-4 text-neon-cyan">📍 تو‌دوی سریع</h3>
      <div className="space-y-3">
        {incompleteTodos.length === 0 ? (
          <Card className="neon-border rounded-xl p-6 text-center">
            <p className="text-gray-400">همه کارها تکمیل شده! 🎉</p>
          </Card>
        ) : (
          incompleteTodos.map((item) => (
            <Card key={item.id} className="neon-border rounded-xl p-4 hover-glow transition-all duration-300">
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="flex-shrink-0 mt-1">
                  <div className={`w-3 h-3 ${getPriorityDot(item.priority)} rounded-full animate-pulse`}></div>
                </div>
                <div className="flex-1">
                  <p className="font-medium mb-1">{item.title}</p>
                  <p className="text-sm text-gray-400 mb-2">{item.description}</p>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Badge variant="secondary" className="text-xs">
                      {getPriorityLabel(item.priority)}
                    </Badge>
                    <span className="text-xs text-neon-cyan">+{item.points} امتیاز</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-neon-cyan hover:text-cyan-300 transition-colors"
                  onClick={() => handleTodoAction(item.id)}
                  disabled={completeTodoMutation.isPending}
                >
                  <ChevronLeft className="h-4 w-4 rtl-flip" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </section>
  );
}
