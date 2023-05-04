import PropTypes from 'prop-types';
import { forwardRef } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card } from '@mui/material';

// project import
// import Highlighter from './third-party/Highlighter';

// header style
// const headerSX = {
//     p: 2.5,
//     '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
// };

// ==============================|| CUSTOM - MAIN CARD ||============================== //

const MainCard = forwardRef(
    (
        {
            border = true,
            boxShadow,
            children,
            elevation,
            shadow,
            sx = {},
            ...others
        },
        ref
    ) => {
        const theme = useTheme();
        boxShadow = theme.palette.mode === 'dark' ? boxShadow || true : boxShadow;

        return (
            <Card
                elevation={elevation || 0}
                ref={ref}
                {...others}
                sx={{
                    ...sx,
                    border: border ? '1px solid' : 'none',
                    borderRadius: 2,
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.grey.A800,
                    boxShadow: boxShadow && (!border || theme.palette.mode === 'dark') ? shadow || theme.customShadows.z1 : 'inherit',
                    ':hover': {
                        boxShadow: boxShadow ? shadow || theme.customShadows.z1 : 'inherit'
                    },
                    '& pre': {
                        m: 0,
                        p: '16px !important',
                        fontFamily: theme.typography.fontFamily,
                        fontSize: '0.75rem'
                    }
                }}
            >
                {children}
            </Card>
        );
    }
);

MainCard.propTypes = {
    border: PropTypes.bool,
    boxShadow: PropTypes.bool,
    contentSX: PropTypes.object,
    darkTitle: PropTypes.bool,
    divider: PropTypes.bool,
    elevation: PropTypes.number,
    secondary: PropTypes.node,
    shadow: PropTypes.string,
    sx: PropTypes.object,
    title: PropTypes.string,
    codeHighlight: PropTypes.bool,
    content: PropTypes.bool,
    children: PropTypes.node
};


MainCard.displayName = 'MainCard_Component'

export default MainCard;
