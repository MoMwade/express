/* eslint-disable @typescript-eslint/no-explicit-any */
/* 自动导入 */
/* vite打包 import.meta.glob  */
import React from "react";
// glob语法
// ** 任意目录名称
// * 任意文件名称
export const modules = import.meta.glob("../pages/**/*.tsx");

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
