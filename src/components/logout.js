import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import '../config';
import './components.scss';
import { Notify } from './notify';

export default function Logout() {
    const history = useHistory();
    return <Button className="logout" type="primary" onClick={() => {
        logout(localStorage.getItem('email')).then(function (response) {
            if (response.status === 500) {
                response.json().then(function (data) {
                    //获取请求的返回字段
                    Notify(data.message);
                })
                return
            }
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            history.push('/');
        })
    }}>登出</Button>
}

function logout(email) {
    const param = {
        email: email,
    };
    return fetch(global.config.consoleUrl + "/user/logout", {
        body: JSON.stringify(param),
        method: 'DELETE',
    })
}