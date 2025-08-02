"use client";
import { useUser } from "@/context/userContext";
import { fetcher } from "@/lib/fetcher";
import { AnimatePresence, motion } from "framer-motion";
import { PieChart as PieChartIcon } from "lucide-react";
import React, { useState } from "react";
import useSWR from "swr";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ExpenseItem {
  name: string;
  value: number;
}

interface TooltipData {
  visible: boolean;
  name: string;
  value: number;
  percentage: string;
  position: { x: number; y: number };
}

type RangeType = "day" | "yesterday" | "week" | "this_month" | "last_month";

const PieChart = () => {
  const { currentUser } = useUser();
  const [range, setRange] = useState<RangeType>("week");

  const [tooltipData, setTooltipData] = useState<TooltipData>({
    visible: false,
    name: "",
    value: 0,
    percentage: "",
    position: { x: 0, y: 0 },
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const {
    data: dataByRange = {
      day: [],
      yesterday: [],
      week: [],
      this_month: [],
      last_month: [],
    },
  } = useSWR<Record<RangeType, ExpenseItem[]>>(
    currentUser?._id ? `/api/piecharts?userId=${currentUser._id}` : null,
    fetcher
  );

  const data = dataByRange[range] ?? [];
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

  const expensesLabel: Record<RangeType, string> = {
    day: "Today's",
    yesterday: "Yesterday's",
    week: "Last week's",
    this_month: "This month's",
    last_month: "Last month's",
  };

  return (
    <div className="w-full">
      <div className="border-b p-4 border-gray-100 flex items-center gap-4 justify-between">
        <div className="flex items-center gap-2">
          <PieChartIcon className="w-5 h-5 text-blue-500" />
          <h2 className="text-base sm:text-lg md:text-xl font-semibold">
            {expensesLabel[range]} Expenses
          </h2>
        </div>
        <Select value={range} onValueChange={(val: RangeType) => setRange(val)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Today</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <SelectItem value="week">Last 7 days</SelectItem>
            <SelectItem value="this_month">This month</SelectItem>
            <SelectItem value="last_month">Last month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col items-center gap-6 mt-4">
        <motion.div
          className="relative w-full max-w-[300px] aspect-square mx-auto"
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            role="img"
            aria-label="Pie chart of expenses"
          >
            {slices.map((slice, index) => (
              <motion.path
                key={slice.name}
                d={slice.path}
                fill={slice.color}
                stroke={"white"}
                strokeWidth="1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
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
              fill={"white"}
              className="drop-shadow-sm"
            />
            <text
              x="50"
              y="52"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs font-bold text-black"
            >
              ₹{total}
            </text>
          </svg>

          {/* Tooltip */}
          <AnimatePresence>
            {tooltipData.visible && (
              <motion.div
                className="absolute z-10 px-3 py-2 backdrop-blur-lg rounded-lg shadow-lg border text-xs sm:text-sm bg-white dark:bg-black text-black dark:text-white"
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
                  <span>₹{tooltipData.value.toFixed(2)}</span>
                  <span className="font-semibold">
                    {tooltipData.percentage}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-col gap-2 w-full max-w-md px-2">
          {slices.map((item, index) => (
            <motion.div
              key={item.name}
              className="flex items-center justify-between gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs sm:text-sm">{item.name}</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm">
                <span className="font-medium">₹{item.value}</span>
                <span>{Math.round(item.percentage)}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChart;
