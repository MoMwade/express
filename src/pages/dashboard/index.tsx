import  { type FC, useEffect } from "react";
import { useRequest } from "ahooks";
import { Icon } from '@iconify/react'
import { DashboardService } from "./service";

const Dashboard: FC = () => {
    /* hooks区 */
    /* 计算值区 */
    /* (请求)API区 */
    const { data:totalData } = useRequest(DashboardService.total);
    /* uesEffect区 */
    useEffect(() => {
        console.log("totalData",totalData?.data.data);
    }, [])
    /* handel区 */
    const totalArr = [
        {
            name: "总用户数",
            Total: `<span class="text-[20px]">${totalData?.data.data.userTotal}</span> 人`,
            yesterday: `${totalData?.data.data.yesterdayUserTotal} 人`,
            icon: "clarity:user-solid",
            bg: {backgroundImage: 'linear-gradient(to bottom right, #f3af19, #ea6439)'}
        },
        {
            name: "总盈利",
            Total: `<span class="text-[20px]">${totalData?.data.data.tradeTotal}</span> 元`,
            yesterday: `${totalData?.data.data.yesterdayIncomeTotal} 元`,
            icon: "streamline:bag-dollar-solid",
            bg: {backgroundImage: 'linear-gradient(to bottom right, #19d3f3, #1993f3)'}
        },
        {
            name: "总交易额",
            Total: `<span class="text-[20px]">${totalData?.data.data.incomeTotal}</span> 元`,
            yesterday: `${totalData?.data.data.yesterdayIncomeTotal} 元`,
            icon: "bxs:notepad",
            bg: {backgroundImage: 'linear-gradient(to bottom right, #46aaf4, #385cf4)'}
        },
        {
            name: "订单完成量",
            Total: `<span class="text-[20px]">${totalData?.data.data.orderCompleteTotal}</span> 个`,
            yesterday: `${totalData?.data.data.yesterdayOrderCompleteTotal} 个`,
            icon: "clarity:shopping-bag-solid",
            bg: {backgroundImage: 'linear-gradient(to bottom right, #4ed855, #3ec296)'}
        }
    ]
    /* return区 */
    return <div>
        <h2 className="text-[24px] font-medium">数据总览</h2>
        <div className="mt-[60px] flex justify-between">
            {
                totalArr.map((item) => {
                    return (
                        <div className="w-[24%] h-[100px] rounded-[4px] shadow  shadow-[rgba(0, 0, 0, 0.05)] pl-[20px] pr-[20px] items-center box-border">
                            <div className="flex justify-flex-start relative h-[100px] text-center">
                                <div className="w-[60px] h-[60px] absolute flex justify-center items-center top-[-20px] left-0 rounded-[4px]" style={item.bg}>
                                <Icon icon={item.icon} className="text-[30px] text-[#fff]" />
                                </div>
                                <div className="mt-[50px] leading-[20px] text-[12px] text-[#999]">
                                    <div>昨日新增</div>
                                    <div>{item.yesterday}</div>
                                </div>
                                <div className="ml-[50px] leading-[20px]">
                                    <p>{item.name}</p>
                                    <p dangerouslySetInnerHTML={{__html: item.Total}}>{}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>;
}

export default Dashboard;