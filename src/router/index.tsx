/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import type { RouteObject } from "react-router-dom";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { App as AntApp } from "antd";
import { antdUtils } from "@/utils/antd";
import Login from "@/pages/login";
import BasicLayout from "@/pages/layouts";
import Dashboard from "@/pages/dashboard";
   // import RouterErrorElement from "@/pages/error-pages/router-error-element";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: BasicLayout,
    children: [
      { path: "dashboard", Component: Dashboard },
    ],
  },
  {
    path: "/user/login",
    Component: Login,
  },
  // {
  //   path: "*",
  //   Component: BasicLayout,
  //   children: [],
  //   errorElement: <RouterErrorElement />,
  // },
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
  // 通过RouterProvider的router属性 来渲染路由
  // BrowserRouter + Routes + Route === RouterProvider + createBrowserRouter
  return <RouterProvider router={router} />;
};

export default Router;
