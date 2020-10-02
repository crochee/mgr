import { notification } from 'antd';
import './components.scss';


export function Notify(msg) {
    notification.open({
        message: 'Notification Server Error',
        description: msg,
        duration: 1,
    });
}

export function BadRequest(msg) {
    notification.error({
        message: 'Bad Request',
        description: msg,
        duration: 1,
    });
}