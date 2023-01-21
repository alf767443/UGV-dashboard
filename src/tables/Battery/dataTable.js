// Import from React
import React, { Component } from 'react';

// Import from Antd
import { Table } from 'antd';


// Import from project
import { url, requestOptions } from 'API/url';

var raw = JSON.stringify({
	"dataSource": "CeDRI",
	"database": "CeDRI_UGV_buffer",
	"collection": "Battery_Data",
	"pipeline": [
		{
			'$project': {
				'_id': 0,
			}
		}, {
			'$sort': {
				'dateTime': -1
				}
		}, {
			'$limit': 1000
		}
	]
   });

// Define columns
const columns = [
    {
        title: 'Time',
        dataIndex: 'dateTime',
        key: 'dateTime',
        sorter: {
            compare: (a, b) => a.dateTime - b.dateTime,
            multiple: 1
        },
        defaultSortOrder: 'descend'
    },
    {
        title: 'Percentage',
        dataIndex: ['percentage'],
        key: 'percentage'
    },
    {
        title: 'Voltage',
        dataIndex: ['voltage'],
        key: 'voltage'
    },
    {
        title: 'Current',
        dataIndex: ['voltage'],
        key: 'current'
    },
    {
        title: 'Power',
        dataIndex: ['power'],
        key: 'power'
    }
];

// --------- table fiducialmark - datatable --------- \\
export class DataTable extends Component {
    constructor(props) {
		super(props);

		this.state = {
            data: [],
			ticks: -1
        };
    }

    refreshList() {
		fetch(url(), requestOptions(raw))
		.then((response) => response.json())
		.then((json) => {
			this.setState({ data: json });
		})
		.catch((error) => {
			console.log(error);
		});
    }

    componentDidMount = () => {
		this.refreshList();
    }

    render() {
        console.log(this.state.data);

        return (
            <Table
                columns={columns}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
                onChange={this.handleTableChange}
                sx={this.props.sx}
            />
        );
    }
}
