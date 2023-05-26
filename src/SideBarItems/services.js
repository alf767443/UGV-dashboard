// Imported Assets
import { LogoutOutlined, BugOutlined, RadarChartOutlined, CodeOutlined } from '@ant-design/icons';
{/* <CodeOutlined /> */}
// Icons<LogoutOutlined />
const icons = { LogoutOutlined, BugOutlined, RadarChartOutlined, CodeOutlined };

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
            id: 'scripts',
            title: 'Add/edit scripts',
            type: 'item',
            url: '/edit/script',
            icon: icons.CodeOutlined,
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
