import React from "react";
import { PieChart, ArrowDown, Lightbulb } from "lucide-react";

const steps = [
  {
    icon: <PieChart className="w-10 h-10 md:w-12 md:h-12 text-fimon-teal" />,
    title: "Track",
    description:
      "Connect your accounts and track all your finances in one place automatically.",
  },
  {
    icon: <ArrowDown className="w-10 h-10 md:w-12 md:h-12 text-fimon-blue" />,
    title: "Analyze",
    description:
      "Our powerful algorithms analyze your spending habits and financial patterns.",
  },
  {
    icon: <Lightbulb className="w-10 h-10 md:w-12 md:h-12 text-fimon-purple" />,
    title: "Save",
    description:
      "Identify opportunities to save money based on your personal financial data.",
  },
  {
    icon: <Lightbulb className="w-10 h-10 md:w-12 md:h-12 text-fimon-blue" />,
    title: "Get AI Guidance",
    description:
      "Receive personalized recommendations and insights to optimize your finances.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-12 md:py-20 bg-fimon-lightgray">
      <div className="container-padding max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16 animate-fade-in">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
            How Fimon.app Works
          </h2>
          <p className="max-w-2xl mx-auto text-fimon-slate text-sm md:text-base">
            Our simple four-step process helps you take control of your finances
            with minimal effort
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="rounded-xl p-4 md:p-6 text-center card-shadow animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center mb-3 md:mb-4">
                {step.icon}
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-fimon-navy">
                {step.title}
              </h3>
              <p className="text-fimon-slate text-sm md:text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
