// material-ui
import { ReceiptLong } from '@mui/icons-material';

// project import
import DataBaseButtons from './button';

export const ActionsButtons = () => {
    return (
        <DataBaseButtons href={'dbs/actions/'} Title={'Actions'} Icon={ReceiptLong} />
    );
};
