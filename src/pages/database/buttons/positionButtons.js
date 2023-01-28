// material-ui
import { Explore } from '@mui/icons-material';
// project import
import DataBaseButtons from './button';

export const PositionButtons = () => {
    return (
        <DataBaseButtons href={'dbs/position'} Title={'Position'} Icon={Explore} />
    );
};
