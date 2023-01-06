// Import from project
import SideBarHeaderStyled from './SideBarHeaderStyled';
import Logo from 'components/Logo';

// Import from prop
import PropTypes from 'prop-types';

// Import from MUI
import { useTheme } from '@mui/material/styles';
import { Stack, Chip } from '@mui/material';

// --------- SideBarHeader- index --------- \\
const SideBarHeader = ({ open }) => {
    const theme = useTheme();

    return (
        <SideBarHeaderStyled theme={theme} open={open}>
            <Stack direction="row" spacing={1} alignItems="center">
                <Logo />
                <Chip
                    label={'0.0.01'}
                    size="small"
                    sx={{ height: 16, '& .MuiChip-label': { fontSize: '0.625rem', py: 0.25 } }}
                    component="a"
                    href="https://github.com/alf767443/Thesis/tree/0.00.01"
                    target="_blank"
                    clickable
                />
            </Stack>
        </SideBarHeaderStyled>
    );
};

SideBarHeader.propTypes = {
    open: PropTypes.bool
};

export default SideBarHeader;
