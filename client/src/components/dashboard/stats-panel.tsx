import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { DashboardStats } from "@shared/schema";

interface StatsPanelProps {
  stats: DashboardStats | undefined;
}

export function StatsPanel({ stats }: StatsPanelProps) {
  if (!stats) {
    return (
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-neon-cyan">📊 آمار پیشرفت</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="neon-border rounded-xl p-4 animate-pulse">
              <div className="h-20 bg-gray-800 rounded"></div>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  const statsData = [
    {
      value: stats.projectsOutsourced,
      label: "پروژه اوت‌سورس",
      icon: "📋",
      color: "text-neon-purple",
      progress: 75,
    },
    {
      value: stats.starsEarned,
      label: "ستاره جدید",
      icon: "⭐",
      color: "text-yellow-400",
      progress: 60,
    },
    {
      value: stats.reviewsGained,
      label: "ریویو مثبت",
      icon: "❤️",
      color: "text-red-400",
      progress: 85,
    },
    {
      value: `$${stats.monthlyEarnings}`,
      label: "درآمد ماه",
      icon: "💰",
      color: "text-green-400",
      progress: 90,
    },
  ];

  return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold mb-4 text-neon-cyan">📊 آمار پیشرفت</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <Card key={index} className="neon-border rounded-xl p-4 hover-glow transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
              <span className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-2">{stat.label}</p>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className="progress-bar h-2 rounded-full transition-all duration-1000" 
                style={{ width: `${stat.progress}%` }}
              ></div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
