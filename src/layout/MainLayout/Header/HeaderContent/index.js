// material-ui
import { Box, useMediaQuery } from '@mui/material';

// project import
import Notification from './Notification';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
    const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

    return (
        <>
            {!matchesXs && <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }} />}
            {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}

            <Notification />
        </>
    );
};

//{!matchesXs && <Profile />}
//{matchesXs && <Profile />}

export default HeaderContent;
