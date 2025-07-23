import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WelcomeSection } from "@/components/dashboard/welcome-section";
import { StatsPanel } from "@/components/dashboard/stats-panel";
import { QuickTools } from "@/components/dashboard/quick-tools";
import { HotDeals } from "@/components/dashboard/hot-deals";
import { SmartTodo } from "@/components/dashboard/smart-todo";
import { ProgressSection } from "@/components/dashboard/progress-section";
import { Bell, Plus } from "lucide-react";

export default function Dashboard() {
  const userId = 1; // In a real app, this would come from auth context

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["/api/dashboard", userId],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-purple"></div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6">
          <p className="text-red-400">خطا در بارگذاری داده‌های داشبورد</p>
        </Card>
      </div>
    );
  }

  const { user, stats, quickTools, hotDeals, todoItems } = dashboardData;

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-neon-purple rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-neon-cyan rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-cyber-indigo rounded-full opacity-10 blur-2xl animate-float"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-10 h-10 cyber-gradient rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🚀</span>
              </div>
              <h1 className="text-2xl font-bold neon-text text-neon-purple">LazyLancer</h1>
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-neon-cyan">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              </Button>
              
              <div className="flex items-center space-x-3 space-x-reverse">
                <img 
                  src={user.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64"} 
                  alt="User Profile" 
                  className="w-10 h-10 rounded-full ring-2 ring-neon-purple" 
                />
                <div className="text-right">
                  <p className="text-sm font-medium">{user.fullName}</p>
                  <p className="text-xs text-gray-400">فریلنسر طلایی</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 relative z-10">
        <WelcomeSection user={user} />
        <StatsPanel stats={stats} />
        <QuickTools tools={quickTools} />
        
        <div className="grid lg:grid-cols-2 gap-8">
          <HotDeals deals={hotDeals} />
          <SmartTodo todoItems={todoItems} />
        </div>

        <ProgressSection user={user} stats={stats} />
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <Button 
          size="icon"
          className="w-14 h-14 cyber-gradient rounded-full shadow-lg hover:scale-110 transition-all duration-300 animate-pulse"
        >
          <Plus className="h-6 w-6 text-white" />
        </Button>
      </div>
    </div>
  );
}
