// Import from React
import React, { Component } from 'react';

// Import from MUI
import { Box, Typography, Stack } from '@mui/material';
import MainCard from 'components/MainCard';

// Import from project
import { DataTable } from './dataTable';
import tableSx from 'tables/tableSx';

// --------- table Queue - index --------- \\
export class QueueCard extends Component {
    render() {
        return (
            <MainCard sx={tableSx} content={false}>
                <Box sx={{ p: 3, pb: 0 }}>
                    <Stack spacing={2}>
                        <Typography variant="h3" color="textSecondary">
                            Actions queue
                        </Typography>
                    </Stack>
                    <DataTable />
                </Box>
            </MainCard>
        );
    }
}
