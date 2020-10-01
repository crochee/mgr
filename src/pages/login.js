import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

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
            <Button type="primary" onClick={() => {
                login(email, pwd).then((response) => {
                    // 成功则跳转
                    if (response.status === 200) {
                        console.log(response.data.token);
                    }
                    console.log(response.data);
                    history('/home')
                }).catch((err) => {
                    console.log(err);
                })
            }}>登录</Button>
        </FormItem>
    </Form>
}

function login(email, pwd) {
    return axios.post(global.consoleUrl + "/login", {
        data: {
            email: email,
            pass_word: pwd
        }
    })
}