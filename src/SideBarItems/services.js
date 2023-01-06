// Imported Assets
import { LoginOutlined, BugOutlined } from '@ant-design/icons';

// Icons
const icons = { LoginOutlined, BugOutlined };

// --------- SideBar - Information --------- \\
const services = {
    id: 'services',
    title: 'Services',
    type: 'group',
    children: [
        {
            id: 'login',
            title: 'Login',
            type: 'item',
            url: '/login',
            icon: icons.LoginOutlined,
            target: true
        },
        {
            id: 'debug',
            title: 'debug',
            type: 'item',
            url: '/debug',
            icon: icons.BugOutlined,
            target: true
        }
    ]
};

export default services;
