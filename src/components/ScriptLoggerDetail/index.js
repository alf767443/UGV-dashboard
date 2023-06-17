
import React from 'react';
import { Link  } from 'react-router-dom';
import { djangoFetch } from 'API/url';
import { AvTimer, Warning, Help, Terminal, StopCircle, Edit, PlayCircle, PauseCircle } from '@mui/icons-material';
import { message  } from 'antd';
import MainCard from 'components/MainCard';

import { IconButton } from '@mui/material';
import { Typography, Stack, Grid, Skeleton } from '@mui/material';

import "./styles.css";


const randomString = (length) => {
	const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let result = '';
	for (let i = length; i > 0; --i) {
		result += chars[Math.floor(Math.random() * chars.length)];
	}
	return result;
}

export default class ScriptList extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      _id: props.scriptID,
      script: null,
      log: null,
      edit: this.props.edit,
      robotID: window.localStorage.getItem('robotID'),
    }
  }

  pausePlayClick = () => {
    const messageID = randomString(5) + this.state.robotID
    const sendJSON ={
      "filter": {"name": this.state._id},
      "update": {"$set":{
        "status": (this.state.script.status === 'run' || this.state.script.status === 'wait')?'stop':'wait'
    }}}
    const addLog = {
        "script": this.state._id,
        "robot": this.state.robotID,
        "msg": sendJSON.update.$set.status === 'stop'?"Script was paused":"Script was started",
        "type": 'debug',
    }
    message.open({
        top: Infinity,
        style: {zIndex: Infinity},
      key: messageID,
      type: 'loading',
      content: 'Changing status',
      duration: 0,
    });
    djangoFetch('/script', '/', 'PUT', JSON.stringify(sendJSON))
      .then((response) => {response.json()})
      .then(() => {
        djangoFetch('/log','/', 'POST', JSON.stringify(addLog))
        .then(() => message.open({
            top: Infinity,
            style: {zIndex: Infinity},
            key: messageID,
            type: 'success',
            content: 'Changed successfully',
            duration: 2,
        }))
        .catch((e) => console.error(e))
        .catch(() => message.open({
            top: Infinity,
            style: {zIndex: Infinity},
            key: messageID,
            type: 'error',
            content: 'Error on Changing',
            duration: 2,
        }))
      })
      .catch((e) => console.error(e))
      .catch(() => message.open({
        top: Infinity,
        style: {zIndex: Infinity},
        key: messageID,
        type: 'error',
        content: 'Error on Changing',
        duration: 2,
      }))
      .finally(() => this.getScript())
      .finally(() => this.getLog())
  }

  getScript = () => {
    djangoFetch('/script', '/?name=' + this.state._id, 'GET', '')
    .then((response) => response.json())
    .then((json) => {
        const _json = json
        this.setState({script: _json})
        console.log(_json)
    })
  }

  getLog = () => {
    djangoFetch('/log', '/?name=' + this.state._id, 'GET', '')
    .then((response) => response.json())
    .then((json) => {
        const _json = [...json].sort((a, b) => {
            if(a.datetime > b.datetime) return -1;
            if(a.datetime < b.datetime) return 1;
            return 0;
        })
        this.setState({log: _json})
        console.log(_json)
    })
  }

  componentDidMount = () => {
    this.getScript()
    this.getLog()
  }

  statusIcon = (status) => {
    const _props =  {sx:{color:'#ffff', width:'120%' , height: '120%'}, justifyContent:"center", alignItems:"center"}
    switch(status){
        case 'wait':
            return <AvTimer {..._props}/>
        case 'run':
            return <Terminal {..._props}/>
        case 'stop':
            return <StopCircle {..._props}/>
        case 'error':
            return <Warning {..._props}/>
        default:
            return <Help {..._props}/>
    }
  }

  iconBackGround = (status) => {
    switch(status){
        case 'wait':
            return "#048104"
        case 'run':
            return "#048104"
        case 'stop':
            return "#ffb833"
        case 'error':
            return "#c42b1c"
        default:
            return "#0078d4"
    }
  }

  fontLogColor = (status) => {
    switch(status){
        case 'info':
            return "#0078d4"
        case 'error':
            return "#c42b1c"
        case 'debug':
            return "#048104"
        case 'warn':
            return "#ffb833"
        default:
            return "#textSecondary"
    }
  }

  ISOdate2string = (date) => {
    const _date = new Date(date);

    const day = _date.getDate().toString().padStart(2, '0'); // Dia com dois dígitos
    const month = new Intl.DateTimeFormat('en-UK', { month: 'long' }).format(_date); // Mês por extenso
    const year = _date.getFullYear().toString().slice(-2); // Ano com dois dígitos
    const hours = _date.getHours().toString().padStart(2, '0'); // Horas com dois dígitos
    const minutes = _date.getMinutes().toString().padStart(2, '0'); // Minutos com dois dígitos
    const seconds = _date.getSeconds().toString().padStart(2, '0'); // Segundos com dois dígitos
  
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  render(){
    return (
      <div className='loggerDetail'>
        <Grid container
            direction="column"
            justifyContent="space-between"
            alignItems="stretch"
            rowSpacing={2}
        >
            <Grid item>
                <MainCard>
                    {this.state.script?
                    <div className='CardContent'>
                        <div className='StatusIcon'>  
                            <IconButton sx={{backgroundColor: this.iconBackGround(this.state.script.status), color:'dark', height:'100%', width:'100%', borderRadius:0}} style={{pointerEvents: 'none'}}>
                                {this.statusIcon(this.state.script.status)}
                            </IconButton>
                        </div>
                        <div className='Text'>
                            <Grid container
                                direction="column"
                                justifyContent="space-between"
                                alignItems="stretch"
                                rowSpacing={0}
                                >
                                <Grid item>
                                    <Typography align='left' variant='h3' color='textSecondary'>
                                        {this.state.script.script.title} [{this.state.script.status}]
                                    </Typography>
                                    <Typography align='left' variant='h4' color='textSecondary'>
                                        &nbsp;&nbsp;&nbsp;&nbsp;{this.state.script.script.group}
                                    </Typography>
                                </Grid>
                                <Grid container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    >
                                </Grid>
                                <Grid item>
                                    <Typography align='left' variant='h5' color='textSecondary'>
                                        Next run: {this.ISOdate2string(this.state.script.next)}
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        Last run: {this.ISOdate2string(this.state.script.last)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>
                        <div className='PlayStop' onClick={this.pausePlayClick}>   
                            <IconButton sx={{backgroundColor: 'grey.100', color:'dark', height:'100%', width:'100%', borderRadius:0}}>
                                {this.state.script.status === 'run' || this.state.script.status === 'wait'?
                                    <PauseCircle sx={{color:'dark', width:'130%' , height: '130%'}}/>:
                                    <PlayCircle sx={{color:'dark', width:'130%' , height: '130%'}}/>
                                }
                            </IconButton>
                        </div>
                        <div className='Edit'>  
                            <Link to={'/edit/script?id='+this.state._id}>
                                <IconButton sx={{backgroundColor: 'grey.100', color:'dark', height:'100%', width:'100%', borderRadius:0}} >
                                    <Edit sx={{color:'dark', width:'130%' , height: '130%'}}/>
                                </IconButton>
                            </Link>
                        </div>
                    </div>:<></>}
                </MainCard>
            </Grid>
            
            <Grid item>
                <MainCard>
                    {this.state.log?this.state.log.map((log) => 
                        <Grid key={log._id} container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            spacing={0}
                            >
                            <Grid item>
                                <div style={{backgroundColor: this.fontLogColor(log.type)}}>
                                    <Typography  align='center' variant='h5' color={'#ffff'} width={65}>
                                        ({log.type})
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item>
                                <Typography  align='left' variant='h5' color={"textSecondary"} width={170}>
                                    &nbsp;{this.ISOdate2string(log.datetime)}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography  align='left' variant='h5' color={"textSecondary"} width={23}>
                                    {'>>'}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography  align='left' variant='h5' color={this.fontLogColor(log.type)}>
                                    {log.msg}
                                </Typography>
                            </Grid>
                        </Grid>):<></>}
                </MainCard>
            </Grid>
        </Grid>
      </div>
    );
  }
}
