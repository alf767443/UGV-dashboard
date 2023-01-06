// Import from React
import React, { Component } from 'react';

// Import from Antd
import { Table } from 'antd';

// Import from project
import { url } from 'djangoAPI/url';

// URL
const urls = 'position/position';

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
    }, {
        title: 'Left',
        align: 'center',
        children:[
            {
                title: 'Odometry',
                align: 'center',
                dataIndex: ['Odometry','Left'],
                key: 'O_left'
            }, {
                title: 'Velocity',
                align: 'center',
                dataIndex: ['Velocity','Left'],
                key: 'V_left'
            }, {
                title: 'Acceleration',
                align: 'center',
                dataIndex: ['Acceleration','Left'],
                key: 'A_left'
            }
        ]
    }, {
        title: 'Right',
        align: 'center',
        children:[
            {
                title: 'Odometry',
                align: 'center',
                dataIndex: ['Odometry','Right'],
                key: 'O_right'
            }, {
                title: 'Velocity',
                align: 'center',
                dataIndex: ['Velocity','Right'],
                key: 'V_right'
            }, {
                title: 'Acceleration',
                align: 'center',
                dataIndex: ['Acceleration','Right'],
                key: 'A_right'
            }
        ]
    }
];

// --------- table odometry - datatable --------- \\
export class DataTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    refreshList() {
        fetch(url.API + urls)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ data: data });
            });
    }

    componentDidMount() {
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
