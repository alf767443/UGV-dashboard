import React from 'react';
import { Link  } from 'react-router-dom';
import { djangoFetch } from 'API/url';
import { AvTimer, Warning, Help, Terminal, StopCircle, Description } from '@mui/icons-material';
import MainCard from 'components/MainCard';

import { IconButton } from '@mui/material';
import { Typography, Grid } from '@mui/material';

import "./styles.css";

export default class ScriptList extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      script: [],
      edit: this.props.edit,
      robotID: window.localStorage.getItem('robotID'),
    }
  }

  getList = () => {
    const sendJSON = {"pipeline":
    [
        {
            "$match": {
                "robot": this.state.robotID
            }
        }, {
            '$lookup': {
                'from': 'logs', 
                'localField': 'name', 
                'foreignField': 'script', 
                'as': 'lastLog', 
                'pipeline': [
                    {
                        '$sort': {
                            'datetime': -1
                        }
                    }, {
                        '$limit': 1
                    }, {
                        '$project': {
                            'msg': 1, 
                            'datetime': 1, 
                            'type': 1
                        }
                    }
                ]
            }
        }
    ]}
    djangoFetch('/script', '/', 'OPTIONS', JSON.stringify(sendJSON))
    .then((response) => response.json())
    .then((json) => {
        const _json = json
        this.setState({script: _json})
    })
  }

  componentDidMount = () => {
    this.getList()
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
      <div className='loggerList' id='Script-Log-List'>  
        <Grid container
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            rowSpacing={2}
        >
            {this.state.script?this.state.script.map((script) => 
            <Grid key={script.name} item>
                <MainCard>
                    <div className='CardContent' id={'Script-Log-List-CardContent'+script.name}>
                        <div className='StatusIcon' id={'Script-Log-List-CardContent-Icon-Status'+script.name}>
                            <IconButton sx={{backgroundColor: this.iconBackGround(script.status), color:'dark', height:'100%', width:'100%', borderRadius:0}} style={{pointerEvents: 'none'}}>
                                {this.statusIcon(script.status)}
                            </IconButton>
                        </div>
                        <div className='Text' id={'Script-Log-List-CardContent-Text'+script.name}>
                            <Grid container
                                direction="column"
                                justifyContent="space-between"
                                alignItems="stretch"
                                rowSpacing={0}
                                >
                                <Grid item>
                                    <Typography align='left' variant='h3' color='textSecondary'>
                                        {script.script.title} - {script.script.group} [{script.status}]
                                    </Typography>
                                </Grid>
                                <Grid container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    >
                                    <Typography align='left' variant='h5' color='textSecondary'>
                                        Last log:&nbsp;&nbsp;
                                    </Typography>
                                    {script.lastLog[0]?
                                    <Typography align='left' variant='h5' color={this.fontLogColor(script.lastLog[0].type)}>
                                        ({this.ISOdate2string(script.lastLog[0].datetime)}) &nbsp;{">>"}&nbsp; {script.lastLog[0].msg}
                                    </Typography>:<></>}
                                </Grid>
                                <Grid item>
                                    <Typography align='left' variant='h5' color='textSecondary'>
                                        Next run: {this.ISOdate2string(script.next)}
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        Last run: {this.ISOdate2string(script.last)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>
                        
                        <div className='LogIcon' id={'Script-Log-List-CardContent-Icon-Log'+script.name}>
                            <Link to={'/information/logs/history?id='+script.name}>
                                <IconButton sx={{backgroundColor: 'grey.100', color:'dark', height:'100%', width:'100%', borderRadius:0}} >
                                    <Description sx={{color:'dark', width:'100%' , height: '100%'}}/>
                                </IconButton>
                            </Link>
                        </div>
                    </div>
                </MainCard>
            </Grid>
            ):<></>}
          </Grid>
      </div>
    );
  }
}
