// Import from React
import React, { Component } from 'react';

// Import from Antd
import { Table } from 'antd';

// Import from project
import { url } from 'djangoAPI/url';

// Define columns
const columns = [
    {
        title: 'Id',
        dataIndex: 'RouteId',
        key: 'id',
        sorter: {
            compare: (a, b) => a.RouteId - b.RouteId,
            multiple: 1
        },
        defaultSortOrder: 'descend'
    },
    {
        title: 'Distance estimated',
        dataIndex: 'RouteDistanceEstimated',
        key: 'distanceestimated'
    },
    {
        title: 'Consumption estimated',
        dataIndex: 'RouteConsumptionEstimated',
        key: 'consumptionestimated'
    },
    {
        title: 'Distance real',
        dataIndex: 'RouteDistanceReal',
        key: 'distancereal'
    },
    {
        title: 'Consumption real',
        dataIndex: 'RouteConsumptionReal',
        key: 'consumptionreal'
    },
    {
        title: 'Start point',
        dataIndex: 'RouteStartPoint',
        key: 'startpoint'
    },
    {
        title: 'End point',
        dataIndex: 'RouteEndPoint',
        key: 'endpoint'
    }
];

const urls = 'route/route';

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
