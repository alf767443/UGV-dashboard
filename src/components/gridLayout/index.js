/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import GridLayout from 'react-grid-layout';
import { Button, IconButton } from 'antd';
import { Grid } from '@mui/material';
import PlotTile from 'components/Tiles/plotTile';
import { djangoFetch } from 'API/url';
import { EditOutlined, Delete, DragIndicator, OpenWith } from '@mui/icons-material';
import { Dropdown, message, Menu  } from 'antd';

// import { DeleteOutlined, DragOutlined  } from '@ant-design/icons';

import "./styles.css";

const randomString = (length) => {
	const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let result = '';
	for (let i = length; i > 0; --i) {
		result += chars[Math.floor(Math.random() * chars.length)];
	}
	return result;
}

export default class DashboardLayout extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      layout: [],
      graph: [],
      edit: this.props.edit,
      draggable: false,
      list: null,
      robotID: window.localStorage.getItem('robotID'),
    }
  }

  handleMenuClick = (chart, e) => {
    const _layout = [...this.state.layout]
    const _chart = _layout.find(item => item.i === chart.i)
    _chart.chart = e.key
    this.setState({layout: _layout})
	};

  uploadHandle = () => {  
    const sendJSON ={
      "filter": {"name": this.state.robotID},
      "update": {"$set":{
        "layout": this.state.layout,
        "graph": this.state.graph
    }}}
    djangoFetch('/robot', '/', 'PUT', JSON.stringify(sendJSON))
      .then((response) => {response.json()})
      .catch((e) => console.error(e))
  }

  onRemoveChart = (chartId) => {
    //console.log(chartId)
    const newLayout = this.state.layout.filter((chart) => chart.i !== chartId);
    const newGraph = this.state.graph.filter((chart) => chart.i !== chartId);
    this.setState({layout: newLayout, graph: newGraph});
  };

  onAddChart = () => {
    ////console.log(this.state)
    const newChart = {
      i: randomString(10),
      x: Infinity,
      y: Infinity,
      minW: 1,
      maxW: 16,
      minH:1,
      maxH: 16,
      isBounded: true,
      static: true,
      isDraggable: false,
      w: 10,
      h: 20,
    };
    const newGraph = {
      i: newChart.i,
      chart: '6462701cb16d8523b709d880'
    }
    this.setState({layout: [...this.state.layout, newChart]});
    this.setState({graph: [...this.state.graph, newGraph]});
  };

  onLayoutChange = (newLayout) => {
    //console.log(newLayout)
    this.setState({layout: newLayout})
  };

  onHoverDrag = (chart, state, e) => {
    const _layout = [...this.state.layout]
    const _chart = _layout.find(item => item.i === chart.i)
    _chart.isDraggable = state
    this.setState({layout: _layout})
  }

  getLayout = () => {
    djangoFetch('/robot', '/?name=', 'GET', '')
      .then((response) => response.json())
      .then((json) => {
        const _json = json[0]
        //console.log(_json)
        this.setState({layout: _json.layout})
        this.setState({graph: _json.graph})
      })
      .catch((e) => console.error(e))
  }

  getList = () => {
    const sendJSON ={
      "pipeline": [
          {
            '$match': {
              'robot': this.state.robotID
            }
          }, {
            '$group': {
              '_id': '$tile.group', 
              'key': {
                '$first': '$tile.group'
              }, 
              'label': {
                '$first': '$tile.group'
              }, 
              'children': {
                '$push': {
                  'key': '$name', 
                  'label': '$tile.title', 
                  'title': '$tile.title'
                }
              }
            }
          }
      ]
    }
    djangoFetch('/chart', '/', 'OPTIONS', JSON.stringify(sendJSON))
      .then((response) => response.json())
      .then((json) => {
        const _json = json
        this.setState({list: _json})
      })
  }

  componentDidMount = () => {
    this.getLayout();
    this.getList();
  }

  render(){
    const menu = (chart) => (
      <Menu onClick={(e) => this.handleMenuClick(chart,e)}>
        {this.state.list?this.state.list.map((option) => (
          <Menu.SubMenu title={option.label} key={option.key}>
            {option.children.map((child) => (
              <Menu.Item key={child.key} >{child.label}</Menu.Item>
            ))}
          </Menu.SubMenu>
        )):<></>}
      </Menu>
    );
    //console.log(this.state.layout)
    return (
      <Grid
        container
        direction="column"
        justifyContent="space-evenly"
        alignItems="stretch"
        columns={16}
        spacing={1}
      >
        <Grid item xs={3}>
          <Button onClick={this.onAddChart}>Adicionar Gráfico</Button>
          <Button onClick={this.uploadHandle}>Fazer o upload</Button>
        </Grid>
        <Grid item xs={12}>
            <GridLayout
              className="layout"
              layout={this.state.layout}
              cols={16}
              rowHeight={10}
              margin={[4, 4]}
              width={window.innerWidth}
              onLayoutChange={this.onLayoutChange}

              // isDraggable={this.state.edit}
              // isResizable={true}
              // isBounded={true}
            >
              {this.state.layout && this.state.graph?this.state.graph.map((chart) => (
                <div key={chart.i} className="Tile">
                  <div className='Drag'
                    onMouseEnter={(e) => {console.info('enter');this.onHoverDrag(chart, true, e)}} 
                    onMouseLeave={(e) => {console.info('false');this.onHoverDrag(chart, false, e)}}
                    >
                   <OpenWith />
                  </div>
                  <div className='Delete'>
                    <Button onClick={() => this.onRemoveChart(chart.i)} icon={<Delete />} />
                  </div>
                  <div className='Edit'>
                    <Dropdown overlay={menu(chart)} >
                      <Button icon={<EditOutlined />} />
                    </Dropdown>
                  </div>
                  {chart.chart?<PlotTile graphID={chart.chart} />:<></>}
                </div>
              )):<></>}
            </GridLayout>
        </Grid>
      </Grid>
    );
  }
}
