// Import from React
import React, { Component } from 'react';

// Import from MUI
import { Box, Typography, Stack } from '@mui/material';
import MainCard from 'components/MainCard';

// Import from project
import DataTable from '../table';
import tableSx from 'tables/tableSx';

var raw = JSON.stringify({
	"dataSource": "CeDRI",
	"database": "CeDRI_UGV_datalake",
	"collection": "Processes",
	"pipeline": [
		{
			'$project': {
				'_id': 0,
                'header': 0,
                'process': 0, 
                'computer.net_conn': 0,
			}
		}, {
			'$sort': {
				'dateTime': -1
				}
		}, {
			'$limit': 10
        }
	]
   });

// --------- table physical data - index --------- \\
export class TableCard extends Component {
    render() {
        return (
            <MainCard sx={tableSx} content={false}>
                <Box sx={{ p: 3, pb: 0 }}>
                    <Stack spacing={2}>
                        <Typography variant="h3" color="textSecondary">
                            Computer uses data table
                        </Typography>
                    </Stack>
                    <DataTable raw={raw} />
                </Box>
            </MainCard>
        );
    }
}
