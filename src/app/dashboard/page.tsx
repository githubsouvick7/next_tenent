"use client";

import SpendingChart from "@/components/charts/expenses_charts";
import RecentExpenses from "@/components/charts/RecentExpenses";
import Loading from "@/components/custom/Loading";
import { Card } from "@/components/ui/card";
import { useUser } from "@/context/userContext";
import PieChart from "../../components/charts/pie_charts";
import { fetcher } from "@/lib/fetcher";
import { useEffect, useState } from "react";

export interface DayData {
  date: string; // e.g., "2025-06-05"
  amount: number;
  displayDate: string; // e.g., "Jun 6"
  dayOfWeek: string; // e.g., "Fri"
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

export default function Page() {
  const { isAuthenticated } = useUser();

  const { currentUser } = useUser();
  const [sampleSpendingData, setSampleSpendingData] =
    useState<ReportResponse>();

  const fetchData = () => {
    if (!currentUser?._id) return;
    fetcher(`/api/barcharts/last30days?userId=${currentUser?._id}`)
      .then((res) => {
        setSampleSpendingData(res as ReportResponse);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(fetchData, [currentUser, currentUser?._id]);
  console.log("object", sampleSpendingData);

  if (!isAuthenticated) return <Loading />;
  return (
    <div className="p-1 w-full h-full grid grid-cols-1 gap-6">
      <div className="">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Fimon Dashboard</h1>
          <p className="text-gray-600">
            Track your spending patterns and financial insights
          </p>
        </div>

        <div className="grid gap-6">
          {sampleSpendingData && (
            <SpendingChart
              data={sampleSpendingData.data}
              peakAmount={sampleSpendingData.peakAmount}
              avgSpending={sampleSpendingData.averageDailySpending}
              totalSpending={sampleSpendingData.totalSpending}
            />
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <Card className="">
          <PieChart />
        </Card>
        <RecentExpenses />
      </div>
    </div>
  );
}
