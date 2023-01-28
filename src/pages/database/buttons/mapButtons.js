// material-ui
import { Map } from '@mui/icons-material';
// project import
import DataBaseButtons from './button';

export const MapButtons = () => {
    return (
        <DataBaseButtons href={'dbs/maps/'} Title={'Maps'} Icon={Map} />
    );
};
