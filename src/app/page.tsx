"use client";

import AdvisorSection from "@/components/content/AdvisorSection";
import CtaSection from "@/components/content/CtaSection";
import FeaturesSection from "@/components/content/FeaturesSection";
import { HeroScrollDemo } from "@/components/content/HeroSection";
import HowItWorksSection from "@/components/content/HowItWorksSection";
import LaptopUi from "@/components/content/laptopUi";
import MobileUi from "@/components/content/mobileUi";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userContext";
import { cn } from "@/lib/utils";
import { ArrowRight, BarChart3, PieChart, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import Page from "./dashboard/page";

export default function Home() {
  const { isAuthenticated } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return <Page />;
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      }
    >
      <div className="p-1">
        <div className="flex items-center justify-center bg-white dark:bg-black">
          <div
            className={cn(
              "absolute inset-0",
              "[background-size:40px_40px]",
              "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
              "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
            )}
          />

          <HomePage />
        </div>
        <div className="md:hidden flex flex-col items-center justify-center bg-white dark:bg-black">
          <div className="flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Take Control of Your Money modern way with <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Fimon.app
              </span>
            </h1>
          </div>
          <MobileUi />
        </div>
        <div className="hidden md:block">
          <HeroScrollDemo />
        </div>
        <HowItWorksSection />
        <FeaturesSection />
        <AdvisorSection />
        {/* <AnimatedTestimonials testimonials={testimonials} /> */}
        <CtaSection />
      </div>
    </Suspense>
  );
}

const HomePage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-pink-500 opacity-30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20">
          <div className="md:ml-24 space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Financial
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                {" "}
                Intelligence{" "}
              </span>
              Monitor
            </h1>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed max-w-xl">
              Visualize your spending, track expenses, and make smarter
              financial decisions with our beautiful and intuitive dashboard.
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-3">
              {[
                {
                  icon: <PieChart className="w-4 h-4" />,
                  label: "Expense Analytics",
                },
                {
                  icon: <TrendingUp className="w-4 h-4" />,
                  label: "Spending Insights",
                },
                {
                  icon: <BarChart3 className="w-4 h-4" />,
                  label: "Budget Management",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-2 px-4 py-2 text-sm rounded-full backdrop-blur-sm"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="px-8 py-4 text-lg font-semibold group transition-all duration-300 hover:scale-105"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap sm:flex-nowrap justify-between gap-6 pt-8">
              {[
                { value: "50K+", label: "Active Users" },
                { value: "$2M+", label: "Tracked Expenses" },
                { value: "99.9%", label: "Uptime" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center flex-1">
                  <div className="text-2xl sm:text-3xl font-bold">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{ right: "-50%" }}
            className="absolute md:top-4 w-full md:flex justify-center hidden"
          >
            <LaptopUi />
          </div>
        </div>
      </div>
    </div>
  );
};
