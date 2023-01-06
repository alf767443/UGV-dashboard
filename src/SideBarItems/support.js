// Imported Assets
import { QuestionOutlined } from '@ant-design/icons';

// Icons
const icons = { QuestionOutlined };

// --------- SideBar - Support --------- \\
const support = {
    id: 'support',
    title: 'Support',
    type: 'group',
    children: [
        {
            id: 'help',
            title: 'Help',
            type: 'item',
            url: 'https://cedri.ipb.pt/',
            icon: icons.QuestionOutlined,
            target: true,
            external: true
        }
    ]
};

export default support;
