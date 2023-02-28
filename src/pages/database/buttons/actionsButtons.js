// material-ui
import { BatteryChargingFull } from '@mui/icons-material';
// project import
import DataBaseButtons from './button';

export const BatteryButtons = () => {
    return (
        <DataBaseButtons href={'dbs/battery/'} Title={'Battery'} Icon={BatteryChargingFull} />
    );
};
