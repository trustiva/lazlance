import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { HotDeal } from "@shared/schema";

interface HotDealsProps {
  deals: HotDeal[] | undefined;
}

export function HotDeals({ deals }: HotDealsProps) {
  const { toast } = useToast();

  const handlePurchase = (dealTitle: string) => {
    toast({
      title: "خرید موفق!",
      description: `${dealTitle} با موفقیت خریداری شد!`,
    });
  };

  if (!deals || deals.length === 0) {
    return (
      <section>
        <h3 className="text-xl font-semibold mb-4 text-neon-cyan">🔥 پلن پیشنهادی امروز</h3>
        <Card className="neon-border rounded-2xl p-6">
          <p className="text-gray-400 text-center">هیچ پیشنهاد ویژه‌ای موجود نیست</p>
        </Card>
      </section>
    );
  }

  const deal = deals[0]; // Show the first active deal

  return (
    <section>
      <h3 className="text-xl font-semibold mb-4 text-neon-cyan">🔥 پلن پیشنهادی امروز</h3>
      <Card className="neon-border rounded-2xl p-6 hover-glow transition-all duration-300 cyber-gradient">
        <div className="bg-black bg-opacity-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="text-2xl animate-pulse">🔥</span>
              <Badge variant="destructive" className="bg-red-500 text-white">
                {deal.discountPercentage}% تخفیف
              </Badge>
            </div>
            <span className="text-xs text-gray-300">⏰ {deal.timeLeft}</span>
          </div>
          
          <h4 className="text-xl font-bold mb-2 neon-text">{deal.title}</h4>
          <p className="text-gray-300 mb-4">{deal.description}</p>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-neon-cyan">
                ${deal.discountPrice}
              </span>
              <span className="text-lg text-gray-400 line-through mr-2">
                ${deal.originalPrice}
              </span>
            </div>
            <Button 
              className="bg-neon-purple hover:bg-purple-600 font-semibold transition-all duration-300 hover:scale-105"
              onClick={() => handlePurchase(deal.title)}
            >
              همین الان بگیر! 🚀
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
