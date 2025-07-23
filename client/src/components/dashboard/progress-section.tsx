import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { User, DashboardStats } from "@shared/schema";

interface ProgressSectionProps {
  user: User;
  stats: DashboardStats | undefined;
}

export function ProgressSection({ user, stats }: ProgressSectionProps) {
  const progressPercentage = user.maxLevelPoints > 0 ? 
    Math.round((user.currentLevelPoints / user.maxLevelPoints) * 100) : 0;

  return (
    <section className="mt-8">
      <Card className="neon-border rounded-2xl p-6 hover-glow transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-neon-cyan">🏆 پیشرفت این هفته</h3>
          <span className="text-sm text-gray-400">لول {user.level} - فریلنسر طلایی</span>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span>{progressPercentage}% تا لول بعدی</span>
            <span className="text-neon-cyan">
              {user.currentLevelPoints}/{user.maxLevelPoints} امتیاز
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-neon-purple">
              +{stats?.weeklyProjects || 0}
            </div>
            <div className="text-xs text-gray-400">پروژه جدید</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-neon-cyan">
              +{stats?.weeklyReviews || 0}
            </div>
            <div className="text-xs text-gray-400">ریویو مثبت</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">
              +${stats?.weeklyEarnings || "0"}
            </div>
            <div className="text-xs text-gray-400">درآمد اضافی</div>
          </div>
        </div>
      </Card>
    </section>
  );
}
