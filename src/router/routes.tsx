/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
export const modules = import.meta.glob("../pages/**/index.tsx");

export const componentPaths = Object.keys(modules).map((path) =>
  path.replace("../pages", "")
);

export const components = Object.keys(modules).reduce((prev, path: string) => {
  const formatPath = path.replace("../pages", "");
  // 这里其实就是动态加载js，如果报错了说明js资源不存在
  prev[formatPath] = async () =>
    (await modules[path]()) as Promise<React.ReactNode>;
  return prev;
}, {} as Record<string, () => Promise<React.ReactNode>>);
