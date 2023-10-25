import React from "react";

import { djangoFetch } from 'API/url';

import { Terminal  } from '@mui/icons-material';
import { Dropdown, message, Menu } from 'antd';
import { IconButton } from '@mui/material';

import "./styles.css";

export default class SimpleGraph extends React.Component {
	constructor(props) {
		super(props);
        
        this.state = {
            edit: false,
            list: null,
            robotID: window.localStorage.getItem('robotID'),
        }
    }

    
  getList = () => {
    const sendJSON = {
        "pipeline": [
            {
                '$sort': {
                    'action.group': 1, 
                    'action.title': 1
                }
            }, {
                "$match": {
                    "robot": this.state.robotID
                }
            }, {
                "$group": {
                    "_id": "$action.group", 
                    "key": {
                        "$first": "$action.group"
                    }, 
                    "label": {
                        "$first": "$action.group"
                    }, 
                    "children": {
                        "$push": {
                            "key": "$name", 
                            "label": "$action.title", 
                            "title": "$action.title"
                        }
                    }
                }
            }
        ]
    }
    djangoFetch('/action', '/?query=1', 'OPTIONS', JSON.stringify(sendJSON))
      .then((response) => response.json())
      .then((json) => {
        const _json = json
        this.setState({list: _json})
      })
      .catch((err) => console.error(err))
  }

  componentDidMount = () => {
    this.getList();
  }


	handleMenuClick = (e) => {
		message.open({
			key: e.key,
			type: 'loading',
			content: 'Sending command',
			duration: 0,
            zIndex: 9999
		});
        djangoFetch('/robot', '/?name='+this.state.robotID, 'GET', '')
            .then((response) => response.json())
            .then((json) => {
                const _json = json
                const sendJSON = {
                    "database": _json.database,
                    "action": e.key
                }
                console.log(sendJSON)
                djangoFetch('/action', '/?query=0', 'OPTIONS', JSON.stringify(sendJSON))
                    .then((response) => response.json())
                    .then((json) => {
                        const _json = json
                        message.open({
                            key: e.key,
                            type: 'success',
                            content: 'Success in sending command',
                            duration: 2.5,
                        })
                    })
                    .catch((error) => {
                        console.error(error);
                        message.open({
                            key: e.key,
                            type: 'error',
                            content: 'Error in seding command',
                            duration: 2.5,
                        })
                    })
                    .catch((err) => console.error(err));
            })
            .catch((error) => {
                message.open({
                    key: e.key,
                    type: 'error',
                    content: 'Error in seding command',      
                    duration: 2.5,
                })
            })
            .catch((err) => console.error(err));
        
        
	};


	render() {
        const menu = () => (
            <Menu onClick={(e) => this.handleMenuClick(e)}>
                {this.state.list?this.state.list.map((option) => (
                    <Menu.SubMenu title={option.label} key={option.key}>
                        {option.children.map((child) => (
                        <Menu.Item key={child.key} >{child.label}</Menu.Item>
                        ))}
                    </Menu.SubMenu>
                )):<></>}
            </Menu>
        );
		return (
            <div className='sendActionButton' id='Header-Button-Action'>
                <Dropdown overlay={menu()}  >
                    <IconButton sx={{ flexShrink: 0, backgroundColor: 'grey.100', color:'', height:36, width:36, borderRadius:2}}  onClick={this.uploadHandle} >
                        <Terminal sx={{color:'#454545', width:'115%' , height: '115%'}} />
                    </IconButton>
                </Dropdown>
            </div>
        )              
	}
}
