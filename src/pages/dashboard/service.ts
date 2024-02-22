import request from "@/request";

interface TotalRes {
    incomeTotal: number;
    orderCompleteTotal: number;
    tradeTotal: number;
    userTotal: number;
    yesterdayIncomeTotal: number;
    yesterdayOrderCompleteTotal: string;
    yesterdayTradeTotal: number;
    yesterdayUserTotal: string;
}

export const DashboardService = {
    total: () =>
      request.get<BaseRes<TotalRes>>("/api/admin/analysis/total"),
  };
