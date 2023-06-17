
import React from 'react';
import { Link  } from 'react-router-dom';
import GridLayout from 'react-grid-layout';
import PlotTile from 'components/Tiles/plotTile';
import { djangoFetch } from 'API/url';
import { EditOutlined, Delete, Settings, Save, OpenWith, AddCircleRounded, RemoveCircleRounded, Addchart, Help, AppRegistration } from '@mui/icons-material';
import { Dropdown, message, Menu, Button  } from 'antd';
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
      edit: false,
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
      key: messageID,
      type: 'loading',
      content: 'Saving layout',
      duration: 0,
    });
    djangoFetch('/robot', '/', 'PUT', JSON.stringify(sendJSON))
      .then((response) => {response.json()})
      .then(() => message.open({
        key: messageID,
        type: 'success',
        content: 'Saved successfully',
        duration: 2,
      }))
      .catch((e) => console.error(e))
      .catch(() => message.open({
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
    var delta = null
    switch(local){
      case 'bottom':
        newTiles = layout.filter((chart) => ((tile.x < (chart.x + chart.w) && tile.x >= chart.x) || (chart.x < (tile.x + tile.w) && chart.x >= tile.x) ) && chart.y > tile.y);
        outTiles = layout.filter((chart) => ((tile.x >= (chart.x + chart.w) && tile.x < chart.x) || (chart.x >= (tile.x + tile.w) && chart.x < tile.x) ) || chart.y <= tile.y);
        delta = 10
        switch(type){
          case '+':
            tile.h += delta;
            newTiles.forEach((chart) => {chart.y += delta})
            break;
          case '-':
            tile.h -= delta;
            newTiles.forEach((chart) => {chart.y -= delta})
            break;
          default:
            break;
        }
        break;

      case 'right':
        newTiles = layout.filter((chart) => ((tile.y < (chart.y + chart.h) && tile.y >= chart.y) || (chart.y < (tile.y + tile.h) && chart.y >= tile.y) ) && chart.y > tile.y);
        outTiles = layout.filter((chart) => ((tile.y >= (chart.y + chart.h) && tile.y < chart.y) || (chart.y >= (tile.y + tile.h) && chart.y < tile.y) ) || chart.y <= tile.y);
        delta = 1
        switch(type){
          case '+':
            tile.w += delta;
            newTiles.forEach((chart) => {chart.y += delta})
            break;
          case '-':
            tile.w -= delta;
            newTiles.forEach((chart) => {chart.y -= delta})
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
    this.onLayoutChange(_local)
  }

  onAddChart = () => {
    const newChart = {
      i: randomString(10),
      x: Infinity,
      y: Infinity,
      minW: 1,
      maxW: 16,
      minH:1,
      maxH: 300,
      w: 4,
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

  onEdit = () => {
    const editable = this.state.edit
    this.setState({edit: !editable})
  }

  onLayoutChange = (newLayout) => {
    const _graph = [...this.state.graph]
    const _layout = [...newLayout]

    for (let i = _layout.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [_layout[i], _layout[j]] = [_layout[j], _layout[i]];
    }
    this.setState({layout: _layout, graph: _graph})
  };

  getLayout = () => {
    djangoFetch('/robot', '/?name=' + this.state.robotID, 'GET', '')
      .then((response) => response.json())
      .then((json) => {
        const _json = json
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
      .catch((e) => console.error(e))
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
      <div className='gridLayout' id='GridLayout'>
          <div className='editHeader' id='GridLayout-EditHeader'>
            <div className='buttonEdit' id='GridLayout-EditHeader-EditButton'>
              <IconButton sx={{ flexShrink: 0, backgroundColor:!this.state.edit?'grey.100':'#37bbdb', color:'', height:36, width:36, borderRadius:2}} onClick={this.onEdit} >
                  <AppRegistration sx={{color:!this.state.edit?activeColor:'#ffffff', width:'130%' , height: '130%'}} />
              </IconButton>
            </div>
            {this.state.edit?
            <>
            <div className='buttonAdd' id='GridLayout-EditHeader-AddButton'>
              <IconButton sx={{ flexShrink: 0, backgroundColor: 'grey.100', color:'', height:36, width:36, borderRadius:2}} onClick={this.onAddChart} >
                  <Addchart sx={{color:activeColor, width:'130%' , height: '130%'}} />
              </IconButton>
            </div>
            <div className='buttonMove' id='GridLayout-EditHeader-MoveButton'>
              <IconButton sx={{ flexShrink: 0, backgroundColor:!this.state.draggable?'grey.100':'#37bbdb', color:'', height:36, width:36, borderRadius:2}} onClick={this.onDrag} >
                  <OpenWith sx={{color:!this.state.draggable?activeColor:'#ffffff', width:'130%' , height: '130%'}} />
              </IconButton>
            </div>
            <div className='buttonUpload' id='GridLayout-EditHeader-UploadButton'>
              <IconButton sx={{ flexShrink: 0, backgroundColor: 'grey.100', color:'', height:36, width:36, borderRadius:2}}  onClick={this.uploadHandle} >
                  <Save sx={{color:activeColor, width:'130%' , height: '130%'}} />
              </IconButton>
            </div></>:
            <></>}
          </div>
          <GridLayout className="grid" id='GridLayout-Grid'
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
                <div key={chart.i} className="tile" id={'GridLayout-Grid-' + chart.i}>
                  {this.state.draggable && this.state.edit?
                  <div className='buttonDrag' id={'GridLayout-Grid-Button-Drag-' + chart.i}>
                    <OpenWith sx={{ height: '100%', width: '100%' }}/>
                  </div>:<></>}
                  {!this.state.draggable && this.state.edit?
                  <>
                    <div className='buttonDelete' id={'GridLayout-Grid-Button-Delete-' + chart.i}>
                      <Button onClick={() => this.onRemoveChart(chart.i)} icon={<Delete style={{color:activeColor}} />} />
                    </div>
                    <div className='buttonChange' id={'GridLayout-Grid-Button-Change-' + chart.i}>
                      <Dropdown overlay={menu(chart)} >
                        <Button icon={<Settings style={{color:activeColor}} />} />
                      </Dropdown>
                    </div>
                    <div className='buttonEdit' id={'GridLayout-Grid-Button-Edit-' + chart.i}>
                      <Link to={"/edit/chart?id="+chart.chart}>
                        <Button icon={<EditOutlined style={{color:activeColor}} />} />
                      </Link>
                    </div>
                    <div className='button-b-add' id={'GridLayout-Grid-Button-b-add-' + chart.i}>
                      <Button onClick={() => this.onAddSizeClick('bottom','+', chart.i)} icon={<AddCircleRounded style={{color:activeColor}} />} shape="circle" type="text" />
                    </div>
                    <div className='button-b-min' id={'GridLayout-Grid-Button-b-min-' + chart.i}>
                      <Button onClick={() => this.onAddSizeClick('bottom','-', chart.i)} icon={<RemoveCircleRounded style={{color:activeColor}} />} shape="circle" type="text" />
                    </div>
                    <div className='button-r-add' id={'GridLayout-Grid-Button-r-add-' + chart.i}>
                      <Button onClick={() => this.onAddSizeClick('right','+', chart.i)} icon={<AddCircleRounded style={{color:activeColor}} />} shape="circle" type="text" />
                    </div>
                    <div className='button-r-min' id={'GridLayout-Grid-Button-r-min-' + chart.i}>
                      <Button onClick={() => this.onAddSizeClick('right','-', chart.i)} icon={<RemoveCircleRounded style={{color:activeColor}} />} shape="circle" type="text" />
                    </div>
                  </>:<></>
                  }
                  {chart.chart && chart.chart!=='null'?
                    <PlotTile graphID={chart.chart} />:
                    <MainCard className='void'>
                      <Help style={{height:'100%', width:'100%', color:'#f5f5f5'}} />
                    </MainCard>}
                </div>
              )):<></>}
          </GridLayout>
      </div>
    );
  }
}
