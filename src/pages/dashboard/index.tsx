import  { type FC, useEffect, useState } from "react";

import { Icon } from '@iconify/react'
import { useRequest } from "ahooks";
import EchartsReact from "echarts-for-react";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'


import { DashboardService } from "./service";

// 设置时间
dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)
const dateFormat = 'YYYY-MM-DD';

const { RangePicker } = DatePicker;

type seriesType = {
    name: string;
    data: number[] | undefined;
    type: string;
}

type orderType = { name: string; value: string | undefined; bg: string; }

// 数据配置
const configuration = (xAxisData: string[], seriesData: seriesType[], legendData?:string[]) => {
    const option = {
        xAxis: {
            type: 'category',
            data: xAxisData,
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 100,
            interval: 25 
        },
        series: seriesData,
        legend: {
            data: legendData ? legendData : ['wx', 'user' ],
            bottom: 0,
            show: true,
            icon: 'roundRect',
            itemWidth: 2,
            itemHeight: 10,
            itemGap: 20,
            textStyle: {
                color: '#556677'
            },
            formatter: function (name: string) {
                return name === 'wx' ? '新增微信用户' : name === 'user' ? '新增注册用户' : name;
            },
        },
        tooltip: {
            trigger: 'axis'
        },
    };
    return option;
}

const FormatString = (str: string[]): number[] => {
    const date: number[] = [];
    str.forEach((item) => {
        date.push(Number(dayjs(item).format('YYYYMMDD')));
    })
    return date;
}



