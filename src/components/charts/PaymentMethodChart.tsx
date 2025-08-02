
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPaymentMethodData } from "@/lib/mock-data";

const PaymentMethodChart = () => {
  const data = getPaymentMethodData();

  const methodLabels = {
    credit: "Credit Card",
    debit: "Debit Card",
    cash: "Cash",
    upi: "UPI/Digital",
  };

  const formattedData = data.map((item) => ({
    ...item,
    name: methodLabels[item.name as keyof typeof methodLabels] || item.name,
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Payment Methods</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={formattedData}
              margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
              <Bar dataKey="value" fill="#9b87f5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodChart;
