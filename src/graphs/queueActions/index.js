import React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import Typography from '@mui/material/Typography';


// Import from project
import { url } from 'djangoAPI/url';

const urls = 'actions/queue';

export default class App extends React.Component {
    constructor(props) {
		super(props);

		this.state = {
            data: []
        };
    }

    refreshList() {
        fetch(url.API + urls)
            .then((response) => response.json())
            .then((json) => {
                this.setState({ data: json});
                console.log(json)
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    addItem(action, subaction, time) {
        let content = []
        content.push(
        <TimelineItem>
            <TimelineOppositeContent
                sx={{ m: 'auto 0' }}
                align="right"
                variant="body2"
                color="text.secondary"
            >
                {time}
            </TimelineOppositeContent>
        <TimelineSeparator>
            <TimelineConnector />
                <TimelineDot>
                    <FastfoodIcon />
                </TimelineDot>
            <TimelineConnector />
        </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography variant="h6" component="span">
                    {action}
                </Typography>
                <Typography>
                    {subaction}
                </Typography>
            </TimelineContent>
        </TimelineItem>
        )
        return content
    }

    queue(){
        let content = []
        let action
        console.log(this.state.data)
        for(let item in this.state.data){
            action = this.state.data[item]['Action']
            console.log(action['Status'])
            content.push(this.addItem(action['Code'], action['Source'], action['Status']))
        }
        return content
    }

    render() {
        this.queue()
        return (
                <Timeline position="alternate">{this.queue()}</Timeline>
        );
    }
}
