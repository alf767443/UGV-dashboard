// Import from React
import React, { Component } from 'react';

// Import from Antd
import { Table } from 'antd';


// Import from project
import { url, requestOptions } from 'API/url';

var raw = JSON.stringify({
	"dataSource": "CeDRI",
	"database": "CeDRI_UGV_buffer",
	"collection": "Motor_Data",
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
    },{
        title: 'Left motor',
        align: 'center',
        children:[
            {
                title: 'PWM',
                align: 'center',
                dataIndex: ['left','PWM'],
                key: 'PWM_left'
            }, {
                title: 'Rot. rate',
                align: 'center',
                dataIndex: ['left','rrate'],
                key: 'rrate_left'
            }, {
                title: 'Current',
                align: 'center',
                dataIndex: ['left','current'],
                key: 'current_left'
            }
        ]
    }, {
        title: 'Right motor',
        align: 'center',
        children:[
            {
                title: 'PWM',
                align: 'center',
                dataIndex: ['right','PWM'],
                key: 'PWM_right'
            }, {
                title: 'Rot. rate',
                align: 'center',
                dataIndex: ['right','rrate'],
                key: 'rrate_right'
            }, {
                title: 'Current',
                align: 'center',
                dataIndex: ['right','current'],
                key: 'current_right'
            }
        ]
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
