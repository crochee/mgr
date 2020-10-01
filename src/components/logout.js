import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import axios from 'axios';


export default function Logout() {
    const history = useHistory();
    const email = '';
    return <Button className="logout" type="primary" onClick={() => {
        logout(email).then((response) => {
            history('/');
            // 成功则跳转
            if (response.status === 500) {
                console.log(response.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }}>登出</Button>
}

function logout(email) {
    return axios.delete("/user/logout", {
        data: {
            email: email,
        }
    })
}