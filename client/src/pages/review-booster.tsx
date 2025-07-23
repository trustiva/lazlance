import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Star, 
  Zap, 
  ShoppingCart, 
  Target,
  ArrowLeft,
  Sparkles,
  Trophy,
  CheckCircle,
  Clock
} from "lucide-react";
import { Link } from "wouter";

const reviewPacks = [
  {
    id: 1,
    name: "پکیج استارتر",
    reviews: 3,
    price: 49,
    originalPrice: 69,
    discount: 29,
    popular: false,
    features: ["3 ریویو 5 ستاره", "تحویل 24 ساعته", "گارانتی کیفیت"]
  },
  {
    id: 2,
    name: "پکیج پرو",
    reviews: 5,
    price: 79,
    originalPrice: 119,
    discount: 34,
    popular: true,
    features: ["5 ریویو 5 ستاره", "تحویل 12 ساعته", "گارانتی کیفیت", "بوست اضافی"]
  },
  {
    id: 3,
    name: "پکیج ماسترز",
    reviews: 10,
    price: 149,
    originalPrice: 229,
    discount: 35,
    popular: false,
    features: ["10 ریویو 5 ستاره", "تحویل فوری", "گارانتی کیفیت", "بوست اضافی", "ویژگی‌های ویژه"]
  }
];

const microTasks = [
  {
    id: 1,
    title: "پروفایل را کامل کن",
    description: "عکس پروفایل و بیوگرافی خود را اضافه کنید",
    reward: 1,
    completed: false,
    timeEstimate: "5 دقیقه"
  },
  {
    id: 2,
    title: "یک نمونه کار آپلود کن",
    description: "حداقل یک نمونه از کارهای قبلی خود را به پروفایل اضافه کنید",
    reward: 2,
    completed: true,
    timeEstimate: "10 دقیقه"
  },
  {
    id: 3,
    title: "مهارت‌هایت را تأیید کن",
    description: "حداقل 3 مهارت خود را با تست تأیید کنید",
    reward: 3,
    completed: false,
    timeEstimate: "15 دقیقه"
  }
];

