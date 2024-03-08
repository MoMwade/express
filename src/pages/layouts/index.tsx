/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect,  type FC, lazy} from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { App, Layout, Menu } from "antd";
import {
    DashboardFilled,
    ContactsFilled,
    HddFilled,
    SettingFilled,
    ShopFilled,
    CarFilled,
    ReconciliationFilled,
    MoneyCollectFilled,
    RedEnvelopeFilled,
  } from '@ant-design/icons';
import { useRequest } from "ahooks";
import Cookies from "js-cookie";
import GloablLoading from "@/components/global-loading";
import { pages } from "@/mock";
import { router } from "@/router";
import { UserService } from "./service";



const { Header, Content, Sider } = Layout; 
const MenuItem = [
    {
        key: '0',
        icon: <DashboardFilled />,
        label: '数据总览',
        children: null,
    },
    {
        key: '1',
        icon: <ContactsFilled />,
        label: '用户管理',
        children: [
            { key: '1-1', label: '代理列表' },
            { key: '1-2', label: '管理员列表' },
            { key: '1-3', label: '用户列表' },
        ],
    },
    {
        key: '2',
        icon: <HddFilled />,
        label: '订单管理',
        children: [
            { key: '2-1', label: '订单列表' },
            { key: '2-2', label: '资金走向列表' },
            { key: '2-3', label: '取消订单列表' },
            { key: '2-4', label: '小费选项配置列表' },
        ],
    },
    {
        key: '3',
        icon: <CarFilled />,
        label: '骑手管理',
        children:null,
    },
    {
        key: '4',
        icon: <ShopFilled />,
        label: '城市管理',
        children:null,
    },
    {
        key: '5',
        icon: <ReconciliationFilled />,
        label: '运营管理',
        children:null,
    },
    {
        key: '6',
        icon: <MoneyCollectFilled />,
        label: '优惠卷管理',
        children:null,
    },
    {
        key: '7',
        icon: <RedEnvelopeFilled />,
        label: '提现管理',
        children:null,
    },
    {
        key: '8',
        icon: <SettingFilled />,
        label: '系统管理',
        children:null,
    },
]


const Basiclayouts: FC = () => {
    /* hooks区 */
    const navigate = useNavigate();
    const { modal } = App.useApp();
    /* 计算值区 */
    if(!Cookies.get("token")) {
        navigate("/user/login");
    }
    /* (请求)API区 */
    const { data: userInfo, loading } = useRequest(UserService.info);
    const { data: userMenus } = useRequest(UserService.menus);
    /* uesEffect区 */
    useEffect(() => {
        if(!userMenus) return;
        // console.log(treeMenus(userMenus));
        router.routes.push(...treeMenus(userMenus))
        // console.log(router.routes);
    }, [userMenus])
    /* handel区 */
    if(userInfo?.data.code === 203) {
        modal.warning({
            title: "警告",
            content: userInfo?.data.msg,
        })
        navigate("/user/login");
    }
    
    const treeMenus = function(menus: any[]): any[] {
        const arr : any[] = [];
        menus.map((item) => {
            arr.push({
                ...item,
                Component:lazy(pages[item.componemtPath]),
                children:item.children ? treeMenus(item.children): null
            })
        })
        return arr;
    }
    /* return区 */
    if(loading){
        return <GloablLoading />;
    }
    return (
        <Layout style={{minHeight: '98vh', minWidth: '1250px'}}>
            <Header style={{ display: 'flex', alignItems: 'center', background: '#fff' }}>
                <div className="demo-logo" />
                <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                //   items={items1}
                style={{ flex: 1, minWidth: 0 }}
                />
            </Header>
            <Layout style={{ padding: '15px 20px 20px' }}>
                <Sider width={200} style={{ background: "#fff" }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                    items={MenuItem}
                />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                <Content
                    style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    background: "#fff",
                    borderRadius: "5px"
                    }}
                >
                    <Outlet />
                </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default Basiclayouts;