import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import '../config';
import Notify from '../components/notify';

const FormItem = Form.Item;

export default function Login() {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const history = useHistory();
    return <Form className="login-form">
        <FormItem>
            <Input placeholder="请输入邮箱" maxLength={50} onChange={(event) => {
                setEmail(event.target.value);
            }} />
        </FormItem>
        <FormItem>
            <Input placeholder="请输入密码" maxLength={50} type="password" onChange={(event) => {
                setPwd(event.target.value);
            }} />
        </FormItem>
        <label>{email}  {pwd}</label>
        <FormItem>
            <Button type="primary" onClick={function () {
                login(email, pwd).then((response) => {
                    // 成功则跳转
                    if (response.status === 200) {
                        console.log(response);
                        response.json().then(function (data) {
                            console.log(data);
                            localStorage.setItem('token', data.token);
                        })
                        history.push('/home');
                        return
                    }
                    response.json().then(function (data) {
                        //获取请求的返回字段
                        Notify(data.message)
                        console.log(data.message);
                    })
                })
            }}>登录</Button>
        </FormItem>
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