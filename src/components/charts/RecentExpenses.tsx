import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dayjs from "dayjs";
import useSWR from "swr";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";
interface Expense {
  _id: string;
  groupId: string;
  description: string;
  amount: number;
  paidBy: string;
  splitAmong: { userId: string; amount: number; isPaid: boolean }[];
  date: string;
  category?: string;
  comments?: { id: string; userId: string; text: string; timestamp: string }[];
}
const RecentExpenses = () => {
  const { data } = useSWR(`/api/spending?page=1`);
  const expenses = data?.expenses || [];

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.slice(0, 10).map((expense: Expense) => (
              <TableRow key={expense._id}>
                <TableCell>
                  <Badge>{expense.category}</Badge>
                </TableCell>

                <TableCell className="capitalize">
                  {expense.description || "Untitled"}
                </TableCell>

                <TableCell className="font-medium">
                  ₹{expense.amount.toFixed(2)}
                </TableCell>
                <TableCell className="font-medium">
                  {dayjs(expense.date).format("MMM D")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentExpenses;
