// Import from prop
import PropTypes from 'prop-types';

// Import from react
//import { Link } from 'react-router-dom';

// Import from MUI
import { ButtonBase } from '@mui/material';

// Import from project
import Logo from './Logo';
//import config from 'config';

// --------- Componets Logo - index --------- \\
const LogoSection = ({ sx }) => (
    <ButtonBase disableRipple component="a" href={'https://cedri.ipb.pt/'} sx={sx}>
        <Logo />
    </ButtonBase>
);

LogoSection.propTypes = {
    sx: PropTypes.object,
    to: PropTypes.string
};

export default LogoSection;
