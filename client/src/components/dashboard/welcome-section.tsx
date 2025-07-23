import { Card } from "@/components/ui/card";
import type { User } from "@shared/schema";

interface WelcomeSectionProps {
  user: User;
}

export function WelcomeSection({ user }: WelcomeSectionProps) {
  return (
    <section className="mb-8">
      <Card className="neon-border rounded-2xl p-6 hover-glow transition-all duration-300">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 neon-text text-neon-purple">
              سلام {user.fullName}! آماده‌ای اکانتتو منفجر کنی؟ 🚀
            </h2>
            <p className="text-gray-400">امروز یه روز عالیه برای رشد حرفه‌ات!</p>
          </div>
          <div className="animate-float">
            <span className="text-6xl opacity-80">👨‍🚀</span>
          </div>
        </div>
      </Card>
    </section>
  );
}
