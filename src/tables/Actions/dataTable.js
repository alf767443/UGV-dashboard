// Import from React
import React, { Component } from 'react';

// Import from Antd
import { Table } from 'antd';


// Import from project
import { url, requestOptions } from 'API/url';

var raw = JSON.stringify({
	"dataSource": "CeDRI",
	"database": "CeDRI_UGV_datalake",
	"collection": "Actions",
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
        title: 'Status',
        dataIndex: ['status'],
        key: 'status'
    },
    {
        title: 'Source',
        dataIndex: ['source'],
        key: 'source'
    },
    {
        title: 'Topic',
        dataIndex: ['topic'],
        key: 'topic'
    },
    {
        title: 'Message type',
        dataIndex: ['msg'],
        key: 'msg'
    },
    {
        title: 'Command',
        dataIndex: ['command'],
        key: 'comamnd'
    },
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