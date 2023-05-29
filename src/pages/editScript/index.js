import React from "react";
// import ReactDOM from 'react-dom';
import { MenuItem, Select } from '@mui/material';
import ScriptEditor from "components/ScriptEditor/index";
import { djangoFetch } from "API/url";
import { message } from 'antd';

// import { EditOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Addchart, Delete } from '@mui/icons-material';

import "./styles.css";

const randomString = (length) => {
	const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let result = '';
	for (let i = length; i > 0; --i) {
		result += chars[Math.floor(Math.random() * chars.length)];
	}
	return result;
}

export default class EditPage extends React.Component {
	constructor(props) {
		super(props);

        this.state = {
            selectedScriptID: this.getParam(),
            list: null,
            robotID: window.localStorage.getItem('robotID'),
        }
    }

    addChartClick = () => {
        const messageID = randomString(5) + this.state.robotID
        const sendJSON = {
            "query": {
                "dataSource": "DataSource",
                "database": "CeDRI_UGV_datalake",
                "collection": "Battery",
                "pipeline": [
                {
                    "$project": {
                    "dateTime": {
                        "$dateTrunc": {
                        "date": "$dateTime",
                        "unit": "minute"
                        }
                    },
                    "percentage": 1
                    }
                },
                {
                    "$densify": {
                    "field": "dateTime",
                    "range": {
                        "step": 1,
                        "unit": "minute",
                        "bounds": "full"
                    }
                    }
                },
                {
                    "$group": {
                    "_id": "$dateTime",
                    "percentage": {
                        "$avg": "$percentage"
                    }
                    }
                },
                {
                    "$sort": {
                    "_id": -1
                    }
                },
                {
                    "$limit": 180
                },
                {
                    "$project": {
                    "percentage": {
                        "$multiply": [
                        "$percentage",
                        100
                        ]
                    }
                    }
                },
                {
                    "$sort": {
                    "_id": 1
                    }
                }
                ]
            },
            "option": "option = {\n      title: {\n        text: 'New Script',\n        left: '1%'\n      },\n      tooltip: {\n        trigger: 'axis'\n      },\n      grid: {\n        left: '5%',\n        right: '15%',\n        bottom: '10%'\n      },\n      xAxis: {\n        data: data.map(function (item) {\n          return item['_id'];\n        })\n      },\n      yAxis: {},\n      toolbox: {\n        right: 10,\n        feature: {\n          dataZoom: {\n            yAxisIndex: 'none'\n          },\n          restore: {},\n          saveAsImage: {}\n        }\n      },\n      dataZoom: [\n        {\n          startValue: '2014-06-01'\n        },\n        {\n          type: 'inside'\n        }\n      ],\n      visualMap: {\n        top: 50,\n        right: 10,\n        pieces: [\n          {\n            gt: 0,\n            lte: 20,\n            color: '#DB0700'\n          },\n          {\n            gt: 20,\n            lte: 40,\n            color: '#F58B0A'\n          },\n          {\n            gt: 40,\n            lte: 60,\n            color: '#EDD900'\n          },\n          {\n            gt: 60,\n            lte: 80,\n            color: '#7DD600'\n          },\n          {\n            gt: 80,\n            lte: 100,\n            color: '#1AB80F'\n          }\n        ],\n        outOfRange: {\n          color: '#999'\n        }\n      },\n      series: {\n        name: 'Percentage',\n        type: 'line',\n        data: data.map(function (item) {\n          return item['percentage'];\n        })\n      }\n    }\n",
            "tile": {
                "group": "New Group",
                "title": "New Script"
            },
            "robot": this.state.robotID 
        }
        message.open({
      top: Infinity,
style: {zIndex: Infinity},

			key: messageID,
			type: 'loading',
			content: 'Creating a script',
			duration: 0,
		});
        djangoFetch('/script', '/', 'POST', JSON.stringify(sendJSON))
        .then((response) => {
            if(response.status === 201){
                this.getList();
                this.render()
            }
        })
        .then(() => message.open({
      top: Infinity,
style: {zIndex: Infinity},

			key: messageID,
			type: 'success',
			content: 'Script created',
			duration: 2,
        }))
        .catch((e) => console.error(e))
        .catch(() => message.open({
      top: Infinity,
style: {zIndex: Infinity},

			key: messageID,
			type: 'error',
			content: 'Error when creating',
			duration: 2,
        }))
    }

