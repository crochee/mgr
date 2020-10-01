import { Button } from 'antd';
import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

export default function Detail() {
    const params = useParams();
    const history = useHistory();
    return <div className="container">
        <p>This is detail</p>
        <p>当前参数:{params.id}</p>
        <Button onClick={
            () => {
                history.push('/');
            }
        }>跳转首页</Button>
    </div>
}