// material-ui
import { PermScanWifi } from '@mui/icons-material';

// project import
import DataBaseButtons from './button';

export const ConnectionButtons = () => {
    return (
        <DataBaseButtons href={'dbs/connection'} Title={'Connection'} Icon={PermScanWifi} />
    );
};
