import request from "@/request";
export interface LoginData {
  adminName: string;
  adminPwd: string;
  no: string;
  verifyCode: string;
}

type LoginRes = BaseRes<null>;

interface VerifycodeRes {
  no: string;
  svg: string;
}

export const loginService = {
  login: (data: LoginData) => request.post<LoginRes>("/api/admin/login", data),
  verifycode: () =>
    request.get<BaseRes<VerifycodeRes>>("/api/admin/verifycode"),
};
