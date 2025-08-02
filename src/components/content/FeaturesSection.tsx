import {
  ArrowRight,
  BarChart,
  LayoutDashboard,
  Lightbulb,
  Smartphone,
} from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const data = [
  { name: "Food", value: 100 },
  { name: "Transport", value: 60 },
  { name: "Shopping", value: 40 },
  { name: "Subscriptions", value: 30 },
  { name: "Rent", value: 80 },
  { name: "Utilities", value: 30 },
];

const FeaturesSection = () => {
  const [tooltipData, setTooltipData] = useState({
    visible: false,
    name: "",
    value: 0,
    percentage: "",
    position: { x: 0, y: 0 },
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleSliceHover = (
    isHovered: boolean,
    name: string,
    value: number,
    percentage: string
  ) => {
    setTooltipData({
      visible: isHovered,
      name,
      value,
      percentage,
      position: {
        x: mousePosition.x + 10,
        y: mousePosition.y - 40,
      },
    });
  };

  const colorPalette = [
    "rgb(0, 122, 255)",
    "rgb(255, 59, 48)",
    "rgb(88, 86, 214)",
    "rgb(76, 217, 100)",
    "rgb(255, 149, 0)",
    "rgb(52, 199, 89)",
    "rgb(175, 82, 222)",
    "rgb(255, 204, 0)",
  ];

  let currentAngle = 0;
  const slices = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const startAngle = currentAngle;
    currentAngle += (percentage * 360) / 100;

    const endAngle = startAngle + (percentage * 360) / 100;
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const startX = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
    const startY = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
    const endX = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
    const endY = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);

    const centerAngle = (startAngle + endAngle) / 2;
    const hoverOffsetX = 2 * Math.cos((centerAngle * Math.PI) / 180);
    const hoverOffsetY = 2 * Math.sin((centerAngle * Math.PI) / 180);

    return {
      ...item,
      percentage,
      color: colorPalette[index % colorPalette.length],
      path: `M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY} Z`,
      hoverOffset: { x: hoverOffsetX, y: hoverOffsetY },
    };
  });

  const theme = localStorage.getItem("theme");

  return (
    <section id="features" className="py-20">
      <div className="container-padding max-w-7xl mx-auto">
        <div className="text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features
          </h2>
          <p className="max-w-2xl mx-auto text-fimon-slate">
            Everything you need to take control of your financial life in one
            simple app
          </p>
          <div className="flex justify-center items-center flex-col">
            <div className="flex items-center">
              <h3 className="text-xl font-semibold">Expense Analytics</h3>
            </div>
            <p className="text-fimon-slate mb-6">
              Visualize your spending with detailed pie charts showing exactly
              where your money goes each month.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-16">
          <div className="animate-fade-in animate-delay-200 w-full">
            <div className="max-w-md mx-auto">
              <motion.div
                className="relative w-full aspect-square max-w-xs mx-auto"
                onMouseMove={handleMouseMove}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {slices.map((slice, index) => (
                    <motion.path
                      key={slice.name}
                      d={slice.path}
                      fill={slice.color}
                      stroke={theme === "dark" ? "black" : "white"}
                      strokeWidth="1"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        translateX: 0,
                        translateY: 0,
                      }}
                      whileHover={{
                        translateX: slice.hoverOffset.x,
                        translateY: slice.hoverOffset.y,
                        scale: 1.03,
                      }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      onMouseEnter={() =>
                        handleSliceHover(
                          true,
                          slice.name,
                          slice.value,
                          `${Math.round(slice.percentage)}%`
                        )
                      }
                      onMouseLeave={() => handleSliceHover(false, "", 0, "")}
                      className="cursor-pointer transition-all"
                    />
                  ))}
                  <circle
                    cx="50"
                    cy="50"
                    r="20"
                    fill={theme === "dark" ? "black" : "white"}
                    className="drop-shadow-sm"
                  />
                  <text
                    x="50"
                    y="52"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs font-bold fill-black dark:fill-white"
                  >
                    ${total}
                  </text>
                </svg>

                <AnimatePresence>
                  {tooltipData.visible && (
                    <motion.div
                      className="absolute z-10 px-3 py-2 backdrop-blur-lg rounded-lg shadow-lg border text-sm"
                      style={{
                        left: tooltipData.position.x,
                        top: tooltipData.position.y,
                        transformOrigin: "center",
                      }}
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="font-medium">{tooltipData.name}</p>
                      <div className="flex justify-between gap-3 mt-1">
                        <span>${tooltipData.value.toFixed(2)}</span>
                        <span className="font-semibold">
                          {tooltipData.percentage}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                {slices.map((item, index) => (
                  <motion.div
                    key={item.name}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm flex-1">{item.name}</span>
                    <span className="text-sm font-medium">${item.value}</span>
                    <span className="text-xs w-8 text-right">
                      {Math.round(item.percentage)}%
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className=" rounded-xl p-6 shadow-md animate-fade-in animate-delay-300">
            <div className="flex items-center mb-4">
              <BarChart className="w-7 h-7 text-fimon-teal mr-3" />
              <h3 className="text-lg font-semibold">
                Monthly vs Daily Expenses
              </h3>
            </div>
            <p className="text-fimon-slate mb-4">
              Compare your daily spending with monthly averages to spot
              patterns.
            </p>
            <a
              href="#"
              className="text-fimon-blue font-medium flex items-center"
            >
              Learn more <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          {/* Feature 4: Smart AI Suggestions */}
          <div className=" rounded-xl p-6 shadow-md animate-fade-in animate-delay-400">
            <div className="flex items-center mb-4">
              <Lightbulb className="w-7 h-7 text-fimon-purple mr-3" />
              <h3 className="text-lg font-semibold">Smart AI Suggestions</h3>
            </div>
            <p className="text-fimon-slate mb-4">
              Get personalized suggestions on how to save money based on your
              habits.
            </p>
            <a
              href="#"
              className="text-fimon-blue font-medium flex items-center"
            >
              Learn more <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          {/* Feature 5: Cross Platform */}
          <div className=" rounded-xl p-6 shadow-md animate-fade-in animate-delay-500">
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                <LayoutDashboard className="w-7 h-7 text-fimon-blue mr-1" />
                <span className="mx-1">+</span>
                <Smartphone className="w-7 h-7 text-fimon-blue ml-1" />
              </div>
              <h3 className="text-lg font-semibold ml-2">
                Cross-Platform Access
              </h3>
            </div>
            <p className="text-fimon-slate mb-4">
              Access your financial dashboard from any device, anytime,
              anywhere.
            </p>
            <a
              href="#"
              className="text-fimon-blue font-medium flex items-center"
            >
              Learn more <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
