// material-ui
import { Memory } from '@mui/icons-material';

// project import
import DataBaseButtons from './button';

export const ComputerButtons = () => {
    return (
        <DataBaseButtons href={'dbs/computer/'} Title={'Computer uses'} Icon={Memory} />
    );
};
