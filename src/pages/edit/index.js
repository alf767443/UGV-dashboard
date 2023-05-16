import React from "react";
// import ReactDOM from 'react-dom';
import { MenuItem, Select } from '@mui/material';
import GraphEditor from "components/GraphEditor/index";
import { djangoFetch } from "API/url";
import { Button } from 'antd';
import { EditOutlined } from '@mui/icons-material';

import "./styles.css";

export default class EditPage extends React.Component {
	constructor(props) {
		super(props);

        this.state = {
            selectedGraphID: null,
            list: null,
            robotID: window.localStorage.getItem('robotID'),
        }
    }

    addChart = () => {
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
            "option": "option = {\n      title: {\n        text: 'New Chart',\n        left: '1%'\n      },\n      tooltip: {\n        trigger: 'axis'\n      },\n      grid: {\n        left: '5%',\n        right: '15%',\n        bottom: '10%'\n      },\n      xAxis: {\n        data: data.map(function (item) {\n          return item['_id'];\n        })\n      },\n      yAxis: {},\n      toolbox: {\n        right: 10,\n        feature: {\n          dataZoom: {\n            yAxisIndex: 'none'\n          },\n          restore: {},\n          saveAsImage: {}\n        }\n      },\n      dataZoom: [\n        {\n          startValue: '2014-06-01'\n        },\n        {\n          type: 'inside'\n        }\n      ],\n      visualMap: {\n        top: 50,\n        right: 10,\n        pieces: [\n          {\n            gt: 0,\n            lte: 20,\n            color: '#DB0700'\n          },\n          {\n            gt: 20,\n            lte: 40,\n            color: '#F58B0A'\n          },\n          {\n            gt: 40,\n            lte: 60,\n            color: '#EDD900'\n          },\n          {\n            gt: 60,\n            lte: 80,\n            color: '#7DD600'\n          },\n          {\n            gt: 80,\n            lte: 100,\n            color: '#1AB80F'\n          }\n        ],\n        outOfRange: {\n          color: '#999'\n        }\n      },\n      series: {\n        name: 'Percentage',\n        type: 'line',\n        data: data.map(function (item) {\n          return item['percentage'];\n        })\n      }\n    }\n",
            "tile": {
                "group": "New Group",
                "title": "New Chart"
            },
            "robot": this.state.robotID 
        }

        djangoFetch('/chart', '/', 'POST', JSON.stringify(sendJSON))
        .then((response) => {
            if(response.status === 201){
                this.getList();
                this.render()
            }
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
                    '_id': '$name', 
                    'label': {
                        '$first': {
                            '$concat': [
                                '$tile.group', ' - ', '$tile.title'
                            ]
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
            this.setState({selectedGraphID: _json[0]._id})
          })
    }

    handleGraphIDChange = (event) => {
        this.setState({selectedGraphID: event.target.value})
        //console.log(this.state)
    };

    componentDidMount = () => {
        this.getList()
    }

    render(){
        //console.log(this.state)
        return (
            <div className="main" id="EditorMainPage">
                <Select
                    value={this.state.selectedGraphID}
                    onChange={this.handleGraphIDChange}
                    autoWidth
                    label="Chart"
                >
                    {this.state.list?this.state.list.map((graph) => (
                    <MenuItem key={graph._id} value={graph._id}>
                        {graph.label}
                    </MenuItem>
                    )):<></>}
                </Select>
                <Button icon={<EditOutlined />} onClick={this.addChart}/>
                {this.state.selectedGraphID?<div id={this.state.selectedGraphID+"GraphEditor"}><GraphEditor graphID={'6463e660817a4208d5b9d92d'} /></div>:<></>}
            </div>
        );
    }
}