import request from "../request";

const userService = {
  getCurrentUserDetail() {
    return request.get<CurrentUserDetail>("/api/auth/current/user");
  },
};

export default userService;
