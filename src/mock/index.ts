import type { ComponentType } from "react";
export const pages = import.meta.glob<{default: ComponentType<unknown>}>("../pages/**/*.tsx");

const adminMenus = [
    {
        name: '数据总览',
        path: '/dashboard',
        componemtPath: '../pages/dashboard/index.tsx',
    },
    {
        name: '用户管理',
        path: '/user',
        componemtPath: '../pages/layouts/index.tsx',
        children: [
            { name: '代理列表', path: 'agent', componemtPath: '../pages/agent/index.tsx'  },
            { name: '管理员列表', path: 'manager', componemtPath: '../pages/manager/index.tsx'  },
            { name: '用户列表', path: 'client', componemtPath: '../pages/client/index.tsx'  },
        ]
    },
    {
        name: '订单管理',
        path: '/order',
        componemtPath: '../pages/layouts/index.tsx',
        children: [
            { name: '订单列表', path: 'list', componemtPath: '../pages/orderlist/index.tsx'  },
        ],
    }
];

export const getAdminMenus = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Promise<any[]>((resolve) => {
        window.setInterval(() => {
            resolve(adminMenus);
        },1000);
    })
};