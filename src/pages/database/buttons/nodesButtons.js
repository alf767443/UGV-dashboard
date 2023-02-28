// material-ui
import { Hub } from '@mui/icons-material';
// project import
import DataBaseButtons from './button';

export const NodesButtons = () => {
    return (
        <DataBaseButtons href={'dbs/nodes/'} Title={'ROS nodes'} Icon={Hub} />
    );
};
