import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  DollarSign, 
  Calendar, 
  FileText, 
  Zap, 
  Users, 
  Target,
  ArrowLeft,
  Sparkles
} from "lucide-react";
import { Link } from "wouter";

const outsourceSchema = z.object({
  title: z.string().min(5, "عنوان باید حداقل ۵ حرف باشد"),
  description: z.string().min(20, "توضیحات باید حداقل ۲۰ حرف باشد"),
  clientBudget: z.number().min(50, "بودجه باید حداقل ۵۰ دلار باشد"),
  deadline: z.string().min(1, "ددلاین الزامی است"),
  file: z.any().optional(),
  useAIMatch: z.boolean().default(true),
  selectedFreelancer: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, "باید با شرایط موافقت کنید"),
});

type OutsourceForm = z.infer<typeof outsourceSchema>;

const mockFreelancers = [
  { id: "1", name: "سارا احمدی", rating: 4.9, projects: 47, specialty: "طراحی UI/UX" },
  { id: "2", name: "محمد رضایی", rating: 4.8, projects: 32, specialty: "توسعه وب" },
  { id: "3", name: "فاطمه کریمی", rating: 4.7, projects: 28, specialty: "تولید محتوا" },
];

export default function OutsourcePage() {
  const { toast } = useToast();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<typeof mockFreelancers>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const form = useForm<OutsourceForm>({
    resolver: zodResolver(outsourceSchema),
    defaultValues: {
      useAIMatch: true,
      agreeToTerms: false,
    },
  });

  const watchedBudget = form.watch("clientBudget");
  const watchedUseAI = form.watch("useAIMatch");

  // Calculate commission suggestions
  const suggestedCommission = watchedBudget ? {
    executorShare: Math.round(watchedBudget * 0.75), // 75% to executor
    yourProfit: Math.round(watchedBudget * 0.20), // 20% your profit
    platformFee: Math.round(watchedBudget * 0.05), // 5% platform fee
  } : null;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadProgress(0);
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            form.setValue("file", file);
            toast({
              title: "آپلود موفق",
              description: `فایل ${file.name} با موفقیت آپلود شد`,
            });
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const generateAIRecommendations = () => {
    setShowRecommendations(true);
    // Simulate AI processing
    setTimeout(() => {
      setAiRecommendations(mockFreelancers.slice(0, 2));
      toast({
        title: "پیشنهادات هوش مصنوعی",
        description: "بهترین فریلنسرها بر اساس پروژه شما پیدا شدند",
      });
    }, 1500);
  };

  const onSubmit = (data: OutsourceForm) => {
    toast({
      title: "پروژه ثبت شد!",
      description: "درخواست اوت‌سورس شما با موفقیت ثبت شد و به فریلنسرها ارسال می‌شود",
    });
    console.log("Outsource data:", data);
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
                <Target className="text-white text-xl" />
              </div>
              <h1 className="text-2xl font-bold neon-text text-neon-purple">اوت‌سورس پروژه</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 relative z-10">
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8">
          
          {/* Project Details Card */}
          <Card className="neon-border rounded-2xl p-6 hover-glow transition-all duration-300">
            <div className="flex items-center space-x-3 space-x-reverse mb-6">
              <FileText className="h-6 w-6 text-neon-cyan" />
              <h2 className="text-xl font-semibold text-neon-cyan">📋 جزئیات پروژه</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title" className="text-sm font-medium mb-2 block">
                  عنوان پروژه
                </Label>
                <Input
                  id="title"
                  {...form.register("title")}
                  placeholder="مثال: طراحی لوگو شرکت"
                  className="neon-border"
                />
                {form.formState.errors.title && (
                  <p className="text-red-400 text-xs mt-1">{form.formState.errors.title.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="clientBudget" className="text-sm font-medium mb-2 block">
                  بودجه دریافتی از کلاینت (دلار)
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="clientBudget"
                    type="number"
                    {...form.register("clientBudget", { valueAsNumber: true })}
                    placeholder="500"
                    className="neon-border pl-10"
                  />
                </div>
                {form.formState.errors.clientBudget && (
                  <p className="text-red-400 text-xs mt-1">{form.formState.errors.clientBudget.message}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="description" className="text-sm font-medium mb-2 block">
                  توضیحات پروژه
                </Label>
                <Textarea
                  id="description"
                  {...form.register("description")}
                  placeholder="توضیح کاملی از پروژه، نیازمندی‌ها و انتظارات خود بنویسید..."
                  rows={4}
                  className="neon-border"
                />
                {form.formState.errors.description && (
                  <p className="text-red-400 text-xs mt-1">{form.formState.errors.description.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="deadline" className="text-sm font-medium mb-2 block">
                  ددلاین پروژه
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="deadline"
                    type="date"
                    {...form.register("deadline")}
                    className="neon-border pl-10"
                  />
                </div>
                {form.formState.errors.deadline && (
                  <p className="text-red-400 text-xs mt-1">{form.formState.errors.deadline.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="file" className="text-sm font-medium mb-2 block">
                  فایل ضمیمه (اختیاری)
                </Label>
                <div className="relative">
                  <Input
                    id="file"
                    type="file"
                    onChange={handleFileUpload}
                    className="neon-border file:bg-neon-purple file:text-white file:border-0 file:rounded-md file:px-3 file:py-1"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                  />
                  <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
                {isUploading && (
                  <div className="mt-2">
                    <Progress value={uploadProgress} className="h-2" />
                    <p className="text-xs text-gray-400 mt-1">آپلود... {uploadProgress}%</p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Commission Suggestion Card */}
          {suggestedCommission && (
            <Card className="neon-border rounded-2xl p-6 hover-glow transition-all duration-300 cyber-gradient">
              <div className="bg-black bg-opacity-50 rounded-xl p-4">
                <div className="flex items-center space-x-3 space-x-reverse mb-4">
                  <DollarSign className="h-6 w-6 text-neon-cyan" />
                  <h2 className="text-xl font-semibold text-neon-cyan">💸 پیشنهاد تقسیم کمیسیون</h2>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-neon-purple bg-opacity-20 rounded-lg p-3">
                    <div className="text-2xl font-bold text-neon-purple">
                      ${suggestedCommission.executorShare}
                    </div>
                    <div className="text-xs text-gray-300">به مجری (۷۵٪)</div>
                  </div>
                  <div className="bg-green-500 bg-opacity-20 rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-400">
                      ${suggestedCommission.yourProfit}
                    </div>
                    <div className="text-xs text-gray-300">سود شما (۲۰٪)</div>
                  </div>
                  <div className="bg-gray-500 bg-opacity-20 rounded-lg p-3">
                    <div className="text-2xl font-bold text-gray-400">
                      ${suggestedCommission.platformFee}
                    </div>
                    <div className="text-xs text-gray-300">کارمزد پلتفرم (۵٪)</div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Freelancer Selection Card */}
          <Card className="neon-border rounded-2xl p-6 hover-glow transition-all duration-300">
            <div className="flex items-center space-x-3 space-x-reverse mb-6">
              <Users className="h-6 w-6 text-neon-cyan" />
              <h2 className="text-xl font-semibold text-neon-cyan">🔎 انتخاب فریلنسر</h2>
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse mb-4">
              <Switch
                checked={watchedUseAI}
                onCheckedChange={(checked) => form.setValue("useAIMatch", checked)}
                className="data-[state=checked]:bg-neon-purple"
              />
              <Label className="flex items-center space-x-2 space-x-reverse">
                <Sparkles className="h-4 w-4 text-neon-purple" />
                <span>استفاده از هوش مصنوعی برای پیدا کردن بهترین فریلنسر</span>
              </Label>
            </div>

            {watchedUseAI ? (
              <div className="space-y-4">
                {!showRecommendations ? (
                  <Button
                    type="button"
                    onClick={generateAIRecommendations}
                    className="w-full cyber-gradient hover:scale-105 transition-all duration-300"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    دریافت پیشنهادات هوش مصنوعی
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-neon-cyan">پیشنهادات برتر:</h3>
                    {aiRecommendations.map((freelancer) => (
                      <div key={freelancer.id} className="flex items-center justify-between p-3 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
                        <div>
                          <p className="font-medium">{freelancer.name}</p>
                          <p className="text-xs text-gray-400">{freelancer.specialty}</p>
                          <div className="flex items-center space-x-2 space-x-reverse mt-1">
                            <Badge variant="secondary" className="text-xs">
                              ⭐ {freelancer.rating}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {freelancer.projects} پروژه
                            </Badge>
                          </div>
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="neon-border"
                          onClick={() => form.setValue("selectedFreelancer", freelancer.id)}
                        >
                          انتخاب
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-neon-cyan">انتخاب دستی فریلنسر:</h3>
                {mockFreelancers.map((freelancer) => (
                  <div key={freelancer.id} className="flex items-center justify-between p-3 bg-gray-800 bg-opacity-30 rounded-lg">
                    <div>
                      <p className="font-medium">{freelancer.name}</p>
                      <p className="text-xs text-gray-400">{freelancer.specialty}</p>
                      <div className="flex items-center space-x-2 space-x-reverse mt-1">
                        <Badge variant="secondary" className="text-xs">
                          ⭐ {freelancer.rating}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {freelancer.projects} پروژه
                        </Badge>
                      </div>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="neon-border"
                      onClick={() => form.setValue("selectedFreelancer", freelancer.id)}
                    >
                      انتخاب
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Terms and Submit */}
          <Card className="neon-border rounded-2xl p-6 hover-glow transition-all duration-300">
            <div className="flex items-center space-x-3 space-x-reverse mb-4">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  {...form.register("agreeToTerms")}
                  className="data-[state=checked]:bg-neon-purple data-[state=checked]:border-neon-purple"
                />
                <Label htmlFor="agreeToTerms" className="text-sm">
                  با شرایط همکاری موافقم (کیفیت، زمان‌بندی، محرمانگی)
                </Label>
              </div>
            </div>
            {form.formState.errors.agreeToTerms && (
              <p className="text-red-400 text-xs mb-4">{form.formState.errors.agreeToTerms.message}</p>
            )}

            <Button
              type="submit"
              className="w-full h-14 text-lg font-semibold cyber-gradient hover:scale-105 transition-all duration-300 animate-glow"
              disabled={!form.formState.isValid}
            >
              <Target className="h-5 w-5 mr-2" />
              ثبت درخواست اوت‌سورس 🚀
            </Button>
          </Card>
        </form>
      </main>
    </div>
  );
}