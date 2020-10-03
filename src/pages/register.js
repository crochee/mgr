import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import '../config';
import { Notify, BadRequest } from '../components/notify';
import './login.scss';

const FormItem = Form.Item;

export default function Register() {
    const [email, setEmail] = useState('');
    const [nick, setNick] = useState('');
    const [pwd, setPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const history = useHistory();
    return <Form className="form">
        <FormItem>
            <div className="title">邮箱</div>
            <div>
                <Input placeholder="请输入邮箱" maxLength={50} type="email" onChange={(event) => {
                    setEmail(event.target.value);
                }} />
            </div>
        </FormItem>
        <FormItem>
            <div className="title">昵称</div>
            <div>
                <Input placeholder="请输入昵称" maxLength={50} onChange={(event) => {
                    setNick(event.target.value);
                }} />
            </div>
        </FormItem>
        <FormItem>
            <div className="title">密码</div>
            <div>
                <Input placeholder="请输入密码" maxLength={50} type="password" onChange={(event) => {
                    setPwd(event.target.value);
                }} />
            </div>
        </FormItem>
        <FormItem>
            <div className="title">确认密码</div>
            <div>
                <Input placeholder="请确认密码" maxLength={50} type="password" onChange={(event) => {
                    setNewPwd(event.target.value);
                }} />
            </div>
        </FormItem>
        <FormItem >
            <Button className="register-button" type="primary" onClick={function () {
                if (pwd !== newPwd) {
                    BadRequest('password is inconsisten');
                    return
                }
                register(email, nick, pwd).then((response) => {
                    // 成功则跳转
                    if (response.status === 200) {
                        history.push('/login');
                        return
                    } else if (response.status === 500) {
                        response.json().then(function (data) {
                            Notify(data.message);
                        })
                        return
                    }
                    BadRequest('');
                })
            }}>注册</Button>
        </FormItem>
    </Form>
}

function register(email, nick, pwd) {
    const param = {
        email,
        nick,
        pass_word: pwd
    };
    return fetch(global.config.consoleUrl + "/user/register", {
        body: JSON.stringify(param),
        method: 'POST',
    })
}