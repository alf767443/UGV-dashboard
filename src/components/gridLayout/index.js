/* eslint-disable no-unused-vars */
import React, { Component, useState } from 'react';
import GridLayout from 'react-grid-layout';
import { Button } from 'antd';
// import { Grid } from '@mui/material';
import PlotTile from 'components/Tiles/plotTile';
import { djangoFetch } from 'API/url';
import { EditOutlined, Delete, DragIndicator, Save, OpenWith, AddCircleRounded, RemoveCircleRounded, Addchart, FileUpload} from '@mui/icons-material';
import { Dropdown, message, Menu  } from 'antd';
import MainCard from 'components/MainCard';

import { IconButton } from '@mui/material';

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
    const _graph = [...this.state.graph]
    const _chart = _graph.find(item => item.i === chart.i)
    _chart.chart = e.key
    this.setState({graph: _graph})
	};

  uploadHandle = () => {  
    const messageID = randomString(5) + this.state.robotID
    const sendJSON ={
      "filter": {"name": this.state.robotID},
      "update": {"$set":{
        "layout": this.state.layout,
        "graph": this.state.graph
    }}}
    message.open({
      top: 9999,
      key: messageID,
      type: 'loading',
      content: 'Saving layout',
      duration: 0,
    });
    djangoFetch('/robot', '/', 'PUT', JSON.stringify(sendJSON))
      .then((response) => {response.json()})
      .then(() => message.open({
        top: 9999,
        key: messageID,
        type: 'success',
        content: 'Saved successfully',
        duration: 2,
      }))
      .catch((e) => console.error(e))
      .catch(() => message.open({
        top: 9999,
        key: messageID,
        type: 'error',
        content: 'Error on saving',
        duration: 2,
      }))
  }

  onRemoveChart = (chartId) => {
    const newLayout = this.state.layout.filter((chart) => chart.i !== chartId);
    const newGraph = this.state.graph.filter((chart) => chart.i !== chartId);
    this.setState({layout: newLayout, graph: newGraph});
  };

  onAddSizeClick = (local, type, chartId) => {
    var _local = [...this.state.layout]
    var tile = _local.filter((chart) => chart.i === chartId)[0];
    var layout = _local.filter((chart) => chart.i !== chartId);
    var newTiles = null
    var outTiles = null
    switch(local){
      case 'bottom':
        newTiles = layout.filter((chart) => ((tile.x < (chart.x + chart.w) && tile.x >= chart.x) || (chart.x < (tile.x + tile.w) && chart.x >= tile.x) ) && chart.y > tile.y);
        outTiles = layout.filter((chart) => ((tile.x >= (chart.x + chart.w) && tile.x < chart.x) || (chart.x >= (tile.x + tile.w) && chart.x < tile.x) ) || chart.y <= tile.y);
        switch(type){
          case '+':
            tile.h += 10;
            newTiles.forEach((chart) => {chart.y += 10})
            console.log('b+')
            break;
          case '-':
            tile.h -= 10;
            newTiles.forEach((chart) => {chart.y -= 10})
            console.log('b-')
            break;
          default:
            break;
        }
        break;

      case 'right':
        newTiles = layout.filter((chart) => ((tile.y < (chart.y + chart.h) && tile.y >= chart.y) || (chart.y < (tile.y + tile.h) && chart.y >= tile.y) ) && chart.y > tile.y);
        outTiles = layout.filter((chart) => ((tile.y >= (chart.y + chart.h) && tile.y < chart.y) || (chart.y >= (tile.y + tile.h) && chart.y < tile.y) ) || chart.y <= tile.y);
        switch(type){
          case '+':
            tile.w += 10;
            newTiles.forEach((chart) => {chart.y += 10})
            console.log('r+')
            break;
          case '-':
            tile.w -= 10;
            newTiles.forEach((chart) => {chart.y -= 10})
            console.log('r-')
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
    console.log(_local)
    this.setState({layout: _local})
  }

  onAddChart = () => {
    const newChart = {
      i: randomString(10),
      x: Infinity,
      y: Infinity,
      minW: 1,
      maxW: 16,
      minH:1,
      maxH: 16,
      w: 10,
      h: 20,
    };
    const newGraph = {
      i: newChart.i,
      chart: 'null'
    }
    this.setState({layout: [...this.state.layout, newChart]});
    this.setState({graph: [...this.state.graph, newGraph]});
  };

  onDrag = () => {
    const draggable = this.state.draggable
    this.setState({draggable: !draggable})
  }

  onLayoutChange = (newLayout) => {
    console.log(newLayout)
    const _graph = [...this.state.graph]
    const _layout = [...newLayout]
    _graph.forEach((graph) => {
      const _id = randomString(10)
      const tile = _layout.filter((chart) => chart.i === graph.i)[0];
      tile.i = _id
      graph.i = _id
    })
    this.setState({layout: _layout, graph: _graph})
    console.log(this.state)
  };


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
    const activeColor = '#454545';
    return (
      <div className='main'>
          <div className='Header'>
            <div className='Add'>
              <IconButton sx={{ flexShrink: 0, backgroundColor: 'grey.100', color:'', height:36, width:36, borderRadius:2}} justifyContent="center" alignItems="center" onClick={this.onAddChart} >
                  <Addchart sx={{color:activeColor, width:'130%' , height: '130%'}} justifyContent="center" alignItems="center" />
              </IconButton>
            </div>
            <div className='Move'>
              <IconButton sx={{ flexShrink: 0, backgroundColor:!this.state.draggable?'grey.100':'#37bbdb', color:'', height:36, width:36, borderRadius:2}} justifyContent="center" alignItems="center" onClick={this.onDrag} >
                  <OpenWith sx={{color:!this.state.draggable?activeColor:'#ffffff', width:'130%' , height: '130%'}} justifyContent="center" alignItems="center" />
              </IconButton>
            </div>
            <div className='Upload'>
              <IconButton sx={{ flexShrink: 0, backgroundColor: 'grey.100', color:'', height:36, width:36, borderRadius:2}} justifyContent="center" alignItems="center"  onClick={this.uploadHandle} >
                  <Save sx={{color:activeColor, width:'130%' , height: '130%'}} justifyContent="center" alignItems="center" />
              </IconButton>
            </div>
          </div>
          <GridLayout
              className="layout"
              layout={this.state.layout}
              cols={16}
              rowHeight={10}
              margin={[5, 5]}
              width={window.innerWidth - 20}
              onLayoutChange={this.onLayoutChange}
              isDraggable={this.state.draggable}
              isResizable={true}
            >
              {this.state.layout && this.state.graph?this.state.graph.map((chart) => (
                <div key={chart.i} className="Tile">
                  {this.state.draggable?
                  <div className='Drag'>
                    <OpenWith sx={{ height: '100%', width: '100%' }}/>
                  </div>:<></>}
                  {!this.state.draggable?
                  <>
                    <div className='Delete'>
                      <Button onClick={() => this.onRemoveChart(chart.i)} icon={<Delete style={{color:activeColor}} disabled={this.state.draggable} />} />
                    </div>
                    <div className='Edit'>
                      <Dropdown overlay={menu(chart)} >
                        <Button icon={<EditOutlined style={{color:activeColor}} />} />
                      </Dropdown>
                    </div>
                    <div className='b-add'>
                      <Button onClick={() => this.onAddSizeClick('bottom','+', chart.i)} icon={<AddCircleRounded style={{color:activeColor}} />} shape="circle" type="text" />
                    </div>
                    <div className='b-min'>
                      <Button onClick={() => this.onAddSizeClick('bottom','-', chart.i)} icon={<RemoveCircleRounded style={{color:activeColor}} />} shape="circle" type="text" />
                    </div>
                    <div className='r-add'>
                      <Button onClick={() => this.onAddSizeClick('right','+', chart.i)} icon={<AddCircleRounded style={{color:activeColor}} />} shape="circle" type="text" />
                    </div>
                    <div className='r-min'>
                      <Button onClick={() => this.onAddSizeClick('right','-', chart.i)} icon={<RemoveCircleRounded style={{color:activeColor}} />} shape="circle" type="text" />
                    </div>
                  </>:<></>
                  }
                  {chart.chart && chart.chart!=='null'?<PlotTile graphID={chart.chart} />:<MainCard className='VoidCard'></MainCard>}
                </div>
              )):<></>}
            </GridLayout>
      </div>
    );
  }
}
