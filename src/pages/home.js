import { Table, Menu } from 'antd';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../components/logout';
import './home.scss';
import { Notify, BadRequest } from '../components/notify';
import {
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
} from '@ant-design/icons';

export default function Home() {
    const columns = [
        {
            title: '级别',
            dataIndex: 'level'
        },
        {
            title: '时间',
            dataIndex: 'time'
        },
        {
            title: '消息',
            dataIndex: 'message'
        },
        {
            title: 'App',
            dataIndex: 'appname'
        }
    ];
    const [data, setData] = useState([]);
    useEffect(function () {
        getLog().then(function (response) {
            if (response.status === 200) {
                response.json().then(function (data) {
                    setData(data);
                })
                return
            } else if (response.status === 500) {
                response.json().then(function (data) {
                    Notify(data.message);
                })
                return
            }
            BadRequest('');
        })
    }, []);
    return <div className="home">
        <Menu className="menu-div" defaultSelectedKeys={['1']} mode="inline" theme="light" inlineCollapsed={false} >
            <Menu.Item key="1" icon={<PieChartOutlined />}>日志</Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>文件</Menu.Item>
            <Menu.Item key="3" icon={<ContainerOutlined />}>任务</Menu.Item>
        </Menu>
        <div className="home-data">
            <Logout />
            <h1>开发主页</h1>
            <div className="wrap">
                <p>数据详情</p>
                <Table bordered columns={columns} dataSource={data} scroll={{ x: 1300 }} rowKey={record => record.time} />
                <Link to='/' className="wrap-link">首页</Link>
            </div>
        </div>
    </div>
}

function getLog() {
    return fetch(global.config.consoleUrl + "/log", {
        method: 'GET',
    })
}