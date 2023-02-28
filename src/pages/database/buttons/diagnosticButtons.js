// material-ui
import { Troubleshoot } from '@mui/icons-material';
// project import
import DataBaseButtons from './button';

export const DiagnosticButtons = () => {
    return (
        <DataBaseButtons href={'dbs/diagnostic/'} Title={'Diagnostic'} Icon={Troubleshoot} />
    );
};