    removeChartClick = () => {
        const messageID = randomString(5) + this.state.robotID
        message.open({
      top: Infinity,
style: {zIndex: Infinity},

			key: messageID,
			type: 'loading',
			content: 'Deleting the script',
			duration: 0,
		});
        djangoFetch('/script', '/?name='+this.state.selectedScriptID, 'DELETE', '')
        .then((response) => {
            if(response.status === 301){
                this.getList();
                this.render();
                window.location.href = `/CeDRI_dashboard/edit/script?id=null`;
            }
        })
        .then(() => message.open({
      top: Infinity,
style: {zIndex: Infinity},

			key: messageID,
			type: 'success',
			content: 'Script deleted',
			duration: 2,
        }))
        .catch((e) => console.error(e))
        .catch(() => message.open({
      top: Infinity,
style: {zIndex: Infinity},

			key: messageID,
			type: 'error',
			content: 'Error when deleting',
			duration: 2,
        }))
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
                    '_id': '$name', 
                    'label': {
                        '$first': {
                            '$concat': [
                                '$script.group', ' - ', '$script.title'
                            ]
                        }
                    }
                }
                }
            ]   
        }
        djangoFetch('/script', '/', 'OPTIONS', JSON.stringify(sendJSON))
          .then((response) => response.json())
          .then((json) => {
            const _json = json
            this.setState({list: _json})
          })
    }

    handleGraphIDChange = (event) => {
        this.setState({selectedScriptID: event.target.value})
        console.log(event)
        window.location.href = `/CeDRI_dashboard/edit/script?id=${event.target.value}`;
    };

    componentDidMount = () => {
        this.getList()
    }
    
    getParam = () => {
        const searchParams = new URLSearchParams(location.search);
        const graphIDParam = searchParams.get('id');
        console.log(graphIDParam)
        return graphIDParam
    }

    render(){
        const activeColor = '#454545';
        return (
            <div className="main" id="EditorMainPage">
                <div className="Header">
                    <div className="SelectGraph">
                        <Select
                            value={this.state.selectedScriptID}
                            onChange={this.handleGraphIDChange}
                            label="Script"
                            id="select-graph"
                            sx={{width: 200, height:36, backgroundColor: "#f5f5f5"}}
                        >
                            {this.state.list?this.state.list.map((graph) => (
                            <MenuItem key={graph._id} value={graph._id}>
                                {graph.label}
                            </MenuItem>
                            )):<></>}
                        </Select>
                    </div>
                    
                    <div className='Add'>
                        <IconButton sx={{ flexShrink: 0, backgroundColor: 'grey.100', color:'', height:36, width:36, borderRadius:2}}  onClick={this.addChartClick} >
                            <Addchart sx={{color:activeColor, width:'130%' , height: '130%'}} />
                        </IconButton>
                    </div>

                    <div className='Remove'>
                        <IconButton sx={{ flexShrink: 0, backgroundColor: 'grey.100', color:'', height:36, width:36, borderRadius:2}}  onClick={this.removeChartClick} >
                            <Delete sx={{color:activeColor, width:'130%' , height: '130%'}} />
                        </IconButton>
                    </div>
                </div>
                
                {this.state.selectedScriptID?<div className="layout" id={this.state.selectedScriptID+"ScriptEditor"}><ScriptEditor graphID={this.state.selectedScriptID} /></div>:<></>}
            </div>
        );
    }
}