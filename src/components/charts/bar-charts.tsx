import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  TooltipItem,
} from "chart.js";
import { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Card } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type TimePeriod = "lastWeek" | "lastMonth" | "last3Months" | "last6Months";

interface PaymentData {
  labels: string[];
  values: number[];
}

// Mock data for different time periods
const paymentMethodsData: Record<TimePeriod, PaymentData> = {
  lastWeek: {
    labels: ["UPI/Digital", "Cash", "Debit Card", "Credit Card"],
    values: [650, 400, 250, 500],
  },
  lastMonth: {
    labels: ["UPI/Digital", "Cash", "Debit Card", "Credit Card"],
    values: [850, 650, 350, 620],
  },
  last3Months: {
    labels: ["UPI/Digital", "Cash", "Debit Card", "Credit Card"],
    values: [1200, 780, 420, 820],
  },
  last6Months: {
    labels: ["UPI/Digital", "Cash", "Debit Card", "Credit Card"],
    values: [2400, 1650, 950, 1800],
  },
};

function BarCharts() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("lastMonth");
  const chartRef = useRef<ChartJS<"bar">>(null);

  const timeOptions: { value: TimePeriod; label: string }[] = [
    { value: "lastWeek", label: "Last Week" },
    { value: "lastMonth", label: "Last Month" },
    { value: "last3Months", label: "Last 3 Months" },
    { value: "last6Months", label: "Last 6 Months" },
  ];

  // Apply animation effect when data changes
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, [timePeriod]);

  const data = paymentMethodsData[timePeriod];

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Amount (₹)",
        data: data.values,
        backgroundColor: "rgba(139, 92, 246, 0.7)",
        borderColor: "rgba(139, 92, 246, 1)",
        borderWidth: 1,
        borderRadius: 6,
        hoverBackgroundColor: "rgba(139, 92, 246, 0.9)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 800,
      easing: "easeInOutQuart" as const,
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          callback: function (tickValue: number | string) {
            return `₹${tickValue}`;
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#333",
        bodyColor: "#666",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: (context: TooltipItem<"bar">) => `Amount: ₹${context.raw}`,
        },
      },
    },
  };

  return (
    <Card>
      <div className="w-full max-w-4xl">
        <div className="transition-all duration-300">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-lg md:text-xl font-semibold">
                  Payment Methods
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <Select
                  value={timePeriod}
                  onValueChange={(value) => setTimePeriod(value as TimePeriod)}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="w-full h-[400px]">
              <Bar ref={chartRef} data={chartData} options={options} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default BarCharts;
