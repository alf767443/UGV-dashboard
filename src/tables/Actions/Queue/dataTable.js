// Import from React
import React, { Component } from 'react';

// Import from Antd
import { Table } from 'antd';

// Import from project
import { url } from 'djangoAPI/url';

// URL
const urls = 'actions/table=queue';

// Define columns
const columns = [
    {
        title: 'Queue',
        dataIndex: 'QueueNumber',
        key: 'queuenumber',
        sorter: {
            compare: (a, b) => a.QueueNumber - b.QueueNumber,
        },
        defaultSortOrder: 'ascend'
    },
    {
        title: 'Action',
        dataIndex: ['Action','_id'],
        key: 'action'
    }
];

// --------- table fiducialmark - datatable --------- \\
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
