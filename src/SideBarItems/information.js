// Imported assets
import { BarChartOutlined, CloudServerOutlined, ContainerOutlined } from '@ant-design/icons';

// Icons
const icons = { BarChartOutlined, CloudServerOutlined, ContainerOutlined };

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
            id: 'log',
            title: 'Scripts logs',
            type: 'item',
            url: '/information/logs',
            icon: icons.ContainerOutlined,
            breadcrumbs: false
        },
    ]
};

export default information;
