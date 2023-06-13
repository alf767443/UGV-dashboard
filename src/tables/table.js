import React, { Component } from 'react';
import { Table } from 'antd';
import { url, requestOptions } from 'API/url';

export default class DataTable extends Component {
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

    fetch(url(), requestOptions(this.props.raw))
      .then(response => response.json())
      .then(data => {
        const columns = this.generateColumns(data);
        this.setState({
          loading: false,
          data: data,
          columns
        });
        // //console.log(data)
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  generateColumns = data => {
    if (data[0] === null){
      return null
    }

    const columns = Object.keys(data[0]).map(key => {      
      return {
        title: key,
        dataIndex: key,
        key: key,
        sorter: true,
        render: (text) => {
          if (typeof text === 'object') {
            const nestedColumns = this.generateColumns([text]);
            const nestedData = [text];
            return <Table columns={nestedColumns} dataSource={nestedData} pagination={false} size = {'small'}/>;
          }
          return text;
        }
      };
    });
    return columns.sort((a, b) => this.sortColumn(a.title,b.title));
  };

  sortColumn = (a, b) => {
    if (a == 'dateTime'){
      return -1
    }else if (b == 'dateTime'){
      return 1
    }else if (a.toUpperCase() < b.toUpperCase() ){
      return -1
    }else if (a.toUpperCase() > b.toUpperCase() ){
      return 1
    }else{
      return 0
    }
  }

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
        pagination={true}
        loading={loading}
        onChange={this.handleTableChange}
        scroll = {{scrollToFirstRowOnChange: true, x: true}}
        size = {'small'}
        tableLayout = {'auto'}
        width = {'auto'}
      />
    );
  }
}