export default function ReviewBoosterPage() {
  const { toast } = useToast();
  const [currentReviews] = useState({ count: 23, rating: 4.6 });
  const [selectedPack, setSelectedPack] = useState<number | null>(null);
  const [boostingProgress, setBoostingProgress] = useState(0);
  const [isBoosting, setIsBoosting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuyPack = async (pack: typeof reviewPacks[0]) => {
    setSelectedPack(pack.id);
    setIsBoosting(true);
    setBoostingProgress(0);
    
    // Simulate boost process
    const interval = setInterval(() => {
      setBoostingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBoosting(false);
          setShowResults(true);
          setIsModalOpen(false);
          toast({
            title: "بوست اعمال شد! 🚀",
            description: `${pack.reviews} ریویو جدید به پروفایل شما اضافه شد`,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleCompleteTask = (taskId: number) => {
    toast({
      title: "وظیفه تکمیل شد!",
      description: "امتیاز ریویو به حساب شما اضافه شد",
    });
  };

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
              <Link href="/dashboard">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-neon-cyan">
                  <ArrowLeft className="h-5 w-5 rtl-flip" />
                </Button>
              </Link>
              <div className="w-10 h-10 cyber-gradient rounded-lg flex items-center justify-center">
                <Star className="text-white text-xl" />
              </div>
              <h1 className="text-2xl font-bold neon-text text-neon-purple">تقویت ریویوها</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 relative z-10 max-w-6xl">
        
        {/* Current Reviews Display */}
        <Card className="neon-border rounded-2xl p-6 mb-8 hover-glow transition-all duration-300">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
              <span className="text-4xl font-bold text-neon-cyan">{currentReviews.rating}</span>
              <div className="flex space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-6 w-6 ${i < Math.floor(currentReviews.rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
                  />
                ))}
              </div>
            </div>
            <p className="text-xl text-gray-300 mb-2">{currentReviews.count} ریویو</p>
            <p className="text-sm text-gray-400">رتبه فعلی شما در پلتفرم</p>
          </div>
        </Card>

        {/* Boost Button */}
        <div className="text-center mb-8">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button 
                size="lg"
                className="h-16 px-8 text-xl font-semibold cyber-gradient hover:scale-105 transition-all duration-300 animate-glow"
              >
                <Zap className="h-6 w-6 mr-2" />
                بوست ریویوهام 🚀
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto neon-border bg-cyber-card">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-neon-purple text-center mb-6">
                  انتخاب روش تقویت ریویو
                </DialogTitle>
              </DialogHeader>

              {/* Review Packs */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-neon-cyan flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  خرید پکیج ریویو
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {reviewPacks.map((pack) => (
                    <Card 
                      key={pack.id} 
                      className={`neon-border rounded-xl p-4 hover-glow transition-all duration-300 relative ${
                        pack.popular ? 'cyber-gradient' : ''
                      }`}
                    >
                      {pack.popular && (
                        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-neon-purple">
                          محبوب‌ترین
                        </Badge>
                      )}
                      <div className={pack.popular ? 'bg-black bg-opacity-50 rounded-lg p-4' : ''}>
                        <div className="text-center mb-4">
                          <h4 className="text-lg font-bold mb-2">{pack.name}</h4>
                          <div className="flex items-center justify-center space-x-2 space-x-reverse mb-2">
                            <span className="text-2xl font-bold text-neon-cyan">${pack.price}</span>
                            <span className="text-lg text-gray-400 line-through">${pack.originalPrice}</span>
                            <Badge variant="destructive" className="text-xs">
                              {pack.discount}% تخفیف
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400">{pack.reviews} ریویو 5 ستاره</p>
                        </div>
                        
                        <ul className="space-y-2 mb-4">
                          {pack.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm">
                              <CheckCircle className="h-4 w-4 text-green-400 ml-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        
                        <Button 
                          className="w-full"
                          onClick={() => handleBuyPack(pack)}
                          disabled={isBoosting}
                        >
                          {isBoosting && selectedPack === pack.id ? 'در حال پردازش...' : 'خرید'}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Micro Tasks */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-neon-cyan flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  کسب ریویو رایگان
                </h3>
                <div className="space-y-3">
                  {microTasks.map((task) => (
                    <Card key={task.id} className="neon-border rounded-lg p-4 hover-glow transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 space-x-reverse mb-1">
                            <h4 className="font-medium">{task.title}</h4>
                            {task.completed && <CheckCircle className="h-4 w-4 text-green-400" />}
                          </div>
                          <p className="text-sm text-gray-400 mb-2">{task.description}</p>
                          <div className="flex items-center space-x-4 space-x-reverse">
                            <Badge variant="secondary" className="text-xs">
                              <Trophy className="h-3 w-3 ml-1" />
                              +{task.reward} ریویو
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 ml-1" />
                              {task.timeEstimate}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant={task.completed ? "secondary" : "default"}
                          disabled={task.completed}
                          onClick={() => handleCompleteTask(task.id)}
                        >
                          {task.completed ? 'تکمیل شده' : 'شروع'}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Progress Bar */}
              {isBoosting && (
                <div className="mt-6 p-4 bg-gray-800 bg-opacity-50 rounded-lg">
                  <div className="flex items-center space-x-3 space-x-reverse mb-2">
                    <Sparkles className="h-5 w-5 text-neon-purple animate-spin" />
                    <span className="text-sm">در حال اعمال بوست...</span>
                  </div>
                  <Progress value={boostingProgress} className="h-2" />
                  <p className="text-xs text-gray-400 mt-1">{boostingProgress}% تکمیل</p>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>

        {/* Results Card */}
        {showResults && (
          <Card className="neon-border rounded-2xl p-6 cyber-gradient animate-glow">
            <div className="bg-black bg-opacity-50 rounded-xl p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 cyber-gradient rounded-full flex items-center justify-center">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2 neon-text">تبریک! پروفایل شما بوست شد 🎉</h2>
              <p className="text-gray-300 mb-4">ریویوهای جدید با موفقیت به پروفایل شما اضافه شد</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 bg-opacity-50 rounded-lg p-3">
                  <div className="text-xl font-bold text-neon-cyan">{currentReviews.count + (selectedPack ? reviewPacks.find(p => p.id === selectedPack)?.reviews || 0 : 0)}</div>
                  <div className="text-xs text-gray-400">کل ریویوها</div>
                </div>
                <div className="bg-gray-800 bg-opacity-50 rounded-lg p-3">
                  <div className="text-xl font-bold text-yellow-400">4.9</div>
                  <div className="text-xs text-gray-400">رتبه جدید</div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}