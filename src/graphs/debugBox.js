import { MoreVert } from '@mui/icons-material';
import { Dropdown } from 'antd';
import Battery from './battery/index'
// import Button from '@mui/material/Button';



const items = [
  {
    key: 'battery',
    label: 'Battery',
    children: Battery.SimplePlot
  },
  {
    key: '2',
    label: 'sub menu',
    children: [
      {
        key: '2-1',
        label: '3rd menu item',
      },
      {
        key: '2-2',
        label: '4th menu item',
      },
    ],
  },
  {
    key: '3',
    label: 'disabled sub menu',
    disabled: true,
    children: [
      {
        key: '3-1',
        label: '5d menu item',
      },
      {
        key: '3-2',
        label: '6th menu item',
      },
    ],
  },
];

const handleMenuClick = (e) => {
  console.log(e)
};

const App = () => (
  <Dropdown
    menu={{
      items,
      onClick: handleMenuClick,
    }}
    trigger={['click']}
  >
    <MoreVert sx={{color:'#b3b3b3'}} />
  </Dropdown>
);
export default App;