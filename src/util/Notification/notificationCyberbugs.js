import { notification } from 'antd';

export const notifiFunction = (type, message, description = '') => {
  notification[type]({
    message,
    description,
  });
};
