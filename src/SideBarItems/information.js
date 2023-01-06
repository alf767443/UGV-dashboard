// Imported assets
import { BarChartOutlined, FileTextOutlined, CloudServerOutlined } from '@ant-design/icons';

// Icons
const icons = { BarChartOutlined, FileTextOutlined, CloudServerOutlined };

// --------- SideBar - Information --------- \\
const information = {
    id: 'group_information',
    title: 'Information',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/information/dashboard',
            icon: icons.BarChartOutlined,
            breadcrumbs: false
        },
        {
            id: 'dbs',
            title: 'Databases',
            type: 'item',
            url: '/information/dbs',
            icon: icons.CloudServerOutlined,
            breadcrumbs: false
        },
        {
            id: 'logs',
            title: 'Logs',
            type: 'item',
            url: '/information/logs',
            icon: icons.FileTextOutlined,
            breadcrumbs: false
        }
    ]
};

export default information;
