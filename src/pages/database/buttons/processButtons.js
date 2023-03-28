// material-ui
import { DeveloperBoard } from '@mui/icons-material';

// project import
import DataBaseButtons from './button';

export const ProcessesButtons = () => {
    return (
        <DataBaseButtons href={'dbs/processes/'} Title={'Processes'} Icon={DeveloperBoard} />
    );
};
