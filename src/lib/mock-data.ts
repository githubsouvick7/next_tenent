export interface Expense {
  id: string;
  title: string;
  category: "food" | "travel" | "rent" | "bills" | "other";
  amount: number;
  date: string;
  description: string;
  paymentMethod: "credit" | "debit" | "cash" | "upi";
}

export interface ChartData {
  name: string;
  value: number;
}

export const mockExpenses: Expense[] = Array.from({ length: 50 }, (_, i) => {
  const categories = ["food", "travel", "rent", "bills", "other"] as const;
  const paymentMethods = ["credit", "debit", "cash", "upi"] as const;

  return {
    id: `exp-${i + 1}`,
    title: `Expense ${i + 1}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    amount: Math.floor(Math.random() * 10000) / 100,
    date: new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    ).toISOString(),
    description: `Description for expense ${i + 1}`,
    paymentMethod:
      paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
  };
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const getCategoryData = (): ChartData[] => {
  const categoryTotals: Record<string, number> = {};

  mockExpenses.forEach((expense) => {
    if (!categoryTotals[expense.category]) {
      categoryTotals[expense.category] = 0;
    }
    categoryTotals[expense.category] += expense.amount;
  });

  return Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value: Number(value.toFixed(2)),
  }));
};

export const getPaymentMethodData = (): ChartData[] => {
  const methodTotals: Record<string, number> = {};

  mockExpenses.forEach((expense) => {
    if (!methodTotals[expense.paymentMethod]) {
      methodTotals[expense.paymentMethod] = 0;
    }
    methodTotals[expense.paymentMethod] += expense.amount;
  });

  return Object.entries(methodTotals).map(([name, value]) => ({
    name,
    value: Number(value.toFixed(2)),
  }));
};

export const getTimeSeriesData = (
  period: "day" | "week" | "month" | "year"
) => {
  // This is a simplified version - in a real app, we'd use more sophisticated date manipulation
  const labels: string[] = [];
  const data: number[] = [];

  const now = new Date();
  let dateFormat: Intl.DateTimeFormatOptions;

  switch (period) {
    case "day":
      dateFormat = { hour: "numeric" };
      for (let i = 0; i < 24; i++) {
        const date = new Date(now);
        date.setHours(i, 0, 0, 0);
        labels.push(date.toLocaleTimeString(undefined, dateFormat));
        data.push(Math.random() * 100);
      }
      break;
    case "week":
      dateFormat = { weekday: "short" };
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString(undefined, dateFormat));
        data.push(Math.random() * 500);
      }
      break;
    case "month":
      dateFormat = { day: "numeric" };
      for (let i = 29; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString(undefined, dateFormat));
        data.push(Math.random() * 1000);
      }
      break;
    case "year":
      dateFormat = { month: "short" };
      for (let i = 11; i >= 0; i--) {
        const date = new Date(now);
        date.setMonth(date.getMonth() - i);
        labels.push(date.toLocaleDateString(undefined, dateFormat));
        data.push(Math.random() * 5000);
      }
      break;
  }

  return { labels, data };
};

export const mockProfile = {
  name: "Alex Johnson",
  age: 32,
  email: "alex.johnson@example.com",
  phone: "+1 (555) 123-4567",
  profilePicture: "https://i.pravatar.cc/300",
  limits: {
    creditCard: 1000,
    food: 500,
    travel: 300,
    notifications: {
      email: true,
      sms: false,
    },
  },
};
