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

type UserDataType = {
    date: string;
    wx: number;
    user: number;
}
type StatusType = {
    cancel: string;
    close: string;
    complete: string;
    refund: string;
    sending: string;
    waitConfirm: string;
    waitPay: string;
    waitReceive: string;
}
type NewType = {
    cancel: number;
    close: number;
    complete: number;
    date: string; 
    sending: number; 
    waitConfirm: number;
    waitPay: number;
    waitReceive: number;
}

interface AnalysisParameter  {
    beginDate?: number;
    endDate?: number;
}

export const DashboardService = {
    total: () =>
      request.get<BaseRes<TotalRes>>("/api/admin/analysis/total"),
    analysis: (params: AnalysisParameter) =>
      request.get<BaseRes<UserDataType[]>>("/api/admin/analysis/new/user", { params }),
    orderStatus: (params: AnalysisParameter) =>
      request.get<BaseRes<StatusType>>("/api/admin/analysis/order/status", { params }),
    orderNew: (params: AnalysisParameter) =>
      request.get<BaseRes<NewType[]>>("/api/admin/analysis/new/order", { params }),
};
