import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, Sparkles } from "lucide-react";
import { useState } from "react";
const AdvisorSection = () => {
  return (
    <div className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-4 sm:left-10 w-20 h-20 sm:w-32 sm:h-32 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div
          className="absolute top-20 right-4 sm:right-10 w-20 h-20 sm:w-32 sm:h-32  rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-10 left-8 sm:left-20 w-20 h-20 sm:w-32 sm:h-32  rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left animate-slide-up order-2 lg:order-1">
            <div className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2  rounded-full shadow-sm border border-gray-200 mb-6 sm:mb-8">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 mr-2" />
              <span className="text-xs sm:text-sm font-medium ">
                AI-Powered Financial Intelligence
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              AI-Powered
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Financial Advisor
              </span>
            </h1>

            <p className="text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Our AI analyzes your financial behavior and provides personalized
              recommendations to help you save more, spend wisely, and reach
              your financial goals.
            </p>

            {/* <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 hover:bg-gray-50 transition-all duration-300"
              >
                Watch Demo
              </Button>
            </div> */}

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-6 lg:space-x-8 mt-8 sm:mt-12 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span>Bank-level Security</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                <span>Real-time Analysis</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right side - AI Chat Demo */}
          <div
            className="flex justify-center animate-fade-in-delayed order-1 lg:order-2"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative w-full max-w-sm sm:max-w-md">
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 z-10 bg-gradient-to-r from-orange-500 to-red-500  px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                Coming Soon!
              </div>
              <div className="relative flex justify-center items-center animate-fade-in">
                <div className="relative">
                  <div className="relative bg-gray-800 rounded-3xl p-2 shadow-2xl">
                    <div className="bg-black rounded-2xl p-1">
                      <div className="relative w-[300px] h-[550px] rounded-2xl overflow-hidden bg-gray-900">
                        <AIChat />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-[slide-in-right_1.5s_ease-out_3.5s_both] skew-x-12"></div>
                      </div>
                    </div>
                    <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-20 h-5 bg-gray-800 rounded-b-lg"></div>
                    <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-black rounded-full"></div>
                  </div>
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-4 bg-black/20 rounded-full blur-lg"></div>
                </div>
              </div>

              <div className="hidden sm:block absolute -top-4 -left-4 w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse-slow"></div>
              <div
                className="hidden sm:block absolute -bottom-4 -right-4 w-4 h-4 lg:w-6 lg:h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse-slow"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="hidden sm:block absolute top-1/2 -right-6 lg:-right-8 w-3 h-3 lg:w-4 lg:h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse-slow"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorSection;

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi Sarah! I've analyzed your spending this month. Would you like to hear where you might be able to save some money?",
      isUser: false,
      timestamp: new Date(),
    },
    {
      id: 2,
      text: "Yes, please! I'm trying to save for a vacation.",
      isUser: true,
      timestamp: new Date(),
    },
    {
      id: 3,
      text: "Great! I noticed you're spending $45 weekly on coffee shops. Making coffee at home 2 days a week could save you $32 monthly. Also, you have 3 overlapping streaming subscriptions, removing one would save $12.99/mo.",
      isUser: false,
      timestamp: new Date(),
    },
    {
      id: 4,
      text: "That's helpful! Can you create a savings plan for me to reach $1,000 in 3 months?",
      isUser: true,
      timestamp: new Date(),
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputMessage,
        isUser: true,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
    }
  };

  return (
    <div className="relative w-full">
      <div className="h-[600px] rounded-2xl shadow-xl overflow-hidden w-full max-w-sm sm:max-w-md mx-auto animate-slide-up">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 pt-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 sm:w-6 sm:h-6 " />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold text-sm">Fimon AI Advisor</h3>
              <p className="text-xs">Always here to help</p>
            </div>
          </div>
        </div>

        <div className="h-[435px] overflow-y-auto p-2">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              } animate-fade-in-delayed my-1`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div
                className={`max-w-[85%] sm:max-w-[80%] p-2 sm:p-3 rounded-2xl ${
                  message.isUser
                    ? "bg-gray-100 text-gray-900"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                }`}
              >
                <p className="text-xs">{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-1 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <Input
              placeholder="Ask me anything about your finances..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 text-xs sm:text-sm"
            />
            <Button
              onClick={handleSendMessage}
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
