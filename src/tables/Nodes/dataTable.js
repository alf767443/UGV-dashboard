// Import from React
import React, { Component } from 'react';

// Import from Antd
import { Table, Tag } from 'antd';


// Import from project
import { url, requestOptions } from 'API/url';

var raw = JSON.stringify({
	"dataSource": "CeDRI",
	"database": "CeDRI_UGV_datalake",
	"collection": "Nodes",
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
		}, {
            '$unwind': {
                'path': '$nodes', 
                'preserveNullAndEmptyArrays': false
            }
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
        title: 'Node',
        dataIndex: ['nodes', 'node'],
        key: 'node',
    },
    {
        title: 'Publishers',
        dataIndex: ['nodes', 'pubs'],
        key: 'pubs',
        render: (tags) => (
            <span>
              {tags.map((tag) => {
                let color = 'geekblue';
                return (
                  <Tag color={color} key={tag.topic}>
                    {tag.topic}
                  </Tag>
                );
              })}
            </span>
          ),
    },
    {
        title: 'Subscribers',
        dataIndex: ['nodes', 'subs'],
        key: 'subs',
        render: (tags) => (
            <span>
              {tags.map((tag) => {
                let color = 'yellow';
                return (
                  <Tag color={color} key={tag.topic}>
                    {tag.topic}
                  </Tag>
                );
              })}
            </span>
          ),
    },
    {
        title: 'Services',
        dataIndex: ['nodes', 'serv'],
        key: 'serv',
        render: (tags) => (
            <span>
              {tags.map((tag) => {
                let color = 'green';
                return (
                  <Tag color={color} key={tag}>
                    {tag}
                  </Tag>
                );
              })}
            </span>
          ),
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
