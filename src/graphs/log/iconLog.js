// import React from "react";
import * as React from 'react';

import { Popover } from 'antd';

import { url, requestOptions } from 'API/url';

import styles from "graphs/styles";
import { Stack, Typography } from '@mui/material';
import Badge from '@mui/material/Badge';

import DisabledByDefaultSharpIcon from '@mui/icons-material/DisabledByDefaultSharp';
import WarningSharpIcon from '@mui/icons-material/WarningSharp';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import HelpSharpIcon from '@mui/icons-material/HelpSharp';
import Tooltip from '@mui/material/Tooltip';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';


export default class IconLogger extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
            data: [{
                level: -1,
            }],
			ticks: -1,
			meta: [],
			msg: '',
        };
    }

	canUpdate(){
		if (JSON.parse(window.localStorage.getItem('fromLocal')) || this.state.ticks <= 0) {
			this.setState({ ticks: 10})
			this.refreshList()
		} else if (!JSON.parse(window.localStorage.getItem('fromLocal'))){
			// From MongoDB cloud
			this.setState({ ticks: this.state.ticks - 1})
		}
	}

    refreshList() {
		fetch(url(), requestOptions(this.props.pipeline))
		.then((response) => response.json())
		.then((json) => {
			this.setState({ data: json });
			this.setState({ msg: this.state.data[0].message})
		})
		.catch((error) => {
			console.log(error);
		});
		this.generate()
    }

    componentDidMount = () => {
		this.timer();
    }

	componentWillUnmount = () =>{
		clearInterval(this.timer)
	}

	timer = () => {
		setInterval(() => {
			this.canUpdate();
		}, 1000)
	}

    icon = (item, style) => {
        switch(item.level){
            case 0:
                return <CheckCircleSharpIcon color={"success"} {...style}/>;
            case 1:
                return <WarningSharpIcon color={"warning"} {...style}/> ;
            case 2:
                return <DisabledByDefaultSharpIcon color={"error"} {...style}/>;
            default:
                return <HelpSharpIcon color={"info"} {...style}/>;
        }
    }

	generate() {
		let temp = [];
		this.state.data.forEach((item) => {
            // let Icon = this.icon(item);
			temp.push(
				<ListItem>
					<ListItemAvatar>
					<Avatar {...styles.statusIcon.avatar}>
						{this.icon(item, styles.statusIcon.popup.icon)}
					</Avatar>
					</ListItemAvatar>
					<ListItemText
					primary={<Typography {...styles.statusIcon.popup.typography.primary}>{item.message}</Typography>}
					secondary={<Typography {...styles.statusIcon.popup.typography.secondary}>{item.dateTime}</Typography>}
					/>
					
				</ListItem>
			)
		})
		this.setState({meta: temp});
	}

	render() {
		return (
			<Stack {...styles.stack}>
				<Popover 
					content={
						<List dense={true}>
							{this.state.meta}
						</List>
					} 
					{...styles.statusIcon.popup.popover}>
					<Tooltip title={this.state.msg}>
						<Badge
							{...styles.statusIcon.badge}
							badgeContent={
								<Avatar {...styles.statusIcon.avatar}>
									{this.icon(this.state.data[0], styles.statusIcon.icon.badge)}
								</Avatar>
							}
							>
							<this.props.icon {...styles.statusIcon.icon.main} />
						</Badge>
					</Tooltip>
				</Popover>
				
			</Stack>
		);
	}
}

