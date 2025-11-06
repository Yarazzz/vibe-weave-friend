import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, Mic, Settings, Smile, TrendingUp, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface Message {
  id: number;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  hasMemory?: boolean;
  memoryTag?: string;
  emotionDetected?: "positive" | "neutral" | "negative";
}

const quickReplies = [
  "听你说说今天的事",
  "需要一些建议",
  "只是想聊聊天",
  "分享一个好消息",
];

const aiMoods = [
  { mood: "关怀", color: "text-primary", icon: Heart },
  { mood: "倾听", color: "text-secondary", icon: Sparkles },
  { mood: "陪伴", color: "text-success", icon: Smile },
];

const Companion = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "你好呀！我是你的智能伴侣，很高兴认识你。今天想聊些什么呢？",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [currentMood, setCurrentMood] = useState(0);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [emotionData, setEmotionData] = useState([
    { time: "8:00", score: 70 },
    { time: "12:00", score: 65 },
    { time: "16:00", score: 75 },
    { time: "20:00", score: 80 },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMood((prev) => (prev + 1) % aiMoods.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = (content?: string) => {
    const messageContent = content || inputValue;
    if (!messageContent.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      content: messageContent,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
    setShowQuickReplies(false);

    // Simulate AI response with emotion detection
    setTimeout(() => {
      const responses = [
        {
          content: "我理解你的感受。让我们一起慢慢聊，我会一直陪着你。💙",
          hasMemory: false,
        },
        {
          content: "记得你上次提到过这个话题。看来这对你很重要呢。",
          hasMemory: true,
          memoryTag: "重要记忆",
        },
        {
          content: "听起来你今天的心情不错！真为你高兴 ✨",
          emotionDetected: "positive" as const,
        },
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiResponse: Message = {
        id: messages.length + 2,
        ...randomResponse,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    // 实际项目中这里会调用语音识别 API
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setInputValue("这是通过语音输入的内容");
      }, 2000);
    }
  };

  const handleQuickReply = (reply: string) => {
    handleSend(reply);
  };

  const CurrentMoodIcon = aiMoods[currentMood].icon;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-10 glass-effect px-4 py-4 shadow-soft">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center shadow-soft animate-float">
                <CurrentMoodIcon className="w-6 h-6 text-white animate-glow" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-success border-2 border-background"></div>
            </div>
            <div>
              <h1 className="text-lg font-semibold">Soul</h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                <p className="text-xs text-muted-foreground">
                  {aiMoods[currentMood].mood}模式
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-xl">
                  <TrendingUp className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>情绪健康监测</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold mb-3">今日情绪曲线</h3>
                    <div className="h-32 flex items-end gap-2">
                      {emotionData.map((data, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div 
                            className="w-full rounded-t-lg gradient-primary transition-all"
                            style={{ height: `${data.score}%` }}
                          ></div>
                          <span className="text-xs text-muted-foreground">{data.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Card className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">主动关怀提醒</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          检测到你今天的情绪有些波动，记得好好休息哦
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          建议在 22:00 前入睡
                        </Badge>
                      </div>
                    </div>
                  </Card>

                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold">情绪洞察</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">整体状态</span>
                        <span className="font-medium text-success">良好</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">压力指数</span>
                        <span className="font-medium text-warning">中等</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">睡眠质量</span>
                        <span className="font-medium text-primary">优秀</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            <Button variant="ghost" size="icon" className="rounded-xl">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-6 pb-32">
        <div className="max-w-lg mx-auto space-y-4 animate-fade-in">
          {messages.map((message) => (
            <div key={message.id}>
              <div
                className={cn(
                  "flex gap-3 animate-slide-up",
                  message.sender === "user" && "flex-row-reverse"
                )}
              >
                {message.sender === "ai" && (
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="flex-1 flex flex-col gap-2">
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3 shadow-soft transition-smooth relative",
                      message.sender === "ai"
                        ? "bg-card"
                        : "gradient-primary text-white ml-auto"
                    )}
                  >
                    {message.hasMemory && message.sender === "ai" && (
                      <Badge 
                        variant="secondary" 
                        className="absolute -top-2 -left-2 text-xs bg-primary/10 text-primary border-primary/20"
                      >
                        💭 {message.memoryTag}
                      </Badge>
                    )}
                    {message.emotionDetected && message.sender === "ai" && (
                      <div className={cn(
                        "absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs",
                        message.emotionDetected === "positive" && "bg-success/20 text-success",
                        message.emotionDetected === "negative" && "bg-destructive/20 text-destructive",
                        message.emotionDetected === "neutral" && "bg-muted text-muted-foreground"
                      )}>
                        {message.emotionDetected === "positive" && "😊"}
                        {message.emotionDetected === "negative" && "😔"}
                        {message.emotionDetected === "neutral" && "😐"}
                      </div>
                    )}
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <span
                      className={cn(
                        "text-xs mt-1 block",
                        message.sender === "ai"
                          ? "text-muted-foreground"
                          : "text-white/70"
                      )}
                    >
                      {message.timestamp.toLocaleTimeString("zh-CN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
                {message.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">你</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Quick Replies */}
      {showQuickReplies && messages.length <= 1 && (
        <div className="fixed bottom-32 left-0 right-0 px-4 pb-4 animate-slide-up">
          <div className="max-w-lg mx-auto">
            <p className="text-xs text-muted-foreground mb-2 text-center">
              快捷回复
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {quickReplies.map((reply, index) => (
                <Button
                  key={index}
                  variant="secondary"
                  size="sm"
                  onClick={() => handleQuickReply(reply)}
                  className="rounded-full text-xs shadow-soft hover:shadow-elevated transition-all duration-300"
                >
                  {reply}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="fixed bottom-16 left-0 right-0 glass-effect border-t border-border px-4 py-4 shadow-elevated">
        <div className="max-w-lg mx-auto flex gap-2">
          <Button
            variant={isRecording ? "destructive" : "secondary"}
            size="icon"
            onClick={handleVoiceInput}
            className={cn(
              "rounded-xl transition-all duration-300",
              isRecording && "animate-pulse"
            )}
          >
            <Mic className="w-5 h-5" />
          </Button>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder={isRecording ? "正在录音..." : "说说你的想法..."}
            disabled={isRecording}
            className="flex-1 rounded-xl border-border bg-background/50"
          />
          <Button
            onClick={() => handleSend()}
            size="icon"
            disabled={!inputValue.trim() || isRecording}
            className="rounded-xl gradient-primary shadow-soft hover:shadow-elevated transition-all duration-300 hover:scale-105 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Companion;
