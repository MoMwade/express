/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { App as AntApp } from "antd";
import { antdUtils } from "@/utils/antd";
import Login from "@/pages/login";
import BasicLayout from "@/layouts";
import ResetPassword from "@/pages/login/reset-password";
import RouterErrorElement from "@/pages/router-error-element";

export const router = createBrowserRouter([
  {
    path: "/user/login",
    Component: Login,
  },
  {
    path: "/user/reset-password",
    Component: ResetPassword,
  },
  {
    path: "/",
    element: <Navigate to="/user/login" />,
  },
  {
    path: "*",
    Component: BasicLayout,
    children: [],
    errorElement: <RouterErrorElement />,
  },
]);

export const toLoginPage = () => {
  router.navigate("/user/login");
};

function findNodeByPath(routes: RouteObject[], path: string) {
  for (let i = 0; i < routes.length; i += 1) {
    const element = routes[i];
    if (element.path === path) return element;
    findNodeByPath(element.children || [], path);
  }
}

// export const addRoutes = (parentPath: string, routes: RouteObject[]) => {
//   if (!parentPath) {
//     return router.routes.push(...(routes as any));
//   }
//   const curNode = findNodeByPath(router.routes, parentPath);
//   if (curNode?.children) {
//     curNode?.children.push(...routes);
//   } else if (curNode) {
//     curNode.children = routes;
//   }
// };

export const replaceRoutes = (parentPath: string, routes: RouteObject[]) => {
  if (!parentPath) {
    return router.routes.push(...(routes as any));
  }
  const curNode = findNodeByPath(router.routes, parentPath);
  if (curNode) {
    curNode.children = routes;
  }
};

const Router = () => {
  const { notification, message, modal } = AntApp.useApp();
  useEffect(() => {
    antdUtils.setMessageInstance(message);
    antdUtils.setNotificationInstance(notification);
    antdUtils.setModalInstance(modal);
  }, [notification, message, modal]);

  return <RouterProvider router={router} />;
};

export default Router;
