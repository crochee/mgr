import { notification } from 'antd';
import './components.scss';

export default function Notify(msg) {
    notification.open({
        message: 'Notification Server Error',
        description: msg,
        duration: 1,
    });
}