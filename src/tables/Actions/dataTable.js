import React, { Component } from 'react';
import { Table } from 'antd';
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
export class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {},
      loading: false,
      columns: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState({ loading: true });

    fetch(url(), requestOptions(raw))
      .then(response => response.json())
      .then(data => {
        const columns = this.generateColumns(data);
        this.setState({
          loading: false,
          data,
          columns
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  generateColumns = data => {
    const columns = Object.keys(data[0]).map(key => {
      return {
        title: key,
        dataIndex: key,
        key: key,
        render: (text) => {
          if (typeof text === 'object') {
            const nestedColumns = this.generateColumns([text]);
            const nestedData = [text];
            return <Table columns={nestedColumns} dataSource={nestedData} pagination={false} />;
          }
          return text;
        }
      };
    });
    return columns;
  };

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({ pagination: pager });
    this.fetchData({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    });
  };

  render() {
    const { loading, data, columns } = this.state;
    return (
      <Table
        columns={columns}
        rowKey={record => record._id}
        dataSource={data}
        pagination={false}
        loading={loading}
        onChange={this.handleTableChange}
        scroll = {true}
      />
    );
  }
}

