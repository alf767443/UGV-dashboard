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
            <MainCard {...styles.maincard}>
                <Box {...styles.box}>
                    <Stack {...styles.stack}>
                        <Typography {...styles.typography}>
                            {this.props.Title}
                        </Typography>
                        <IconButton
                            {...styles.icon}
                            href={this.props.href}
                        >
                            <this.props.Icon {...styles.icon}/>
                        </IconButton>
                    </Stack>
                </Box>
            </MainCard>
        );
    }
}
