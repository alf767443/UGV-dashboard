// material-ui
import { Box, useMediaQuery } from '@mui/material';

// project import
import Notification from './Notification';
import DBSwitch from 'components/Switch/DBSwitch';
import BatteryIcon from 'graphs/battery/batteryIcon';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
    const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

    return (
        <>
            {!matchesXs && <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }} />}
            {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}
            <BatteryIcon height={30} width={30} length={20}/>
            <DBSwitch />
            <Notification />
        </>
    );
};

//{!matchesXs && <Profile />}
//{matchesXs && <Profile />}

export default HeaderContent;
