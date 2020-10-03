import { Table } from 'antd';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../components/logout';
import './home.scss';
import { Notify, BadRequest } from '../components/notify';

export default function Home() {
    const [index, setIndex] = useState(0);
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
        <Logout />
        <h1>开发主页</h1>
        <div className="wrap">
            <div className="nav">
                <div className={index === 0 ? "check" : ""} onClick={function () { setIndex(0); }}>文件</div>
                <div className={index === 1 ? "check" : ""} onClick={function () { setIndex(1); }}>日志</div>
                <div className={index === 2 ? "check" : ""} onClick={function () { setIndex(2); }}>任务</div>
            </div>
            <p>数据详情</p>
            <Table bordered columns={columns} dataSource={data} scroll={{ x: 1500 }} rowKey={record => record.time} />
            <Link to='/' className="wrap-link">首页</Link>
        </div>
    </div>
}

function getLog() {
    return fetch(global.config.consoleUrl + "/log", {
        method: 'GET',
    })
}