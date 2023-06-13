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
      })
      .finally(() => this.componentDidMount())
      
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
    !this.state.database?this.getDatabase():null
    this.state.database?this.getList():null
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
                                <Link to={'/information/dbs/detail?db='+database.database+'&coll='+database.collection+'&n=100'}>
                                    <IconButton sx={{color:'dark', height:'100%', width:'100%', borderRadius:0}} >
                                        <TableChart sx={{color:'dark', width:'100%' , height: '100%'}}/>
                                    </IconButton>
                                </Link>
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
