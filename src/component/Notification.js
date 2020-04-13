import { notification } from 'antd';

export const Notification = (title, mensaje, type) => {
    const configNotification = {
        message: title,
        description: mensaje
    };
    switch (type) {
        case NotificationType.Error:
            notification.error(configNotification);        
            break;
        case NotificationType.Success:
            notification.success(configNotification);        
            break;
        case NotificationType.Info:
            notification.info(configNotification);        
            break;
        case NotificationType.Warning:
            notification.warning(configNotification);        
            break;
        default:
            break;
    };    
};

export const NotificationType = {
    Error: 'error',
    Success: 'success',
    Info: 'info',
    Warning: 'warning'
};

