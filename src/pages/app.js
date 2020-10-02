import React from 'react';
import { Link } from 'react-router-dom';
import './app.scss';
import 'antd/dist/antd.css';

export default function App() {
    return <div className="container">
        <h1>欢迎来到个人开发主页</h1>
        <Link to="/login">登录</Link>
        <br />
        <Link to="/register">注册</Link>
        <br />
    </div>
}