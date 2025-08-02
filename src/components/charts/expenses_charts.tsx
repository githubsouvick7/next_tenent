import React, { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { TooltipProps } from "recharts";

interface SpendingChartProps {
  data: DayData[];
  peakAmount: number;
  avgSpending: number;
  totalSpending: number;
}
export interface DayData {
  date: string;
  amount: number;
  displayDate: string;
  dayOfWeek: string;
}

export interface ReportResponse {
  success: boolean;
  data: DayData[];
  period: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalSpending: number;
  averageDailySpending: number;
  peakAmount: number;
  peakDate: string;
}

const SpendingChart: React.FC<SpendingChartProps> = ({
  data,
  peakAmount,
  avgSpending,
  totalSpending,
}) => {
  const [timeframe] = useState<string>("month");

  // Generate sample data for different timeframes using the API structure
  const generateTimeframeData = useMemo(() => {
    return data.map((item, index) => ({
      ...item,
      day: index + 1,
    }));
  }, [data]);

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const dataPoint = generateTimeframeData.find(
        (item) => item.day === label
      );
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-2 shadow-lg">
          <p className="text-sm text-black">
            {timeframe === "day"
              ? dataPoint?.displayDate
              : timeframe === "week"
              ? dataPoint?.dayOfWeek
              : dataPoint?.displayDate}
          </p>
          <p className="text-sm font-semibold text-purple-600">
            ₹
            {payload[0]?.value !== undefined
              ? payload[0].value.toLocaleString()
              : ""}
          </p>
        </div>
      );
    }
    return null;
  };

  const formatXAxisTick = (value: number): string => {
    const dataPoint = generateTimeframeData.find((item) => item.day === value);
    if (timeframe === "day") {
      return `${value}h`;
    } else if (timeframe === "week") {
      return dataPoint?.dayOfWeek?.slice(0, 3) || value.toString();
    }
    return dataPoint?.displayDate?.split(" ")[1] || value.toString();
  };

  return (
    <div className="bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 rounded-xl md:rounded-2xl overflow-hidden">
      <div className="px-2 md:px-6">
        <div className="h-56 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={generateTimeframeData}
              margin={{
                top: 10,
                right: 8,
                left: 8,
                bottom: 20,
              }}
            >
              <defs>
                <linearGradient
                  id="spendingGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.8} />
                  <stop offset="50%" stopColor="#A78BFA" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#C4B5FD" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#374151"
                opacity={0.3}
              />

              <XAxis
                dataKey="day"
                stroke="#9CA3AF"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatXAxisTick}
                interval="preserveStartEnd"
                height={30}
              />

              <YAxis
                stroke="#9CA3AF"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `₹${value}`}
                width={40}
              />

              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="amount"
                stroke="#8B5CF6"
                strokeWidth={2}
                fill="url(#spendingGradient)"
                animationDuration={1000}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stats Section */}
      <div className="p-3 md:p-6 pt-2 md:pt-4">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-6">
          <div className="rounded-lg p-3 text-center">
            <p className="text-xs md:text-sm mb-1">
              Average {timeframe === "day" ? "Hourly" : "Daily"}
            </p>
            <p className="text-sm md:text-xl font-bold">
              ₹{avgSpending.toLocaleString()}
            </p>
          </div>
          <div className="rounded-lg p-3 text-center">
            <p className="text-xs md:text-sm mb-1">Total Spending</p>
            <p className="text-sm md:text-xl font-bold">
              ₹{totalSpending.toLocaleString()}
            </p>
          </div>
          <div className="rounded-lg p-3 text-center">
            <p className="text-xs md:text-sm mb-1">Peak Amount</p>
            <p className="text-sm md:text-xl font-bold">
              ₹{peakAmount.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendingChart;
