import { useState } from "react";
import { 
  Calendar, 
  TrendingUp, 
  Heart, 
  Target, 
  BookOpen, 
  Smile,
  Users,
  Trophy,
  Edit,
  Plus,
  ChevronDown,
  Award,
  Star,
  Zap
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const stats = [
  {
    icon: Calendar,
    label: "连续陪伴",
    value: "7",
    unit: "天",
    color: "text-primary",
  },
  {
    icon: Heart,
    label: "情感支持",
    value: "24",
    unit: "次",
    color: "text-secondary",
  },
  {
    icon: Target,
    label: "目标达成",
    value: "3",
    unit: "个",
    color: "text-success",
  },
];

const diaryEntries = [
  {
    id: 1,
    date: "2024-01-20",
    title: "充实的一天",
    content: "今天与同事们讨论了新项目的方案，大家的想法都很有创意。晚上和朋友聊天，感觉心情轻松了许多。",
    mood: "😊",
    moodText: "快乐",
    aiGenerated: true,
  },
  {
    id: 2,
    date: "2024-01-19",
    title: "平静的周五",
    content: "工作进展顺利，完成了本周的目标。下班后去公园散步，天气很好。",
    mood: "😌",
    moodText: "平静",
    aiGenerated: true,
  },
  {
    id: 3,
    date: "2024-01-18",
    title: "压力与突破",
    content: "今天遇到了一些工作难题，但通过和 Soul 的对话找到了新的解决思路。感觉自己又成长了一些。",
    mood: "💪",
    moodText: "坚强",
    aiGenerated: true,
  },
];

const emotionData = [
  { date: "周一", happy: 60, calm: 70, anxious: 30, sad: 20 },
  { date: "周二", happy: 70, calm: 65, anxious: 25, sad: 15 },
  { date: "周三", happy: 50, calm: 55, anxious: 60, sad: 40 },
  { date: "周四", happy: 75, calm: 70, anxious: 20, sad: 10 },
  { date: "周五", happy: 80, calm: 75, anxious: 15, sad: 10 },
  { date: "周六", happy: 85, calm: 80, anxious: 10, sad: 5 },
  { date: "周日", happy: 75, calm: 80, anxious: 15, sad: 10 },
];

const emotionCalendar = [
  { date: 1, mood: "😊", intensity: "high" },
  { date: 2, mood: "😌", intensity: "medium" },
  { date: 3, mood: "😔", intensity: "low" },
  { date: 4, mood: "😊", intensity: "high" },
  { date: 5, mood: "😤", intensity: "medium" },
  { date: 6, mood: "😌", intensity: "high" },
  { date: 7, mood: "😊", intensity: "high" },
];

const relationshipData = [
  { name: "小明", interactions: 45, sentiment: "positive", color: "bg-success" },
  { name: "小红", interactions: 38, sentiment: "positive", color: "bg-primary" },
  { name: "小李", interactions: 32, sentiment: "neutral", color: "bg-warning" },
  { name: "小张", interactions: 28, sentiment: "positive", color: "bg-secondary" },
];

const milestones = [
  {
    id: 1,
    date: "2024-01-20",
    title: "社交突破",
    description: "在群聊中主动发起话题，得到了积极回应",
    type: "social",
    icon: Users,
  },
  {
    id: 2,
    date: "2024-01-18",
    title: "情绪管理",
    description: "成功应对工作压力，保持了积极心态",
    type: "emotion",
    icon: Heart,
  },
  {
    id: 3,
    date: "2024-01-15",
    title: "开始陪伴",
    description: "与 SoulLink 建立连接，开启成长之旅",
    type: "milestone",
    icon: Star,
  },
];

const achievements = [
  { id: 1, name: "初次相遇", icon: Star, unlocked: true },
  { id: 2, name: "7天陪伴", icon: Calendar, unlocked: true },
  { id: 3, name: "情感突破", icon: Heart, unlocked: true },
  { id: 4, name: "社交达人", icon: Users, unlocked: false },
  { id: 5, name: "连续30天", icon: Trophy, unlocked: false },
  { id: 6, name: "自我探索", icon: Zap, unlocked: false },
];

const Archive = () => {
  const [timeFilter, setTimeFilter] = useState("week");
  const [selectedDiary, setSelectedDiary] = useState<typeof diaryEntries[0] | null>(null);
  const [isEditingDiary, setIsEditingDiary] = useState(false);
  const [editedContent, setEditedContent] = useState("");

  const handleEditDiary = (diary: typeof diaryEntries[0]) => {
    setSelectedDiary(diary);
    setEditedContent(diary.content);
    setIsEditingDiary(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 glass-effect px-4 py-4 shadow-soft">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">成长档案</h1>
              <p className="text-sm text-muted-foreground">记录你的每一步成长</p>
            </div>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-28 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">本周</SelectItem>
                <SelectItem value="month">本月</SelectItem>
                <SelectItem value="year">本年</SelectItem>
                <SelectItem value="all">全部</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, index) => (
              <Card key={index} className="p-3 text-center border-border/50">
                <stat.icon className={`w-4 h-4 ${stat.color} mx-auto mb-1`} />
                <div className="text-lg font-bold">
                  {stat.value}
                  <span className="text-xs font-normal text-muted-foreground ml-0.5">
                    {stat.unit}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </header>

      <main className="px-4 py-6">
        <div className="max-w-lg mx-auto">
          <Tabs defaultValue="diary" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="diary" className="gap-1">
                <BookOpen className="w-4 h-4" />
                <span className="text-xs">日记</span>
              </TabsTrigger>
              <TabsTrigger value="emotion" className="gap-1">
                <Smile className="w-4 h-4" />
                <span className="text-xs">情绪</span>
              </TabsTrigger>
              <TabsTrigger value="relationship" className="gap-1">
                <Users className="w-4 h-4" />
                <span className="text-xs">关系</span>
              </TabsTrigger>
              <TabsTrigger value="milestone" className="gap-1">
                <Trophy className="w-4 h-4" />
                <span className="text-xs">里程碑</span>
              </TabsTrigger>
            </TabsList>

            {/* 日记 Tab */}
            <TabsContent value="diary" className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  AI 自动为你生成的成长日记
                </p>
                <Button size="sm" variant="outline" className="rounded-lg gap-1">
                  <Plus className="w-4 h-4" />
                  添加
                </Button>
              </div>

              {diaryEntries.map((entry) => (
                <Dialog key={entry.id}>
                  <DialogTrigger asChild>
                    <Card className="p-4 hover:shadow-elevated transition-all duration-300 cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className="text-3xl flex-shrink-0">{entry.mood}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{entry.title}</h3>
                            {entry.aiGenerated && (
                              <Badge variant="secondary" className="text-xs">
                                AI生成
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {entry.content}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {new Date(entry.date).toLocaleDateString("zh-CN")}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                              {entry.moodText}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <span className="text-2xl">{entry.mood}</span>
                        {entry.title}
                      </DialogTitle>
                      <DialogDescription>
                        {new Date(entry.date).toLocaleDateString("zh-CN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      {isEditingDiary && selectedDiary?.id === entry.id ? (
                        <Textarea
                          value={editedContent}
                          onChange={(e) => setEditedContent(e.target.value)}
                          className="min-h-32 rounded-xl"
                        />
                      ) : (
                        <p className="text-sm leading-relaxed">{entry.content}</p>
                      )}
                      <div className="flex gap-2">
                        {isEditingDiary && selectedDiary?.id === entry.id ? (
                          <>
                            <Button
                              onClick={() => setIsEditingDiary(false)}
                              className="flex-1 rounded-xl gradient-primary"
                            >
                              保存
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setIsEditingDiary(false)}
                              className="rounded-xl"
                            >
                              取消
                            </Button>
                          </>
                        ) : (
                          <Button
                            onClick={() => handleEditDiary(entry)}
                            variant="outline"
                            className="flex-1 rounded-xl gap-2"
                          >
                            <Edit className="w-4 h-4" />
                            编辑日记
                          </Button>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </TabsContent>

            {/* 情绪 Tab */}
            <TabsContent value="emotion" className="space-y-4">
              {/* 情绪趋势图表 */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  情绪趋势分析
                </h3>
                <div className="space-y-4">
                  {emotionData.map((day, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{day.date}</span>
                        <span className="font-medium">
                          {day.happy > 70 ? "😊 愉悦" : day.happy > 50 ? "😌 平静" : "😔 低落"}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <div
                          className="h-2 bg-success rounded-full"
                          style={{ width: `${day.happy}%` }}
                        />
                        <div
                          className="h-2 bg-primary rounded-full"
                          style={{ width: `${day.calm}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* 情绪洞察 */}
              <Card className="p-4 gradient-soft border-primary/20">
                <h4 className="font-semibold mb-2 text-sm">💡 本周情绪洞察</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  本周你的整体情绪呈上升趋势，周三出现了一些波动，但很快恢复。保持目前的状态，继续加油！
                </p>
              </Card>

              {/* 情绪日历 */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">情绪日历</h3>
                <div className="grid grid-cols-7 gap-2">
                  {emotionCalendar.map((day) => (
                    <div
                      key={day.date}
                      className="aspect-square rounded-lg bg-card border border-border flex flex-col items-center justify-center hover:shadow-soft transition-all cursor-pointer"
                    >
                      <div className="text-2xl mb-1">{day.mood}</div>
                      <div className="text-xs text-muted-foreground">{day.date}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* 关系 Tab */}
            <TabsContent value="relationship" className="space-y-4">
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  社交互动分析
                </h3>
                <div className="space-y-3">
                  {relationshipData.map((person, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${person.color} flex items-center justify-center text-white font-semibold`}>
                        {person.name[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{person.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {person.interactions} 次互动
                          </span>
                        </div>
                        <Progress value={person.interactions} className="h-1.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* 沟通习惯分析 */}
              <Card className="p-4 gradient-soft border-primary/20">
                <h4 className="font-semibold mb-2 text-sm">📊 沟通习惯分析</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  你更倾向于在晚上 8-10 点与朋友交流，周末的互动频率明显增加。
                </p>
                <p className="text-sm text-primary font-medium">
                  💡 建议：可以尝试在午休时间增加一些轻松的互动
                </p>
              </Card>
            </TabsContent>

            {/* 里程碑 Tab */}
            <TabsContent value="milestone" className="space-y-4">
              {/* 成长时间轴 */}
              <div className="space-y-4">
                <h3 className="font-semibold">成长时间轴</h3>
                {milestones.map((milestone, index) => (
                  <div key={milestone.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-soft">
                        <milestone.icon className="w-5 h-5 text-white" />
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="w-0.5 flex-1 bg-gradient-to-b from-primary to-transparent mt-2" />
                      )}
                    </div>
                    <Card className="flex-1 p-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{milestone.title}</h4>
                        <span className="text-xs text-muted-foreground">
                          {new Date(milestone.date).toLocaleDateString("zh-CN", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {milestone.description}
                      </p>
                    </Card>
                  </div>
                ))}
              </div>

              {/* 成就系统 */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-warning" />
                  成就徽章
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${
                        achievement.unlocked
                          ? "border-primary bg-gradient-to-br from-primary/10 to-secondary/10 hover:shadow-soft"
                          : "border-border bg-muted/50 opacity-50"
                      }`}
                    >
                      <achievement.icon
                        className={`w-6 h-6 ${
                          achievement.unlocked ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <span className="text-xs text-center px-1">{achievement.name}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Archive;
