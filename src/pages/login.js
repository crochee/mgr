import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import '../config';
import { Notify, BadRequest } from '../components/notify';

const FormItem = Form.Item;

export default function Login() {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const history = useHistory();
    return <Form className="form">
        <div className="form-div">
            <FormItem>
                <div className="title">邮箱</div>
                <div>
                    <Input placeholder="请输入邮箱" maxLength={50} type="email" onChange={(event) => {
                        setEmail(event.target.value);
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
            <FormItem >
                <Button type="primary" onClick={function () {
                    history.push('/register');
                }}>去注册</Button>
                <Button type="primary" onClick={function () {
                    login(email, pwd).then((response) => {
                        // 成功则跳转
                        if (response.status === 200) {
                            response.json().then(function (data) {
                                localStorage.setItem('token', data.token);
                                localStorage.setItem('email', email);
                            })
                            history.push('/home');
                            return
                        } else if (response.status === 500) {
                            response.json().then(function (data) {
                                Notify(data.message);
                            })
                            return
                        }
                        BadRequest('');
                    })
                }}>登录</Button>
            </FormItem>
        </div>
    </Form>
}

function login(email, pwd) {
    const param = {
        email: email,
        pass_word: pwd
    };
    return fetch(global.config.consoleUrl + "/user/login", {
        body: JSON.stringify(param),
        method: 'POST',
    })
}