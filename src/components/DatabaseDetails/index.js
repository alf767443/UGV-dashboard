import React from 'react';
import { djangoFetch } from 'API/url';
import MainCard from 'components/MainCard';

import { Typography, Grid } from '@mui/material';

import "./styles.css";
import PlotTile from 'components/Tiles/plotTile';

export default class DatabaseList extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      url: null,
      robotID: window.localStorage.getItem('robotID'),
      data:null,
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

  getInfo = (url) => {
    djangoFetch('/database', '?db='+url.db+'&coll='+url.coll+'&n='+url.n, 'GET', '')
    .then((response) => response.json())
    .then((json) => {
        const _json = json
        this.setState({data: _json})
        console.log(this.state)
    })
    .finally(()=>this.componentDidMount())
  }

  componentDidMount = () => {
    !this.state.url?this.getParam():null
    !this.state.data&&this.state.url?this.getInfo(this.state.url):null
  }

  getParam = () => {
    const searchParams = new URLSearchParams(location.search);
    const database = searchParams.get('db');
    const collection = searchParams.get('coll');
    const numberDocs = searchParams.get('n');
    const url = {
      db: database,
      coll: collection,
      n: numberDocs,
    }
    this.setState({url: url})
    this.getInfo(url)
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
          <MainCard >
            asdsadasd
            {this.state.data?<PlotTile table={true} data={this.state.data} option={'option={}'}/>:<></>}
          </MainCard>
        </Grid>
      </div>
    );
  }
}
