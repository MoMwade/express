import request from "@/request";
import { getAdminMenus } from "@/mock";

interface UserInfo {
    adminName: string;
    adminNo: string;
    avatarUrl: string | null;
    mobileNumber: string;
    realName: string;
}

export const UserService = {
    info: () => request.get<BaseRes<UserInfo>>("/api/admin/info"),
    menus: () => getAdminMenus(),
}