const Dashboard: FC = () => {
    /* hooks区 */
    const [xAxisArr, setxAxisArr] = useState<string[]>();
    const [seriesArr, setSeriesrArr] = useState<seriesType[]>();
    const [currentDate, setCurrentDate] = useState([20240222, 20240228]);
    const [orderArr, setOrderArr] = useState<orderType[]>();
    const [orderDate, setOrderDate] = useState([20240301, 20240301]);
    // const [orderNewDate, setOrderNewDate] = useState<string[]>();
    /* 计算值区 */
    /* (请求)API区 */
    const { data: totalData } = useRequest(DashboardService.total);
    const { data: analysisData, run: runAnalysis } = useRequest(DashboardService.analysis, {
        manual: true,
    });
    const { data: orderStatusData, run: runOrderStatus } = useRequest(DashboardService.orderStatus, {
        manual: true,
    });
    // const { data: orderNewData, run: runOrderNew } = useRequest(DashboardService.orderNew, {
    //     manual: true,
    // });
    /* uesEffect区 */
    useEffect(() => {
        runAnalysis({beginDate: currentDate[0],endDate: currentDate[1]});
    }, [totalData, currentDate]);
    useEffect(() => {
        runOrderStatus({beginDate: orderDate[0],endDate: orderDate[1]});
        // runOrderNew({beginDate: orderDate[0],endDate: orderDate[1]});
    },[totalData, orderDate]);
    useEffect(() => {
        setxAxisArr(analysisData?.data.data.map(item => item.date));
        const seriesData = [
            { name: 'user', data: analysisData?.data.data.map(item => item.user), type: 'line'},
            { name: 'wx', data: analysisData?.data.data.map(item => item.wx), type: 'line'},
        ];
        setSeriesrArr(seriesData);
        const Status = orderStatusData?.data.data;
        const order = [
            { name: '已完成', value: Status?.cancel, bg:'rgb(0, 204, 102)' },
            { name: '待确认', value: Status?.close, bg:'rgb(255, 51, 0)' },
            { name: '配送中', value: Status?.complete, bg:'rgb(255, 102, 102)' },
            { name: '待接单', value: Status?.complete, bg:'rgb(255, 102, 51)' },
            { name: '待支付', value: Status?.complete, bg:'rgb(0, 153, 255)' },
            { name: '已取消', value: Status?.complete, bg:'rgb(170, 170, 170)' },
            { name: '已关闭', value: Status?.complete, bg:'rgb(51, 51, 51)' },
            { name: '已退款', value: Status?.complete, bg:'rgb(255, 102, 153)' },
        ]
        setOrderArr(order);
        // setOrderNewDate(orderNewData?.data.data.map(item => item.date));
        // const orderNew = [
        //     { name: 'cancel', value: orderNewData?.data.data.map(item => item.cancel), type: 'line' },
        //     { name: 'close', value: orderNewData?.data.data.map(item => item.close), type: 'line' },
        //     { name: 'complete', value: orderNewData?.data.data.map(item => item.complete), type: 'line' },
        //     { name: 'complete', value: orderNewData?.data.data.map(item => item.sending), type: 'line' },
        //     { name: 'complete', value: orderNewData?.data.data.map(item => item.waitConfirm), type: 'line' },
        // ];
    },[analysisData, orderDate]);
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

    const onChange = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _:any,
        dateString: [string, string] | string,
      ) => {
        setCurrentDate(FormatString(dateString as string[]));
    };
    const orderonChange = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _:any,
        dateString: [string, string] | string,
      ) => {
        setOrderDate(FormatString(dateString as string[]));
        console.log(FormatString(dateString as string[]));    
    };
    
    /* return区 */
    return <div>
        <h2 className="text-[24px] font-medium">数据总览</h2>
        <div className="mt-[60px] flex justify-between">
            {
                totalArr.map((item, index) => {
                    return (
                        <div className="w-[24%] h-[100px] rounded-[4px] shadow  shadow-[rgba(0, 0, 0, 0.05)] pl-[20px] pr-[20px] items-center box-border" key={index} >
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
        <div className="flex justify-between mt-[20px]">
            <div className="shadow  shadow-[rgba(0, 0, 0, 0.05)] rounded-[4px] p-[20px] w-[48%]">
                <div className="text-[#999] mb-[10px] text-[20px] font-normal">用户数据曲线</div>
                <div>
                    <RangePicker
                        renderExtraFooter={() => ''}
                        defaultValue={[dayjs('2024-02-22', dateFormat), dayjs('2024-02-28', dateFormat)]}
                        onChange={onChange}
                    />
                </div>
                <EchartsReact option={configuration(xAxisArr as string[] , seriesArr as seriesType[])} style={{height:'400px'}}></EchartsReact>
            </div>
            <div className="shadow  shadow-[rgba(0, 0, 0, 0.05)] rounded-[4px] p-[20px] w-[48%]">
                <div className="text-[#999] text-[20px] font-normal mb-[10px]">订单数据</div>
                <div>
                    <RangePicker
                        renderExtraFooter={() => ''}
                        defaultValue={[dayjs('2024-03-01', dateFormat), dayjs('2024-03-01', dateFormat)]}
                        onChange={orderonChange}
                    />
                </div>
                <div className="flex justify-around flex-wrap mt-[20px]">
                    {
                        orderArr?.map(item => {
                            return (<div className="w-[45%] h-[100px] flex flex-col items-center leading-[30px]" key={item.bg}>
                                <div className="w-[30px] h-[30px] flex justify-center items-center" style={{ backgroundColor:item.bg, borderRadius: '0 8px 0 8px'  }}>
                                    <Icon icon='streamline:bag-dollar-solid' className="text-[15px] text-[#fff]" />
                                </div>
                                <p className="text-[12px] text-[#999] m-[0px]">{item.name}</p>
                                <p className="text-[18px] m-[0px]">{item.value}个</p>
                            </div>)
                        }) 
                    }
                </div>
            </div>
        </div>
        <div className="shadow  shadow-[rgba(0, 0, 0, 0.05)] rounded-[4px] p-[20px] mt-[20px]">
            <div className="text-[#999] mb-[10px] text-[20px] font-normal">订单数据曲线</div>
            <div>
                <RangePicker
                    renderExtraFooter={() => ''}
                    defaultValue={[dayjs('2024-02-22', dateFormat), dayjs('2024-02-28', dateFormat)]}
                    onChange={onChange}
                />
            </div>
            <EchartsReact option={configuration(xAxisArr as string[] , seriesArr as seriesType[])} style={{height:'400px'}}></EchartsReact>
        </div>
    </div>;
}

export default Dashboard;