// Imported Assets
import { LogoutOutlined, BugOutlined } from '@ant-design/icons';

// Icons<LogoutOutlined />
const icons = { LogoutOutlined, BugOutlined };

// --------- SideBar - Information --------- \\
const services = {
    id: 'services',
    title: 'Services',
    type: 'group',
    children: [
        {
            id: 'logout',
            title: 'Logout',
            type: 'item',
            url: '/robot/login',
            icon: icons.LogoutOutlined,
            breadcrumbs: false
        },
    ]
};

export default services;
