import React from 'react';
import { Link  } from 'react-router-dom';
import { djangoFetch } from 'API/url';
import { AvTimer, Warning, Help, Terminal, StopCircle, Description, TableChart } from '@mui/icons-material';
import MainCard from 'components/MainCard';

import { IconButton } from '@mui/material';
import { Typography, Grid } from '@mui/material';

import "./styles.css";

export default class DatabaseList extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      script: [],
      edit: this.props.edit,
      robotID: window.localStorage.getItem('robotID'),
      database: null,
      dbs: null
    }
  }

  getDatabase = () => {
    djangoFetch('/robot', '/?name=' + this.state.robotID, 'GET', '')
      .then((response) => response.json())
      .then((json) => {
        const _json = json
        this.setState({database: _json.database})
        this.getList()
      })
      
  }

  getList = () => {
    djangoFetch('/database', '?db='+this.state.database, 'GET', '')
    .then((response) => response.json())
    .then((json) => {
        const _json = json
        this.setState({dbs: _json})
        console.log(_json)
    })
  }

  componentDidMount = () => {
    this.getDatabase()
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

  render(){
    return (
      <div className='loggerList'>  
        <Grid container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2} 
        >
            {this.state.dbs?this.state.dbs.map((database) => 
                <Grid key={database.collection} item xs={6} md={2}>
                    <MainCard>
                        <div className='CardContent'>
                            <div className='CollectionText'>
                                <Typography align='center' variant='h3' color='textSecondary'>
                                    {database.collection}
                                </Typography>
                            </div>
                            <div className='TableIconButton'>
                                <IconButton sx={{color:'dark', height:'100%', width:'100%', borderRadius:0}} >
                                    <Description sx={{color:'dark', width:'100%' , height: '100%'}}/>
                                </IconButton>
                            </div>
                            <div className='DetailsText'>
                                <Grid container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                >
                                    <Grid item>
                                        <Typography align='left' variant='h5' color='textSecondary'>
                                            Database:
                                        </Typography>
                                        <Typography align='left' variant='h5' color='textSecondary'>
                                            Documents count: &nbsp;&nbsp;
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography align='left' variant='h5' color='textSecondary'>
                                            {database.database}
                                        </Typography>
                                        <Typography align='left' variant='h5' color='textSecondary'>
                                            {database.doc_count}
                                        </Typography>
                                    </Grid>
                                </Grid>
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
