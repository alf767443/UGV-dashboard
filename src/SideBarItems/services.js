// Imported Assets
import { LogoutOutlined, BugOutlined, RadarChartOutlined } from '@ant-design/icons';

// Icons<LogoutOutlined />
const icons = { LogoutOutlined, BugOutlined, RadarChartOutlined };

// --------- SideBar - Information --------- \\
const services = {
    id: 'services',
    title: 'Services',
    type: 'group',
    children: [
        {
            id: 'chart',
            title: 'Add/edit chart',
            type: 'item',
            url: '/edit/chart',
            icon: icons.RadarChartOutlined,
            breadcrumbs: false
        },
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
