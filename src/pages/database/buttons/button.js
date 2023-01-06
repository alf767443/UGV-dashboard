import * as React from 'react';
import { IconButton, Box, Typography, Stack } from '@mui/material';
//import TireRepairIcon from '@mui/icons-material/TireRepair';
import MainCard from 'components/MainCard';

import styles from './styles';
//import { ThirtyFpsSelect } from '../../../../node_modules/@mui/icons-material/index';

export default class DataBaseButtons extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MainCard sx={styles.maincard.sx} content={styles.maincard.content}>
                <Box sx={styles.box.sx}>
                    <Stack spacing={styles.stack.spacing} direction={styles.stack.direction} alignItems={styles.stack.alignItems}>
                        <Typography variant={styles.typography.variant} color={styles.typography.color}>
                            {this.props.Title}
                        </Typography>
                        <IconButton
                            color={styles.icon.color}
                            style={styles.button.style}
                            iconStyle={styles.icon.style}
                            sx={styles.button.sx}
                            href={this.props.href}
                        >
                            <this.props.Icon sx={styles.icon.style} />
                        </IconButton>
                    </Stack>
                </Box>
            </MainCard>
        );
    }
}
